import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';

dotenv.config();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando com sucesso 🚀" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));