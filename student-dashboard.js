/**
 * Student Portal Dashboard
 */

class StudentDashboard {
    constructor() {
        this.currentView = 'overview';
        this.enrollmentStep = 0;
        this.enrollmentData = {};
        this.selectedMentor = null;
        this.otpVerified = false;
    }

    render() {
        const app = document.getElementById('app');
        
        // Check if student is verified
        if (!this.isStudentVerified()) {
            this.renderRegistration();
            return;
        }

        app.innerHTML = `
            <div class="flex h-screen bg-slate-50">
                <!-- Sidebar -->
                <div class="sidebar w-64 bg-slate-900 text-white fixed h-full overflow-y-auto">
                    ${this.renderSidebar()}
                </div>

                <!-- Main Content -->
                <div class="flex-1 ml-64 flex flex-col">
                    ${this.renderHeader()}
                    
                    <div class="flex-1 overflow-y-auto">
                        <div id="student-content" class="p-6">
                            ${this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    renderSidebar() {
        return `
            <div class="p-6 border-b border-slate-700">
                <h1 class="text-2xl font-bold text-white">InternNova</h1>
                <p class="text-slate-400 text-xs mt-1">Student Portal</p>
            </div>

            <nav class="mt-6 space-y-1 px-3">
                ${this.createNavItem('overview', '📊 Dashboard')}
                ${this.getCurrentUser().currentPath ? this.createNavItem('mentor', '💬 Mentor Portal') : ''}
                ${!this.getCurrentUser().currentPath ? this.createNavItem('enroll', '📝 Enrollment Wizard') : this.createNavItem('enrollment', '📚 My Enrollments')}
                ${this.createNavItem('profile', '👤 My Profile')}
            </nav>

            <div class="mt-auto p-4 border-t border-slate-700">
                <button onclick="authManager.logout(); setupLoginForm();" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all">
                    Logout
                </button>
            </div>
        `;
    }

    createNavItem(view, label) {
        const isActive = this.currentView === view ? 'bg-indigo-600' : 'hover:bg-slate-800';
        return `
            <button onclick="studentDashboard.switchView('${view}')" 
                class="w-full text-left px-4 py-3 rounded-lg transition-all ${isActive} ${this.currentView === view ? 'text-white' : 'text-slate-300'}">
                ${label}
            </button>
        `;
    }

    renderHeader() {
        return `
            <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">${this.getViewTitle()}</h2>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <p class="text-sm font-medium text-gray-900">${this.getCurrentUser().name}</p>
                        <p class="text-xs text-gray-500">${this.getCurrentUser().email}</p>
                    </div>
                    <img src="${this.getCurrentUser().avatar}" alt="Avatar" class="w-10 h-10 rounded-full object-cover">
                </div>
            </div>
        `;
    }

    getViewTitle() {
        const titles = {
            overview: 'Dashboard',
            mentor: 'Mentor Portal',
            enroll: 'Enrollment Wizard',
            enrollment: 'My Bootcamp Enrollments',
            profile: 'My Profile'
        };
        return titles[this.currentView] || 'Dashboard';
    }

    renderContent() {
        switch (this.currentView) {
            case 'overview': return this.renderOverview();
            case 'enroll': return this.renderEnrollmentWizard();
            case 'enrollment': return this.renderEnrollments();
            case 'mentor': return this.renderMentorPortal();
            case 'profile': return this.renderProfile();
            default: return '<p>Loading...</p>';
        }
    }

    renderRegistration() {
        const app = document.getElementById('app');
        
        if (!this.otpVerified) {
            app.innerHTML = `
                <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
                    <div class="w-full max-w-md">
                        <div class="text-center mb-8">
                            <h1 class="text-4xl font-bold text-white mb-2">InternNova</h1>
                            <p class="text-indigo-100">Email Verification</p>
                        </div>

                        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 text-white">
                                <h2 class="text-2xl font-bold">Verify Your Email</h2>
                                <p class="text-indigo-100 mt-2">Enter the 6-digit OTP sent to your email</p>
                            </div>

                            <form id="otp-verification-form" class="p-6 space-y-4">
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
                                    <label class="block text-sm font-medium text-gray-700 mb-2">One-Time Password (OTP)</label>
                                    <input 
                                        type="text" 
                                        name="otp" 
                                        placeholder="000000"
                                        maxlength="6"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-center text-2xl letter-spacing"
                                        required
                                    >
                                    <p class="text-xs text-gray-500 mt-2">💡 For demo, use any 6-digit code</p>
                                </div>

                                <button 
                                    type="submit"
                                    class="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Verify Email
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('otp-verification-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const email = formData.get('email');
                const otp = formData.get('otp');

                if (otp.length === 6) {
                    this.otpVerified = true;
                    dataService.updateStudent(authManager.currentUser.id, { verificationStatus: 'verified' });
                    UIComponents.showToast('Email verified successfully!', 'success', 1500);
                    setTimeout(() => {
                        this.render();
                    }, 500);
                } else {
                    UIComponents.showToast('Invalid OTP format', 'error');
                }
            });
        }
    }

    renderOverview() {
        const user = this.getCurrentUser();
        const bootcamps = dataService.getAllBootcamps();

        return `
            <!-- Status Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p class="text-sm text-gray-600">Current Program</p>
                    <p class="text-2xl font-bold text-gray-900 mt-2">${user.program}</p>
                    <p class="text-xs text-gray-500 mt-1">Semester ${user.semester}</p>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p class="text-sm text-gray-600">Section</p>
                    <p class="text-2xl font-bold text-gray-900 mt-2">Section ${user.section}</p>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p class="text-sm text-gray-600">Verification Status</p>
                    <p class="mt-2">${UIComponents.createBadge(user.verificationStatus, 'success')}</p>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p class="text-sm text-gray-600">Application Status</p>
                    <p class="mt-2">${UIComponents.createBadge(user.applicationStatus, this.getStatusType(user.applicationStatus))}</p>
                </div>
            </div>

            <!-- Active Enrollments -->
            ${user.enrolledBootcamps && user.enrolledBootcamps.length > 0 ? `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Active Bootcamp Enrollments</h3>
                    <div class="space-y-3">
                        ${user.enrolledBootcamps.map(bootcampId => {
                            const bootcamp = bootcamps.find(b => b.id === bootcampId);
                            return bootcamp ? `
                                <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                                    <div class="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 class="font-bold text-indigo-900">${bootcamp.title}</h4>
                                            <p class="text-sm text-indigo-700 mt-1">${bootcamp.description}</p>
                                        </div>
                                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Enrolled</span>
                                    </div>
                                    <div class="flex items-center justify-between text-sm">
                                        <div>
                                            <p class="text-indigo-600 font-medium">Starts ${new Date(bootcamp.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <div id="timer-${bootcamp.id}" class="text-indigo-600 font-bold">Loading...</div>
                                    </div>
                                </div>
                            ` : '';
                        }).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${!user.currentPath ? `
                        <button onclick="studentDashboard.switchView('enroll')" 
                            class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-all">
                            Start Enrollment Process
                        </button>
                    ` : ''}
                    
                    ${user.currentPath ? `
                        <button onclick="studentDashboard.switchView('mentor')" 
                            class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-all">
                            Message Your Mentor
                        </button>
                    ` : ''}
                    
                    <button onclick="studentDashboard.switchView('profile')" 
                        class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-all">
                        View My Profile
                    </button>
                </div>
            </div>
        `;
    }

    renderEnrollmentWizard() {
        // Step 1: Type Selection
        if (this.enrollmentStep === 0) {
            return `
                <div class="max-w-2xl mx-auto">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div class="mb-8">
                            <div class="flex items-center justify-center space-x-4 mb-4">
                                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">1</div>
                                <div class="flex-1 h-1 bg-gray-300"></div>
                                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-600 font-bold">2</div>
                                <div class="flex-1 h-1 bg-gray-300"></div>
                                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-600 font-bold">3</div>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900">Select Internship Type</h2>
                            <p class="text-gray-600 mt-2">Choose the internship format that suits you best</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div onclick="studentDashboard.selectInternshipType('online')" 
                                class="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 cursor-pointer transition-all">
                                <p class="text-2xl">🌐</p>
                                <h3 class="font-bold text-gray-900 mt-2">Online</h3>
                                <p class="text-sm text-gray-600 mt-2">Remote internship from home</p>
                            </div>

                            <div onclick="studentDashboard.selectInternshipType('offline')" 
                                class="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 cursor-pointer transition-all">
                                <p class="text-2xl">🏢</p>
                                <h3 class="font-bold text-gray-900 mt-2">Offline</h3>
                                <p class="text-sm text-gray-600 mt-2">On-site internship at company</p>
                            </div>

                            <div onclick="studentDashboard.selectInternshipType('bootcamp')" 
                                class="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 cursor-pointer transition-all">
                                <p class="text-2xl">🎓</p>
                                <h3 class="font-bold text-gray-900 mt-2">Bootcamp</h3>
                                <p class="text-sm text-gray-600 mt-2">Intensive skill bootcamp</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Step 2: Program Details
        if (this.enrollmentStep === 1) {
            const applicableBootcamps = dataService.getBootcampsForSemester(this.getCurrentUser().semester);

            if (this.enrollmentData.type === 'bootcamp') {
                return `
                    <div class="max-w-2xl mx-auto">
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            <div class="mb-8">
                                <div class="flex items-center justify-center space-x-4 mb-4">
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">✓</div>
                                    <div class="flex-1 h-1 bg-indigo-600"></div>
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">2</div>
                                    <div class="flex-1 h-1 bg-gray-300"></div>
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-600 font-bold">3</div>
                                </div>
                                <h2 class="text-2xl font-bold text-gray-900">Select Bootcamp</h2>
                                <p class="text-gray-600 mt-2">Choose a bootcamp for Semester ${this.getCurrentUser().semester}</p>
                            </div>

                            <div class="space-y-3 mb-6">
                                ${applicableBootcamps.map(bootcamp => `
                                    <div onclick="studentDashboard.selectBootcamp('${bootcamp.id}')" 
                                        class="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 cursor-pointer transition-all ${this.enrollmentData.bootcampId === bootcamp.id ? 'border-indigo-600 bg-indigo-50' : ''}">
                                        <h4 class="font-bold text-gray-900">${bootcamp.title}</h4>
                                        <p class="text-sm text-gray-600 mt-1">${bootcamp.description}</p>
                                        <div class="flex gap-4 mt-3 text-xs text-gray-600">
                                            <span>Duration: ${bootcamp.duration}</span>
                                            <span>Enrolled: ${bootcamp.enrolled}/${bootcamp.capacity}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="flex gap-4">
                                <button onclick="studentDashboard.enrollmentStep = 0; studentDashboard.render();" 
                                    class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
                                    Back
                                </button>
                                <button onclick="studentDashboard.nextStep()" 
                                    class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-all">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="max-w-2xl mx-auto">
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            <div class="mb-8">
                                <div class="flex items-center justify-center space-x-4 mb-4">
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">✓</div>
                                    <div class="flex-1 h-1 bg-indigo-600"></div>
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">2</div>
                                    <div class="flex-1 h-1 bg-gray-300"></div>
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-600 font-bold">3</div>
                                </div>
                                <h2 class="text-2xl font-bold text-gray-900">Program Details</h2>
                                <p class="text-gray-600 mt-2">Enter your internship company and role information</p>
                            </div>

                            <form id="program-details-form" class="space-y-4 mb-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                    <input type="text" name="company" placeholder="e.g., Google, Microsoft, Flipkart" 
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Position/Role</label>
                                    <input type="text" name="position" placeholder="e.g., Junior Developer, Data Analyst" 
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Duration (weeks)</label>
                                    <input type="number" name="duration" placeholder="e.g., 12" min="1" max="52"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                    <input type="date" name="startDate"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                </div>
                            </form>

                            <div class="flex gap-4">
                                <button onclick="studentDashboard.enrollmentStep = 0; studentDashboard.render();" 
                                    class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
                                    Back
                                </button>
                                <button onclick="studentDashboard.nextStep()" 
                                    class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-all">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Step 3: Document Upload
        if (this.enrollmentStep === 2) {
            return `
                <div class="max-w-2xl mx-auto">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div class="mb-8">
                            <div class="flex items-center justify-center space-x-4 mb-4">
                                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">✓</div>
                                <div class="flex-1 h-1 bg-indigo-600"></div>
                                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">✓</div>
                                <div class="flex-1 h-1 bg-indigo-600"></div>
                                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">3</div>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900">Documents & Offers</h2>
                            <p class="text-gray-600 mt-2">Upload your offer letter and other documents (Simulated)</p>
                        </div>

                        <div class="space-y-6 mb-6">
                            <div class="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-indigo-600 cursor-pointer transition-all" onclick="document.getElementById('file-upload').click()">
                                <p class="text-3xl mb-2">📄</p>
                                <p class="font-medium text-gray-900">Upload Offer Letter</p>
                                <p class="text-sm text-gray-600 mt-1">Click or drag & drop PDF, DOC, or images</p>
                                <input type="file" id="file-upload" style="display: none;" accept=".pdf,.doc,.docx,.jpg,.png">
                            </div>

                            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p class="text-sm text-blue-900">✓ <strong>Simulation Mode:</strong> In this demo, you can simulate document upload. In production, files would be processed and stored.</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <button onclick="studentDashboard.enrollmentStep = 1; studentDashboard.render();" 
                                class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
                                Back
                            </button>
                            <button onclick="studentDashboard.completeEnrollment()" 
                                class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-all">
                                Complete Enrollment
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        return '<p>Loading...</p>';
    }

    renderEnrollments() {
        const user = this.getCurrentUser();
        const bootcamps = dataService.getAllBootcamps();

        return `
            <div class="space-y-6">
                ${user.enrolledBootcamps && user.enrolledBootcamps.length > 0 ? `
                    <div class="grid grid-cols-1 gap-6">
                        ${user.enrolledBootcamps.map(bootcampId => {
                            const bootcamp = bootcamps.find(b => b.id === bootcampId);
                            return bootcamp ? `
                                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div class="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 class="text-xl font-bold text-gray-900">${bootcamp.title}</h3>
                                            <p class="text-gray-600 mt-2">${bootcamp.description}</p>
                                        </div>
                                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Enrolled</span>
                                    </div>

                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                                        <div>
                                            <p class="text-gray-500">Start Date</p>
                                            <p class="font-medium text-gray-900">${new Date(bootcamp.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500">End Date</p>
                                            <p class="font-medium text-gray-900">${new Date(bootcamp.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500">Duration</p>
                                            <p class="font-medium text-gray-900">${bootcamp.duration}</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500">Starts In</p>
                                            <p id="boot-timer-${bootcamp.id}" class="font-medium text-indigo-600">Loading...</p>
                                        </div>
                                    </div>

                                    <div class="bg-gray-50 p-3 rounded border border-gray-200 mb-4">
                                        <p class="text-sm font-medium text-gray-700">Learning Outcomes</p>
                                        <ul class="mt-2 space-y-1">
                                            ${bootcamp.outcomes.map(outcome => `
                                                <li class="text-sm text-gray-600">✓ ${outcome}</li>
                                            `).join('')}
                                        </ul>
                                    </div>

                                    <button onclick="studentDashboard.unenrollBootcamp('${bootcamp.id}')" 
                                        class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium transition-all text-sm">
                                        Unenroll
                                    </button>
                                </div>
                            ` : '';
                        }).join('')}
                    </div>
                ` : `
                    <div class="text-center py-12 bg-gray-50 rounded-lg">
                        <p class="text-gray-500 text-lg mb-4">No bootcamp enrollments yet</p>
                        <button onclick="studentDashboard.switchView('enroll')" 
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                            Start Enrollment
                        </button>
                    </div>
                `}
            </div>
        `;
    }

    renderMentorPortal() {
        const user = this.getCurrentUser();
        const mentor = user.mentorId ? dataService.getUserById(user.mentorId) : null;

        if (!user.currentPath) {
            return `
                <div class="text-center py-12 bg-gray-50 rounded-lg">
                    <p class="text-gray-500 text-lg mb-4">🔒 Mentor portal is only available after you select your internship path</p>
                    <button onclick="studentDashboard.switchView('enroll')" 
                        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                        Start Enrollment Wizard
                    </button>
                </div>
            `;
        }

        const messages = dataService.getConversation(user.id, user.mentorId);
        dataService.markMessagesAsRead(user.id, user.mentorId);

        return `
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <!-- Mentor Info -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Your Mentor</h3>
                    ${mentor ? `
                        <div class="text-center">
                            <img src="${mentor.avatar}" alt="${mentor.name}" class="w-20 h-20 rounded-full mx-auto mb-3 object-cover">
                            <h4 class="font-bold text-gray-900">${mentor.name}</h4>
                            <p class="text-sm text-gray-600 mt-1">${mentor.department}</p>
                            
                            <div class="mt-4 space-y-3 text-sm">
                                <div class="text-left">
                                    <p class="text-gray-600">Email</p>
                                    <p class="font-medium text-gray-900 break-all">${mentor.email}</p>
                                </div>
                                <div class="text-left">
                                    <p class="text-gray-600">Phone</p>
                                    <p class="font-medium text-gray-900">${mentor.phone}</p>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <p class="text-gray-500 text-sm">No mentor assigned yet</p>
                    `}
                </div>

                <!-- Chat -->
                <div class="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
                    <div class="p-4 border-b bg-indigo-50">
                        <h3 class="font-bold text-gray-900">Chat with ${mentor?.name || 'Your Mentor'}</h3>
                    </div>

                    <div class="flex-1 overflow-y-auto p-4 space-y-4">
                        ${messages.length > 0 ? messages.map(msg => `
                            <div class="flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}">
                                <div class="max-w-xs px-4 py-2 rounded-lg ${msg.senderId === user.id ? 'chat-bubble-outgoing' : 'chat-bubble-incoming'}">
                                    <p class="text-sm">${msg.content}</p>
                                    <p class="text-xs opacity-70 mt-1">${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        `).join('') : `
                            <div class="text-center text-gray-500 text-sm py-8">
                                <p>No messages yet. Click the Send Message button to start!</p>
                            </div>
                        `}
                    </div>

                    <div class="p-4 border-t">
                        <form id="student-chat-form" class="flex gap-2">
                            <input type="text" name="message" placeholder="Type a message..." 
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    renderProfile() {
        const user = this.getCurrentUser();

        return `
            <div class="max-w-4xl mx-auto space-y-6">
                <!-- Profile Header -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-start gap-6">
                        <div class="relative">
                            <img src="${user.avatar}" alt="Profile" class="w-24 h-24 rounded-full object-cover">
                            <button onclick="studentDashboard.changeProfilePhoto()" 
                                class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                                📷
                            </button>
                        </div>
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-gray-900">${user.name}</h2>
                            <p class="text-gray-600">${user.email}</p>
                            <p class="text-gray-600">${user.rollNumber}</p>
                            <div class="flex gap-2 mt-3">
                                <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">${user.program}</span>
                                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Semester ${user.semester}</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Section ${user.section}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Academic Summary -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Academic Summary</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <p class="text-sm text-blue-900">Program</p>
                            <p class="font-bold text-blue-900 mt-2">${user.program}</p>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <p class="text-sm text-green-900">Current Semester</p>
                            <p class="font-bold text-green-900 mt-2">${user.semester}</p>
                        </div>
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <p class="text-sm text-purple-900">Section</p>
                            <p class="font-bold text-purple-900 mt-2">${user.section}</p>
                        </div>
                        <div class="p-4 bg-yellow-50 rounded-lg">
                            <p class="text-sm text-yellow-900">Verification</p>
                            <p class="font-bold text-yellow-900 mt-2">${user.verificationStatus}</p>
                        </div>
                    </div>
                </div>

                <!-- Path History -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Path History</h3>
                    <div class="space-y-3">
                        ${user.currentPath ? `
                            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p class="font-medium text-green-900">Current Path: ${user.currentPath}</p>
                                <p class="text-sm text-green-800 mt-1">You are currently enrolled in an internship program</p>
                            </div>
                        ` : `
                            <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <p class="text-gray-600">No internship path selected yet</p>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Communication History -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Communication History</h3>
                    <div class="space-y-3 max-h-48 overflow-y-auto">
                        ${this.getRecentCommunications().length > 0 ? this.getRecentCommunications().map(comm => `
                            <div class="p-3 bg-gray-50 rounded border border-gray-200 text-sm">
                                <p class="font-medium text-gray-900">${comm.with}</p>
                                <p class="text-gray-600 mt-1 truncate">${comm.lastMessage}</p>
                                <p class="text-xs text-gray-500 mt-1">${this.formatTime(comm.timestamp)}</p>
                            </div>
                        `).join('') : `
                            <p class="text-gray-500 text-sm">No communication history yet</p>
                        `}
                    </div>
                </div>
            </div>
        `;
    }

    switchView(view) {
        this.currentView = view;
        this.render();
    }

    selectInternshipType(type) {
        this.enrollmentData.type = type;
        this.enrollmentStep = 1;
        this.render();
    }

    selectBootcamp(bootcampId) {
        this.enrollmentData.bootcampId = bootcampId;
    }

    nextStep() {
        if (this.enrollmentStep === 1) {
            if (this.enrollmentData.type === 'bootcamp') {
                if (!this.enrollmentData.bootcampId) {
                    UIComponents.showToast('Please select a bootcamp', 'warning');
                    return;
                }
            } else {
                const form = document.getElementById('program-details-form');
                if (form) {
                    const validation = UIComponents.validateForm(form);
                    if (!validation.isValid) {
                        UIComponents.showToast('Please fill in all required fields', 'warning');
                        return;
                    }
                    this.enrollmentData = { ...this.enrollmentData, ...validation.data };
                }
            }
        }

        this.enrollmentStep++;
        this.render();
    }

    completeEnrollment() {
        const user = this.getCurrentUser();
        const updatedUser = dataService.updateStudent(user.id, {
            currentPath: this.enrollmentData.type,
            applicationStatus: 'pending',
            internshipType: this.enrollmentData.type,
            enrolledBootcamps: this.enrollmentData.type === 'bootcamp' ? [this.enrollmentData.bootcampId] : []
        });

        dataService.addActivityLog({
            userId: user.id,
            userName: user.name,
            action: `Submitted ${this.enrollmentData.type} internship application`,
            type: 'submission'
        });

        // Update auth manager current user
        authManager.currentUser = { ...authManager.currentUser, ...updatedUser };

        UIComponents.showToast('Enrollment submitted successfully! Your mentor will be assigned shortly.', 'success', 2000);
        this.enrollmentStep = 0;
        this.enrollmentData = {};
        setTimeout(() => {
            this.currentView = 'overview';
            this.render();
        }, 1000);
    }

    unenrollBootcamp(bootcampId) {
        const user = this.getCurrentUser();
        const updated = dataService.updateStudent(user.id, {
            enrolledBootcamps: (user.enrolledBootcamps || []).filter(id => id !== bootcampId)
        });

        authManager.currentUser = { ...authManager.currentUser, ...updated };
        UIComponents.showToast('Unenrolled from bootcamp', 'info');
        this.render();
    }

    changeProfilePhoto() {
        UIComponents.showToast('Profile photo update feature - coming soon!', 'info');
    }

    getRecentCommunications() {
        const user = this.getCurrentUser();
        const messages = dataService.getMessages(user.id);
        const grouped = {};

        messages.forEach(msg => {
            const otherId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
            const otherName = msg.senderId === user.id ? msg.receiverName : msg.senderName;
            if (!grouped[otherId]) {
                grouped[otherId] = { with: otherName, lastMessage: msg.content, timestamp: msg.timestamp };
            } else {
                grouped[otherId].lastMessage = msg.content;
                grouped[otherId].timestamp = msg.timestamp;
            }
        });

        return Object.values(grouped).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
    }

    setupEventListeners() {
        // Student chat form
        const chatForm = document.getElementById('student-chat-form');
        if (chatForm) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const user = this.getCurrentUser();
                const message = e.target.message.value;

                if (user.mentorId) {
                    dataService.sendMessage(
                        user.id,
                        user.mentorId,
                        user.name,
                        dataService.getUserById(user.mentorId)?.name || 'Mentor',
                        message
                    );
                    e.target.reset();
                    this.render();
                }
            });
        }

        // Bootcamp countdowns
        const user = this.getCurrentUser();
        if (user.enrolledBootcamps) {
            user.enrolledBootcamps.forEach(bootcampId => {
                const bootcamp = dataService.getAllBootcamps().find(b => b.id === bootcampId);
                if (bootcamp) {
                    UIComponents.createCountdownTimer(bootcamp.startDate, `timer-${bootcamp.id}`);
                    UIComponents.createCountdownTimer(bootcamp.startDate, `boot-timer-${bootcamp.id}`);
                }
            });
        }
    }

    getCurrentUser() {
        return authManager.currentUser;
    }

    isStudentVerified() {
        return this.getCurrentUser().verificationStatus === 'verified';
    }

    getStatusType(status) {
        const types = {
            'pending': 'warning',
            'approved': 'success',
            'rejected': 'danger',
            'verified': 'success'
        };
        return types[status] || 'info';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString();
    }
}

// Initialize student dashboard
const studentDashboard = new StudentDashboard();
