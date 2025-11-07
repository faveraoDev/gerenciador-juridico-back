import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';
import { autenticar } from "./middleware/authMiddleware";
import usuariosRouter from "./routes/usuarios";

dotenv.config();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// app.use('/api', apiRouter); -> Rotas sem proteção

const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando com sucesso 🚀" });
});

// Rotas públicas
app.use("/api/usuarios", usuariosRouter);

// Aplica autenticação a todas as rotas abaixo
app.use("/api", autenticar, apiRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));