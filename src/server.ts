import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';
import { autenticar } from "./middleware/authMiddleware";
import usuariosRouter from "./routes/usuarios";
import swaggerRoutes from './swagger';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://gaj-gerenciador-juridico.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use('/api-docs', swaggerRoutes);

const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando com sucesso 🚀" });
});

// Rotas públicas
app.use("/api/usuarios", usuariosRouter);

// Aplica autenticação a todas as rotas abaixo
app.use("/api", autenticar, apiRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));