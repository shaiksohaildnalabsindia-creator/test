// auth.js
(function checkAuth() {
    const token = localStorage.getItem('parcel_pro_token');
    const loginTime = localStorage.getItem('parcel_pro_login_time');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const EXPIRY_TIME = 48 * 60 * 60 * 1000; 

    let isExpired = false;
    if (loginTime) {
        if (Date.now() - parseInt(loginTime) > EXPIRY_TIME) {
            isExpired = true;
        }
    }

    if ((!token || isExpired) && currentPage !== 'login.html') {
        logoutUser(); 
        return; 
    }

    if (token && !isExpired && currentPage === 'login.html') {
        window.location.replace('index.html');
    }
})();

function logoutUser() {
    localStorage.removeItem('parcel_pro_token');
    localStorage.removeItem('parcel_pro_user');
    localStorage.removeItem('parcel_pro_login_time');
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage !== 'login.html') {
        window.location.replace('login.html');
    }
}
