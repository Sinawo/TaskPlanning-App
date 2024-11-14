const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');

const PORT = process.env.PORT || 3000;
// const { User } = require('./model');


//this is to allow the application o eccepts json when seding json format file

app.use(express.json());// Middleware to parse JSON data
app.use(cors()); // This will allow cross-origin requests from any origin


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));



// Import routes || I  am importing the from routes (The fuctions point to controllers)
const userRoutes = require('./routes/users');
const workspaceRoutes = require('./routes/workspaces');
const taskRoutes = require('./routes/tasks');



// Use routes
app.use('/api/users', userRoutes);
app.use('/workspaces', workspaceRoutes);
app.use('/tasks', taskRoutes);


// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
});

// Route to serve the signup page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Route to serve the login page if needed
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
// Route for the dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html')); 
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });