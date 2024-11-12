const path = require('path');


const express = require('express');
const taskRoutes = require('./routes/tasks'); // Ensure this path is correct
const app = express();

app.use(express.json());
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


