const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const app = express();

app.use(cors());
app.use(express.json());



app.listen(8001, () => {
    console.log('GATEWAY is OPEN and LISTING to 8001')
})      

