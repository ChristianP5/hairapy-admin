document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
})

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    console.log(result);

    if (response.ok) {
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);

      // Redirect ?
      window.location.href = '../home.html'
    } else {
      alert('Login failed');
    }
  });