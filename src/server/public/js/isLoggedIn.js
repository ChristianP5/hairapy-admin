const isLoggedIn = () => {
    
    const accessToken = localStorage.getItem('accessToken');

    // Redirect to Login if accessToken doesn't exist
    if(!accessToken){
        window.location.href = '../login.html';
    }
}

module.exports = isLoggedIn