/**
 * Main Application Entry Point
 * Handles routing and initialization
 */

// Application Router
function renderDashboard() {
    if (!authManager.isLoggedIn()) {
        setupLoginForm();
        return;
    }

    const role = authManager.getRole();

    switch (role) {
        case 'super_admin':
            adminDashboard.render();
            break;
        case 'faculty':
            facultyDashboard.render();
            break;
        case 'student':
            studentDashboard.render();
            break;
        default:
            setupLoginForm();
    }
}

// Initialize Application
function initializeApp() {
    // Check if user is already logged in
    if (authManager.isLoggedIn()) {
        renderDashboard();
    } else {
        setupLoginForm();
    }
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
