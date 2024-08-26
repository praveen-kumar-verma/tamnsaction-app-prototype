const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;


    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Access denied. Please log in again.'
            });
        }

        // Remove 'Bearer ' from the token string
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.userId) {
            console.log(req.userId, "first");
            req.userId = decoded.userId;
            console.log(req.userId, "second");
            next();
        } else {
            return res.status(401).json({
                error: 'Invalid token. Please log in again.'
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            error: 'Invalid credentials. Please log in again.'
        });
    }
}

module.exports =  authMiddleware;
