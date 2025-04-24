// connect.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);

let db;

export async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect(); // Garante a conexão
      db = client.db("WikiLo"); // Nome do banco de dados
      console.log("🟢 Conectado ao MongoDB!");
    } catch (error) {
      console.error("🔴 Erro ao conectar no MongoDB:", error);
      throw error;
    }
  }
  return db;
}

// Exporte a função para conectar e o db
export { db };
