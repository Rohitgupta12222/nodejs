const express = require('express')
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
require('dotenv').config();
const PORT = process.env.PORT || 4000
const PersonRouter =  require('./router/personRoutes')
const menuItem = require('./router/menuItemRoutes')


app.use(bodyParser.json());


app.get('/',(req ,res )=>{
    res.send('Server connected')
})

app.use('/person',PersonRouter)
app.use('/item',menuItem)




app.listen(3000, () => {
    console.log('server runing ',PORT);
})