const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
// const { User } = require('./model');


//this is to allow the application o eccepts json when seding json format file
app.use(express.json()); // Middleware to parse JSON data
// Middleware
// app.use(bodyParser.json());

// const bodyParser = require("body-parser")
// const fs = require('fs');
// create our express app

const users = [ 

]



// Retrieve all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Register a new user
app.post('/users',  async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        // User missed some information. 
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required.' });
        }

        // // Check for existing user
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists.' });
        }

        // statement allows us to receive a salt (random geberish string )
        // const salt =  await bcrypt.genSalt();
        
        //and we combine this geberish string to hash function 
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //there are other missing parameters we should include when we are posting the data 
        // console.log(hashedPassword)
        // console.log(req.body.username)

        // Create a new user object
        const newUser = {
            username,
            email,
            passwordHash: hashedPassword // Store the hashed password
        };

        users.push(newUser);
        res.status(201).send("New user is added");

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// User login
app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).send("Cannot find the user");
    }

    try {
        // Log the values for debugging
        console.log("Plain password: ", password); // This should be the plain text password provided by the user
        console.log("Hashed stored password: ", user.passwordHash); // This should be the hashed password stored in the user object

        // Check if the provided password matches the stored hashed password
        const isMatch = await bcrypt.compare(password, user.passwordHash); // This compares the plain password with the hashed password
        console.log("Password match result: ", isMatch); // Should return true if passwords match

        if (isMatch) {
            res.send("Success!"); // Successful login
        } else {
            res.send("Wrong Password"); // Incorrect password
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});