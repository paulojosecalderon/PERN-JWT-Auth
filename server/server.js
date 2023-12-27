const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5001;


app.use(express.json())
app.use(cors());

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})