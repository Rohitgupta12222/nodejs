const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleWare = (req, res, next) => {
    const authorized = req.headers.authorization
console.log(authorized , '================ >authorized');
    if(!authorized) return res.status(401).json({error:'Token not Fount'})

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Unauthorized ' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()

    } catch (error) {
     return   res.status(401).json({ error: "Invalid Token" })
    }
}
const genrateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000})

}
module.exports = {jwtAuthMiddleWare,genrateToken}