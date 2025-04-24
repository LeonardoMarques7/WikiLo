import express, { response } from "express";
import cors from "cors";
import { connectToDatabase } from '../api/connect.js'; 
import { db } from "./connect.js"; // Importe o objeto 'db' do driver nativo
import { fileURLToPath } from "url";
import path from "path";
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'; // Importe ObjectId se precisar
import dotenv from "dotenv";
import authMiddleware from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

dotenv.config(); 


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..", "..");

console.log("Diretório raiz:", rootDir);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRETE_KEY; 

app.get("/api/", (request, response) => {
    response.send("Só vamos trabalhar com os endpoints '/albuns', '/songs' e '/fotos'");
});

app.get("/api/albuns", async (request, response) => {
    try {
        const albuns = await db.collection("albuns").find({}).toArray();
        response.json(albuns);
    } catch (error) {
        console.error("Erro ao buscar álbuns:", error);
        response.status(500).json({ message: "Erro ao buscar os álbuns." });
    }
});

app.get("/api/songs", async (request, response) => {
    try {
        const songs = await db.collection("songs").find({}).toArray();
        response.json(songs);
    } catch (error) {
        console.error("Erro ao buscar músicas:", error);
        response.status(500).json({ message: "Erro ao buscar as músicas." });
    }
});

app.get("/api/fotos", async (request, response) => {
    try {
        const fotos = await db.collection("pictures").find({}).toArray();
        response.json(fotos);
    } catch (error) {
        console.error("Erro ao buscar fotos:", error);
        response.status(500).json({ message: "Erro ao buscar as fotos." });
    }
});

// Criar conta
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUserDocument = {
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newUserDocument);

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: result.insertedId.toString(), email: newUserDocument.email });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar o usuário.', error: error.message }); // Adicionando a mensagem do erro original
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const user = await db.collection('users').findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Se as credenciais estiverem corretas, gere um JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token }); // Envie o token para o cliente
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
});

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Seu Client ID do Google
        });
        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        console.error("Erro ao verificar token do Google:", error);
        return null;
    }
}

app.post('/api/auth/google', async (req, res) => {
    try {
        
        const db = await connectToDatabase(); 
        
        const { token } = req.body;
        console.log("Token do Google recebido:", token);

        const payload = await verifyGoogleToken(token);
        console.log("Payload do token do Google:", payload);

        if (!payload?.email_verified) {
            return res.status(401).json({ success: false, error: 'Email do Google não verificado.' });
        }

        const googleEmail = payload.email;
        const googleName = payload.name;
        console.log("Email do Google:", googleEmail, "Nome do Google:", googleName);

        try {
            console.log("db é:", db);
            console.log("Tem collection users?", db?.collection);
            let user = await db.collection('users').findOne({ email: googleEmail });
            console.log("Usuário encontrado:", user);

            if (!user) {
                // Se o usuário não existir, crie um novo usuário.
                const newUser = {
                    name: googleName,
                    email: googleEmail,
                    password: 'google_login', // Ou gere uma senha aleatória segura
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                try {
                    const result = await db.collection('users').insertOne(newUser);
                    user = { _id: result.insertedId, ...newUser };
                    console.log("Novo usuário criado:", user); // Adicione este log
                } catch (dbError) {
                    console.error("Erro ao inserir novo usuário:", dbError); // Adicione este log
                    return res.status(500).json({ success: false, error: 'Erro ao inserir novo usuário no banco de dados.' });
                }
            }


            const appToken = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token: appToken });

        } catch (dbError) {
            console.error("Erro ao interagir com o banco de dados:", dbError.message, dbError.stack);
            return res.status(500).json({ success: false, error: 'Erro ao interagir com o banco de dados.' });
        }

    } catch (error) {
        console.error('Erro ao autenticar com o Google:', error);
        res.status(500).json({ success: false, error: 'Erro ao autenticar com o Google.' });
    }
});


app.get('/modelo-wiki', authMiddleware, (req, res) => {
    res.json({ message: `Rota protegida! Olá, ${req.user.name}` });
});

// Serve os arquivos estáticos (como o bundle do React)
app.use(express.static(path.join(rootDir, "front-end/dist")));

// Essa rota captura qualquer coisa que não foi capturada antes (SPA routing)
app.get("*", (req, res) => {
    res.sendFile(path.resolve(rootDir, "front-end/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor está escutando na porta ${PORT}`);
});