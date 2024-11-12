const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// const { User } = require('./model');


//this is to allow the application o eccepts json when seding json format file
app.use(express.json()); // Middleware to parse JSON data


// Import routes || I  am importing the from routes (The fuctions point to controllers)
const userRoutes = require('./routes/users');
const workspaceRoutes = require('./routes/workspaces');
const taskRoutes = require('./routes/tasks');



// Use routes
app.use('/users', userRoutes);
app.use('/workspaces', workspaceRoutes);
app.use('/tasks', taskRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });