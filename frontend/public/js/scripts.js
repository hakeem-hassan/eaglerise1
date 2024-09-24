document.addEventListener('DOMContentLoaded', function() {
  
  // Registration Event Listener
  document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        document.getElementById('registerMessage').innerText = 'Registration successful!';
      } else {
        document.getElementById('registerMessage').innerText = `Error: ${data.error || 'Registration failed.'}`;
      }
    } catch (error) {
      console.error('Error during registration:', error);
      document.getElementById('registerMessage').innerText = 'An error occurred. Please try again.';
    }
  });

  // Login Event Listener
  document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();  // Prevent page reload on form submit
    
    const email = document.getElementById('loginEmail').value;  // Use loginEmail instead
    const password = document.getElementById('loginPassword').value;  // Use loginPassword instead

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        document.getElementById('loginMessage').innerText = 'Login successful!';
        localStorage.setItem('token', data.token);  // Save token in local storage
      } else {
        document.getElementById('loginMessage').innerText = `Error: ${data.error || 'Login failed.'}`;
      }
    } catch (error) {
      console.error('Error during login:', error);
      document.getElementById('loginMessage').innerText = 'An error occurred. Please try again.';
    }
  });
});
