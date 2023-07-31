import express from 'express';
import dotenv from 'dotenv';
import db from './Config/db.js';
import userRoutes from './Router/UserRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.SERVER_PORT;
app.use(express.json());

app.get('/student', async (req, res)=>{
    const q = "select * from student";
    const data = await db.query(q);
    console.log(data.rows);
    res.send(data.rows);
})


app.use('/api', userRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})