document.addEventListener('DOMContentLoaded', () => {
    const signupPage = document.getElementById('signup-page');
    const profilePage = document.getElementById('profile-page');
    const signupForm = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');
    const signupMessage = document.getElementById('signup-message');
    const profileUsername = document.getElementById('profile-username');
    const profileEmail = document.getElementById('profile-email');
    const logoutBtn = document.getElementById('logout-btn');
  
    function generateAccessToken() {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let accessToken = '';
      for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        accessToken += charset.charAt(randomIndex);
      }
      return accessToken;
    }
  
    function handleSignup(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      if (username === '' || email === '' || password === '') {
        signupMessage.textContent = 'Please fill in all fields.';
        return;
      }
  
      const accessToken = generateAccessToken();
  
      const user = { username, email, accessToken };
      localStorage.setItem('user', JSON.stringify(user));
  
      signupMessage.textContent = 'Signup successful!';
      setTimeout(() => {
        signupPage.style.display = 'none';
        profilePage.style.display = 'block';
        showProfileDetails();
      }, 1000);
    }
  
    function showProfileDetails() {
      const user = JSON.parse(localStorage.getItem('user'));
      profileUsername.textContent = user.username;
      profileEmail.textContent = user.email;
    }
  
    function handleLogout() {
      localStorage.removeItem('user');
      profilePage.style.display = 'none';
      signupPage.style.display = 'block';
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      signupPage.style.display = 'none';
      profilePage.style.display = 'block';
      showProfileDetails();
    } else {
      signupPage.style.display = 'block';
      profilePage.style.display = 'none';
    }
  
    signupForm.addEventListener('submit', handleSignup);
    logoutBtn.addEventListener('click', handleLogout);
  });
  