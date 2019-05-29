//tokens
const jwt = require('jsonwebtoken');

const aut = (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY || "debugkey");
        console.log(decoded);
        req.name = decoded;
        next();
    }
    catch{
        res.status(401);
        res.json({message: 'Auth failed'});
    }
}
module.exports = aut;