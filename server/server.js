const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5001;


app.use(express.json())
app.use(cors());

//Registration and Login Route handling authentication and authorization
app.use('/auth', require('./routes/jwtAuthRoutes'))

//Dashboard route
app.use('/dashboard', require('./routes/dashboardRoute'))

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})