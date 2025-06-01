const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // Check for token in Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1] || req.headers['x-auth-token'];
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token,
        process.env.JWT_SECRET,
        (err, payload) => {
            if(err){
                console.log(err);
                res.status(401).json({ message: 'Invalid token' });
            }else{
                req.user = payload;
                next();
            }
        }
    )
}

module.exports = verifyToken;