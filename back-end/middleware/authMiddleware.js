// back-end/middleware/authMiddleware.js (crie esta pasta e arquivo)
import jwt from 'jsonwebtoken';
import { db } from '../api/connect.js';
import dotenv from "dotenv";

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRETE_KEY; // Deve ser a mesma chave do login

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>

        jwt.verify(token, JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido.' });
            }

            // Busque o usuário no banco de dados para garantir que ele ainda existe
            const currentUser = await db.collection('users').findOne({ _id: new ObjectId(user.userId) });

            if (!currentUser) {
                return res.status(401).json({ message: 'Usuário não encontrado.' });
            }

            req.user = currentUser; // Adicione o usuário ao objeto de requisição
            next(); // Passe para a próxima middleware ou rota
        });
    } else {
        res.status(401).json({ message: 'Token de autenticação não encontrado.' });
    }
};

export default authMiddleware;