const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../model/users.json');


const bcrypt = require('bcrypt');

// Function to load users from the JSON file
const loadUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath); // Read the JSON file
        const parsedData = JSON.parse(data); // Parse JSON
        return parsedData.users; // Return the users array
    } catch (error) {
        console.error('Error loading users:', error);
        return []; // Return an empty array in case of error
    }
};

// Load users at startup
let users = loadUsers();

// Retrieve all users
const getAllUsers = (req, res) => {
    res.json(users);
};

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

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
        // console.log(hashedPassword)
        // console.log(req.body.username)

        // Create a new user object
        //there are other missing parameters we should include when we are posting the data 

       // Create a new user object
       const newUser = {
        userId: users.length + 1, // Simple ID increment
        username,
        email,
        passwordHash: hashedPassword,
        createdAt: new Date().toISOString()
    };

        users.push(newUser);
         // Save updated users to the JSON file
        const dataToSave = { users }; // Wrap the users array in an object
        fs.writeFileSync(usersFilePath, JSON.stringify(dataToSave, null, 2));
        res.status(201).send("New user added successfully");

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send("Internal Server Error");
    }
};



const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);

    if (!user) {
        // If user not found, send a response with a link to the signup page
        return res.status(404).send({ 
            error: "Cannot find the user. Would you like to sign up?", 
            redirectToSignup: true // Indicate that the user should be redirected
        });
    }

    try {
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (isMatch) {
            // Successful login
            return res.send({ message: "Login successful!" }); // Use an object for consistency
        } else {
            // Incorrect password
            return res.status(400).send({ error: "Incorrect password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};


// GET endpoint to retrieve user details by username
// Get user details by username
const getUserDetails = (req, res) => {
    const { username } = req.params;

    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
};

// Export functions for use in routes
module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserDetails
};