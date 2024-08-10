const express = require('express')
const app = express();
require('dotenv').config();
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 4000
const PersonRouter =  require('./router/personRoutes')
const menuItem = require('./router/menuItemRoutes')



app.use('/person',PersonRouter)
app.use('/item',menuItem)




app.listen(3000, () => {
    console.log('server runing ',PORT);
})