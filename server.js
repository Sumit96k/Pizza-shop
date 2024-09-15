const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sumit@123',
    database: 'slice_haven'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

// Route to serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle sign-up
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Database error' });
        } else {
            res.status(200).json({ message: 'Sign up successful' });
        }
    });
});

// Route to handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: 'User not found' });
        }
        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid password' });
        }
    });
});

// Route to get menu data
app.get('/api/menu', (req, res) => {
    const query = 'SELECT * FROM menu';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

// Route to get a specific pizza by id
app.get('/api/menu/:id', (req, res) => {
    const pizzaId = req.params.id;
    const query = 'SELECT * FROM menu WHERE id = ?';
    db.query(query, [pizzaId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.json(result[0]);
    });
});

// Order endpoint
app.post('/api/orders', (req, res) => {
    const { address, menuItemId, quantity } = req.body;

    if (!address || !menuItemId || !quantity) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const orderQuery = 'INSERT INTO orders (address, menu_item_id, quantity) VALUES (?, ?, ?)';
    db.query(orderQuery, [address, menuItemId, quantity], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err.sqlMessage || err);
            return res.status(500).json({ success: false, message: 'Error placing order.' });
        }
        res.json({ success: true, message: 'Order placed successfully!' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
