const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

app.use(cookieParser(),cors({credentials:true, origin:'http://localhost:3000'}),express.urlencoded({extended:true}),express.json())



//load models
require('./models/models');
require('./config/config');
require('./routes/routes')(app);


app.listen(2030);
