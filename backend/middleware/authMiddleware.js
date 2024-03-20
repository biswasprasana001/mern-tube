// backend\middleware\authMiddleware.js
// We're importing the jsonwebtoken library, which provides functions to sign and verify JSON Web Tokens (JWTs).
const jwt = require('jsonwebtoken');

// We're exporting a middleware function. Middleware functions have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
module.exports = (req, res, next) => {
    // We're using a try-catch block to handle potential errors.
    try {
        // We're getting the token from the 'Authorization' header of the request. The token is expected to be in the format 'Bearer TOKEN', so we split the header by space and take the second part.
        const token = req.headers.authorization.split(' ')[1];

        // We're verifying the token using our secret key. If the token is valid, this will return the payload of the token.
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');

        // We're adding the userId from the token payload to the request object. This allows us to access the userId in other middleware functions and routes.
        req.userData = { userId: decodedToken.userId };

        // We're calling the next middleware function. If we don't call 'next', the request will be left hanging and the client will not receive a response.
        next();
    } catch (error) {
        // If an error occurs (for example, the token is invalid or expired), we're sending a 401 Unauthorized status code and a JSON response with a message.
        res.status(401).json({ message: 'Authentication failed' });
    }
};