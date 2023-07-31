import express from 'express';

const app = express();
const PORT = 3003;

app.get('/', (req, res)=>{
    res.send("server is running fine!!");
})

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})