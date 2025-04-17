import express from "express";
import cors from "cors";
import { db } from "./connect.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..", ".."); 

console.log("Diretório raiz:", rootDir);

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/", (request, response) => {
  response.send("Só vamos trabalhar com os endpoints '/artists' e '/songs'");
});

app.get("/api/albuns", async (request, response) => {
  response.send(await db.collection("albuns").find({}).toArray());
});

app.get("/api/songs", async (request, response) => {
  response.send(await db.collection("songs").find({}).toArray());
});

app.get("/api/fotos", async (request, response) => {
  response.send(await db.collection("pictures").find({}).toArray());
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
