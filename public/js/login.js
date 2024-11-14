document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (!response.ok) {
            if (result.redirectToSignup) {
                // Redirect to the signup page if the user is not found
                alert('Account does not exist !');
                window.location.href = '/register'; // Adjust the path to your signup page
            } else {
                document.getElementById('error').textContent = result.error || 'An error occurred. Please try again.';
                alert(`Login failed: ${result.error}`); // Show alert with error message
            }
            alert('Login successful!');
            window.location.href = '/dashboard'; // Redirect to the dashboard on success
        }
    } catch (error) {
        document.getElementById('error').textContent = 'An error occurred. Please try again.';
        console.error('Error during login:', error);
    }
});


const wrapper = document.querySelector(".wrapper"),
loginHeader = document.querySelector(".login header");
loginHeader.addEventListener("click", () => {
wrapper.classList.add("active");
});