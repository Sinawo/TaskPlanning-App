// public/js/auth.js

document.querySelector('.login-btn').addEventListener('click', () => {
    window.location.href = '/login'; // Navigate to login page
  });
  
  document.querySelector('.signup-btn').addEventListener('click', () => {
    window.location.href = '/signup'; // Navigate to signup page
  });
  


  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform login (mock example, replace with actual auth logic)
    window.location.href = '/tasks.html';
});




        var modal = document.getElementById("signupModal");
        var btn = document.getElementById("signupBtn");
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
