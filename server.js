const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');

const PORT = process.env.PORT || 3000;
// const { User } = require('./model');


//this is to allow the application o eccepts json when seding json format file
app.use(express.json()); // Middleware to parse JSON data
app.use(cors()); // This will allow cross-origin requests from any origin

// Import routes || I  am importing the from routes (The fuctions point to controllers)
const userRoutes = require('./routes/users');
const workspaceRoutes = require('./routes/workspaces');
const taskRoutes = require('./routes/tasks');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Use routes
app.use('/users', userRoutes);
app.use('/workspaces', workspaceRoutes);
app.use('/tasks', taskRoutes);


// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });