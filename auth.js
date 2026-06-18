// auth.js
(function checkAuth() {
    // 1. Get the token from local storage
    const token = localStorage.getItem('parcel_pro_token');
    
    // 2. Get the current page name
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 3. If NO token exists, and we are NOT on the login page -> Kick to login
    if (!token && currentPage !== 'login.html') {
        window.location.replace('login.html');
    }

    // 4. If token DOES exist, and we ARE on the login page -> Push to dashboard
    if (token && currentPage === 'login.html') {
        window.location.replace('index.html');
    }
})();

// Global logout function
function logoutUser() {
    localStorage.removeItem('parcel_pro_token');
    localStorage.removeItem('parcel_pro_user');
    window.location.replace('login.html');
}
