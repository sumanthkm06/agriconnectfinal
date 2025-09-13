document.addEventListener('DOMContentLoaded', () => {
    // --- Reusable Toast Notification ---
    function showToast(message, type = 'success') {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => { toast.remove(); }, 4000);
    }

    // --- Header Rendering ---
    function renderHeader() {
        const user = JSON.parse(localStorage.getItem('krishiMandiUser'));
        const headerRight = document.getElementById('header-right');
        if (!headerRight) return;

        const navLinks = `
            <nav class="main-nav">
                <a href="index.html">Home</a>
                <a href="prices.html">Prices</a>
                <a href="buy.html">Buy</a>
                <a href="sell.html">Sell</a>
                <a href="diagnose.html">Diagnose</a>
                <a href="reels.html">Reels</a>
            </nav>`;
        
        if (user) {
            // Logged-in user view
            headerRight.innerHTML = navLinks + `
                <div class="auth-buttons">
                    <a href="profile.html" class="btn btn-tertiary">Welcome, ${user.name.split(' ')[0]}</a>
                    <a href="#" id="logout-btn" class="btn btn-primary">Logout</a>
                </div>`;
            
            const logoutBtn = document.getElementById('logout-btn');
            if(logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('krishiMandiUser');
                    showToast('You have been logged out successfully.');
                    // Redirect to login page after a short delay
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                });
            }
        } else {
            // Logged-out user view
            headerRight.innerHTML = navLinks + `
                <div class="auth-buttons">
                    <a href="login.html" class="btn btn-tertiary">Login</a>
                    <a href="login.html" class="btn btn-primary">Sign Up</a>
                </div>`;
        }
    }

    // --- Page-Specific Logic ---
    const pageTitle = document.title;

    if (pageTitle.includes('Login') || pageTitle.includes('Signup')) {
        // Logic for login.html
        const loginView = document.getElementById('login-view');
        const signupView = document.getElementById('signup-view');
        const showSignupLink = document.getElementById('show-signup-link');
        const showLoginLink = document.getElementById('show-login-link');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        showSignupLink.addEventListener('click', () => {
            loginView.classList.add('hidden');
            signupView.classList.remove('hidden');
        });

        showLoginLink.addEventListener('click', () => {
            signupView.classList.add('hidden');
            loginView.classList.remove('hidden');
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            // In a real app, you'd verify the password. Here, we simulate a successful login.
            const user = { name: "Demo Farmer", email: email };
            localStorage.setItem('krishiMandiUser', JSON.stringify(user));
            showToast('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const user = { name: name, email: email };
            localStorage.setItem('krishiMandiUser', JSON.stringify(user));
            showToast('Account created successfully! Redirecting...');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
        
    } else if (pageTitle.includes('Profile')) {
        // Logic for profile.html
        const user = JSON.parse(localStorage.getItem('krishiMandiUser'));
        if (!user) {
            window.location.href = 'login.html'; // Redirect if not logged in
            return;
        }

        const profileNameInput = document.getElementById('profile-name');
        const profileEmailInput = document.getElementById('profile-email');
        profileNameInput.value = user.name;
        profileEmailInput.value = user.email;

        document.getElementById('profile-info-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = profileNameInput.value;
            user.name = newName;
            localStorage.setItem('krishiMandiUser', JSON.stringify(user));
            showToast('Profile updated successfully!');
            renderHeader(); // Re-render header to show new name
        });

        document.getElementById('change-password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you'd handle password change logic here
            showToast('Password changed successfully!');
            e.target.reset();
        });
    }

    // --- Initial Load ---
    renderHeader();
});

