
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

const JWT_SECRET =
    process.env.JWT_SECRET || 'development_only_change_this_secret';

// Apply sessions to customer routes
app.use(
    '/customer',
    session({
        secret: process.env.SESSION_SECRET || 'development_session_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax'
        }
    })
);

// Protect customer review-management routes
app.use('/customer/auth', (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authentication required. Please log in.'
        });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
        return res.status(401).json({
            message: 'Authentication token is missing.'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = { username: decoded.username };

        if (req.session) {
            req.session.username = decoded.username;
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired authentication token.'
        });
    }
});

// Customer login and protected review routes
app.use('/customer', customer_routes);

// Public book routes
app.use('/', genl_routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
