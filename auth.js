/**
 * Authentication Module
 * Manages user sessions and role-based access
 */

class AuthManager {
    constructor() {
        this.currentUser = this.loadSession();
    }

    login(email, password) {
        const user = dataService.getUser(email, password);
        if (user) {
            this.currentUser = user;
            this.saveSession(user);
            dataService.addActivityLog({
                userId: user.id,
                userName: user.name,
                action: `Logged in as ${user.role}`,
                type: 'login'
            });
            return { success: true, user };
        }
        return { success: false, error: 'Invalid email or password' };
    }

    logout() {
        if (this.currentUser) {
            dataService.addActivityLog({
                userId: this.currentUser.id,
                userName: this.currentUser.name,
                action: 'Logged out',
                type: 'logout'
            });
        }
        this.currentUser = null;
        localStorage.removeItem('internNova_session');
    }

    saveSession(user) {
        localStorage.setItem('internNova_session', JSON.stringify(user));
    }

    loadSession() {
        const session = localStorage.getItem('internNova_session');
        return session ? JSON.parse(session) : null;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getRole() {
        return this.currentUser?.role || null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAdmin() {
        return this.getRole() === 'super_admin';
    }

    isFaculty() {
        return this.getRole() === 'faculty';
    }

    isStudent() {
        return this.getRole() === 'student';
    }

    generateOTP() {
        return String(Math.floor(Math.random() * 900000) + 100000);
    }

    hasAccessToSection(program, semester, section) {
        if (this.isAdmin()) return true;
        if (!this.isFaculty()) return false;

        return this.currentUser.assignedSections.some(s => 
            s.program === program && s.semester === semester && s.section === section
        );
    }
}

// Create global instance
const authManager = new AuthManager();

// Login Form Handler
function setupLoginForm() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <!-- Logo/Header -->
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold text-white mb-2">InternNova</h1>
                    <p class="text-indigo-100">University Internship & Bootcamp Portal</p>
                </div>

                <!-- Login Card -->
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 text-white">
                        <h2 class="text-2xl font-bold">Welcome Back</h2>
                        <p class="text-indigo-100 mt-2">Sign in to your account</p>
                    </div>

                    <form id="login-form" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="your.email@krmu.edu.in"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                required
                            >
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="••••••••"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                required
                            >
                        </div>

                        <button 
                            type="submit"
                            class="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                            Sign In
                        </button>
                    </form>

                    <!-- Demo Credentials -->
                    <div class="border-t px-6 py-4 bg-gray-50">
                        <p class="text-xs text-gray-600 font-semibold mb-3">DEMO ACCOUNTS:</p>
                        <div class="space-y-2 text-xs">
                            <div class="bg-blue-50 p-2 rounded border border-blue-200">
                                <strong>Admin:</strong> admin@krmu.edu.in / admin123
                            </div>
                            <div class="bg-green-50 p-2 rounded border border-green-200">
                                <strong>Faculty:</strong> faculty1@krmu.edu.in / faculty123
                            </div>
                            <div class="bg-purple-50 p-2 rounded border border-purple-200">
                                <strong>Student:</strong> student1@krmu.edu.in / student123
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="text-center mt-8 text-indigo-100">
                    <p class="text-sm">© 2024 InternNova. All rights reserved.</p>
                </div>
            </div>
        </div>
    `;

    // Ensure form is in DOM before attaching listener
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const email = formData.get('email');
                const password = formData.get('password');

                const result = authManager.login(email, password);
                if (result.success) {
                    UIComponents.showToast('Login successful!', 'success', 1500);
                    setTimeout(() => {
                        renderDashboard();
                    }, 500);
                } else {
                    UIComponents.showToast(result.error, 'error');
                }
            });
        }
    }, 50);
}
