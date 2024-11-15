document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Auth script loaded");
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = '/login'; // Redirect to the login page
        } else {
            const errorData = await response.json();
            document.getElementById('error').innerHTML = 
            '<p>Username already have an account! <a href="/login">Login here</a>.</p>' 
            alert(`Registration failed: ${errorData.error}`);

        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});


document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Fetch values from the updated unique IDs
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (!response.ok) {
            // Handle errors based on response
            if (result.redirectToSignup) {
                alert('Account does not exist!');  
                document.getElementById('loginError').innerHTML = 
                '<p>Account does not exist! <a href="/register">Signup here</a>.</p>';
            } else {
                document.getElementById('loginError').textContent = result.error || 'An error occurred. Please try again.';
                alert(`Login failed: ${result.error}`); // Show alert with error message
            }
        } else {
            alert('Login successful!');
            window.location.href = '/dashboard'; // Redirect to the dashboard on success
        }
    } catch (error) {
        document.getElementById('loginError').textContent = 'An error occurred. Please try again.';
        console.error('Error during login:', error);
    }
});





const wrapper = document.querySelector(".wrapper"),
signupHeader = document.querySelector(".signup header"),
loginHeader = document.querySelector(".login header");

loginHeader.addEventListener("click", () => {
wrapper.classList.add("active");
});
signupHeader.addEventListener("click", () => {
wrapper.classList.remove("active");
});


