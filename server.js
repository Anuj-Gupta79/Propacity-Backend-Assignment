import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Router/UserRoutes.js';
import folderRoutes from './Router/FolderRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.SERVER_PORT;
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', folderRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})