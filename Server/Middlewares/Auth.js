import JWT from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_TOKEN_KEY);
        req.userById = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token Session Expired, Please Login Again" });
    }
};

export default isAuthenticated;
