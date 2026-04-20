/**
 * Super Administrator Dashboard
 */

class AdminDashboard {
    constructor() {
        this.currentView = 'overview';
        this.students = dataService.getAllStudents();
        this.selectedStudents = new Set();
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="flex h-screen bg-slate-50">
                <!-- Sidebar -->
                <div class="sidebar w-64 bg-slate-900 text-white fixed h-full overflow-y-auto">
                    ${this.renderSidebar()}
                </div>

                <!-- Main Content -->
                <div class="flex-1 ml-64 flex flex-col">
                    <!-- Header -->
                    ${this.renderHeader()}

                    <!-- Content Area -->
                    <div class="flex-1 overflow-y-auto">
                        <div id="admin-content" class="p-6">
                            ${this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
        this.setupTableInteractive();
    }

    renderSidebar() {
        return `
            <div class="p-6 border-b border-slate-700">
                <h1 class="text-2xl font-bold text-white">InternNova</h1>
                <p class="text-slate-400 text-xs mt-1">Admin Portal</p>
            </div>

            <nav class="mt-6 space-y-1 px-3">
                ${this.createNavItem('overview', 'Overview', '📊')}
                ${this.createNavItem('students', 'Student Directory', '👥')}
                ${this.createNavItem('review', 'Review System', '✓')}
                ${this.createNavItem('staff', 'Faculty Oversight', '👨‍🏫')}
                ${this.createNavItem('bootcamp', 'Bootcamp Manager', '🎓')}
                ${this.createNavItem('directory', 'Email Directory', '📧')}
            </nav>

            <div class="mt-auto p-4 border-t border-slate-700">
                <button onclick="authManager.logout(); setupLoginForm();" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all">
                    Logout
                </button>
            </div>
        `;
    }

    createNavItem(view, label, icon) {
        const isActive = this.currentView === view ? 'bg-indigo-600' : 'hover:bg-slate-800';
        return `
            <button onclick="adminDashboard.switchView('${view}')" 
                class="w-full text-left px-4 py-3 rounded-lg transition-all ${isActive} ${this.currentView === view ? 'text-white' : 'text-slate-300'}">
                <span>${icon}</span> <span class="ml-2">${label}</span>
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
                        <p class="text-sm font-medium text-gray-900">${authManager.currentUser.name}</p>
                        <p class="text-xs text-gray-500">${authManager.currentUser.email}</p>
                    </div>
                    <img src="${authManager.currentUser.avatar}" alt="Avatar" class="w-10 h-10 rounded-full object-cover">
                </div>
            </div>
        `;
    }

    getViewTitle() {
        const titles = {
            overview: 'Dashboard Overview',
            students: 'Student Directory',
            review: 'Application Review System',
            staff: 'Faculty Oversight',
            bootcamp: 'Bootcamp Management',
            directory: 'Email Directory'
        };
        return titles[this.currentView] || 'Dashboard';
    }

    renderContent() {
        switch (this.currentView) {
            case 'overview': return this.renderOverview();
            case 'students': return this.renderStudentDirectory();
            case 'review': return this.renderReviewSystem();
            case 'staff': return this.renderStaffManagement();
            case 'bootcamp': return this.renderBootcampManager();
            case 'directory': return this.renderEmailDirectory();
            default: return '<p>Loading...</p>';
        }
    }

    renderOverview() {
        const stats = dataService.getStatistics();
        const activityLog = dataService.getActivityLog(5);

        return `
            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                ${this.createStatCard('Total Students', stats.totalStudents, '👥', 'bg-blue-500', 'Students')}
                ${this.createStatCard('Pending Applications', stats.pendingApplications, '⏳', 'bg-yellow-500', 'Pending')}
                ${this.createStatCard('Approved Placements', stats.approvedPlacements, '✓', 'bg-green-500', 'Approved')}
                ${this.createStatCard('Active Bootcamps', stats.activeBootcamps, '🎓', 'bg-purple-500', 'Bootcamps')}
            </div>

            <!-- Recent Activity -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div class="space-y-4">
                    ${activityLog.map(activity => `
                        <div class="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                            <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                ${this.getActivityIcon(activity.type)}
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-900">${activity.userName}</p>
                                <p class="text-sm text-gray-600">${activity.action}</p>
                            </div>
                            <div class="text-xs text-gray-500">${this.formatTime(activity.timestamp)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    createStatCard(title, value, icon, colorClass, subtitle) {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">${title}</p>
                        <p class="text-3xl font-bold text-gray-900 mt-2">${value}</p>
                        <p class="text-xs text-gray-500 mt-1">${subtitle}</p>
                    </div>
                    <div class="text-4xl">${icon}</div>
                </div>
            </div>
        `;
    }

    getActivityIcon(type) {
        const icons = {
            submission: '📤',
            approval: '✅',
            rejection: '❌',
            registration: '👤',
            enrollment: '📚',
            login: '🔐',
            logout: '🚪'
        };
        return icons[type] || '📌';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    }

    renderStudentDirectory() {
        const students = this.students;

        return `
            <div class="space-y-4">
                <!-- Filters -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="text" id="search-students" placeholder="Search by name..." 
                            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600">
                        
                        <select id="filter-program" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600">
                            <option value="">All Programs</option>
                            <option value="B.Tech CSE">B.Tech CSE</option>
                            <option value="B.Tech AI&ML">B.Tech AI&ML</option>
                        </select>

                        <select id="filter-semester" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600">
                            <option value="">All Semesters</option>
                            <option value="2">2nd Semester</option>
                            <option value="4">4th Semester</option>
                            <option value="6">6th Semester</option>
                        </select>

                        <select id="filter-section" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600">
                            <option value="">All Sections</option>
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                            <option value="D">Section D</option>
                            <option value="E">Section E</option>
                            <option value="F">Section F</option>
                        </select>
                    </div>
                </div>

                <!-- Students Table -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table class="w-full students-table">
                        <thead class="bg-gray-100 border-b">
                            <tr>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Roll No</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Program</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sem/Sec</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Application</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map(student => `
                                <tr data-student-id="${student.id}">
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${student.name}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${student.rollNumber}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${student.program}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${student.semester}/${student.section}</td>
                                    <td class="px-6 py-4 text-sm">${UIComponents.createBadge(student.verificationStatus, student.verificationStatus === 'verified' ? 'success' : 'warning')}</td>
                                    <td class="px-6 py-4 text-sm">${UIComponents.createBadge(student.applicationStatus, this.getStatusType(student.applicationStatus))}</td>
                                    <td class="px-6 py-4 text-sm">
                                        <button onclick="adminDashboard.viewStudentDetails('${student.id}')" 
                                            class="text-indigo-600 hover:text-indigo-900 font-medium">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
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

    renderReviewSystem() {
        const pendingStudents = this.students.filter(s => s.applicationStatus === 'pending');

        return `
            <div class="space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p class="text-sm font-medium text-blue-900">
                        ${pendingStudents.length} applications pending review
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    ${pendingStudents.length > 0 ? pendingStudents.map(student => `
                        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h4 class="text-lg font-bold text-gray-900">${student.name}</h4>
                                    <p class="text-sm text-gray-600">${student.rollNumber} | ${student.program} | ${student.semester}/${student.section}</p>
                                    <p class="text-sm text-gray-600 mt-2">Email: ${student.email}</p>
                                    <p class="text-sm text-gray-600">Phone: ${student.phone}</p>
                                    <div class="mt-4">
                                        <p class="text-sm font-medium text-gray-700 mb-2">Application Details:</p>
                                        <p class="text-sm text-gray-600">Type: ${student.internshipType || 'Not selected'}</p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="adminDashboard.approveApplication('${student.id}')" 
                                        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-all">
                                        Approve
                                    </button>
                                    <button onclick="adminDashboard.rejectApplication('${student.id}')" 
                                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="text-center py-12">
                            <p class="text-gray-500 text-lg">No pending applications</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    renderStaffManagement() {
        const pendingStaff = dataService.getPendingStaff();

        return `
            <div class="space-y-6">
                <!-- Staff Approval Section -->
                <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Pending Staff Registrations</h3>
                    ${pendingStaff.length > 0 ? `
                        <div class="space-y-4">
                            ${pendingStaff.map(staff => `
                                <div class="bg-white border border-gray-200 rounded-lg p-6">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <h4 class="text-lg font-bold text-gray-900">${staff.name}</h4>
                                            <p class="text-sm text-gray-600">${staff.email}</p>
                                            <p class="text-sm text-gray-600">${staff.phone}</p>
                                            <p class="text-sm text-gray-600 mt-2">Department: ${staff.department}</p>
                                            <p class="text-xs text-gray-500 mt-2">Submitted: ${new Date(staff.submittedDate).toLocaleDateString()}</p>
                                        </div>
                                        <div class="flex gap-2">
                                            <button onclick="adminDashboard.approveFacultyAndAssign('${staff.id}', '${staff.name}')" 
                                                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-all">
                                                Approve & Assign
                                            </button>
                                            <button onclick="adminDashboard.rejectStaff('${staff.id}')" 
                                                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-12 bg-gray-50 rounded-lg">
                            <p class="text-gray-500">No pending staff registrations</p>
                        </div>
                    `}
                </div>

                <!-- Hierarchical Assignment -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Assign Faculty to Sections</h3>
                    <form id="assign-faculty-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Select Faculty</label>
                                <select name="faculty" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                    <option value="">Choose faculty member</option>
                                    ${Object.values(JSON.parse(localStorage.getItem('internNova_users') || '{}')).filter(u => u.role === 'faculty').map(u => `
                                        <option value="${u.id}">${u.name}</option>
                                    `).join('')}
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Program</label>
                                <select name="program" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                    <option value="">Select program</option>
                                    <option value="B.Tech CSE">B.Tech CSE</option>
                                    <option value="B.Tech AI&ML">B.Tech AI&ML</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                                <select name="semester" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                    <option value="">Select semester</option>
                                    <option value="2">2nd</option>
                                    <option value="4">4th</option>
                                    <option value="6">6th</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Section</label>
                                <select name="section" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                    <option value="">Select section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium transition-all">
                            Assign Section to Faculty
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    renderBootcampManager() {
        const bootcamps = dataService.getAllBootcamps();

        return `
            <div class="space-y-6">
                <!-- Create Bootcamp -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Create New Bootcamp</h3>
                    <form id="create-bootcamp-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="title" placeholder="Bootcamp Title" 
                                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                            
                            <div class="flex gap-2">
                                <input type="date" name="startDate" 
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                <input type="date" name="endDate" 
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <textarea name="outcomes" placeholder="Learning Outcomes (comma-separated)" 
                                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 resize-none h-24"
                                required></textarea>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Applicable Semesters</label>
                                <div class="flex gap-4">
                                    <label class="flex items-center">
                                        <input type="checkbox" name="minSemester" value="2" class="mr-2"> Sem 2
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" name="maxSemester" value="4" class="mr-2"> Sem 4
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" name="semMax" value="6" class="mr-2"> Sem 6
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="button" onclick="adminDashboard.generateBootcampDescription()" 
                            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-all">
                            🤖 Auto-Generate Description
                        </button>

                        <textarea id="bootcamp-description" name="description" placeholder="Auto-generated description will appear here or enter manually" 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 resize-none h-24"
                            required></textarea>

                        <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium transition-all">
                            Create Bootcamp
                        </button>
                    </form>
                </div>

                <!-- Active Bootcamps -->
                <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Active Bootcamps</h3>
                    <div class="grid grid-cols-1 gap-4">
                        ${bootcamps.filter(b => b.status === 'active').map(bootcamp => `
                            <div class="bg-white border border-gray-200 rounded-lg p-6">
                                <div class="flex items-start justify-between mb-3">
                                    <h4 class="text-lg font-bold text-gray-900">${bootcamp.title}</h4>
                                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
                                </div>
                                <p class="text-sm text-gray-600 mb-3">${bootcamp.description}</p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p class="text-gray-500">Duration</p>
                                        <p class="font-medium text-gray-900">${bootcamp.duration}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">Enrolled</p>
                                        <p class="font-medium text-gray-900">${bootcamp.enrolled}/${bootcamp.capacity}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">Mentor</p>
                                        <p class="font-medium text-gray-900">${dataService.getUserById(bootcamp.mentor)?.name || 'Unassigned'}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">Semesters</p>
                                        <p class="font-medium text-gray-900">${bootcamp.minSemester}-${bootcamp.maxSemester}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderEmailDirectory() {
        const users = Object.values(JSON.parse(localStorage.getItem('internNova_users') || '{}'));
        const students = dataService.getAllStudents();
        const allUsers = [...users, ...students];

        return `
            <div class="space-y-4">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <input type="text" id="search-email" placeholder="Search by name or email..." 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600">
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table class="w-full email-table">
                        <thead class="bg-gray-100 border-b">
                            <tr>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department/Program</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${allUsers.map(user => `
                                <tr>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${user.name}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${user.email}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${user.phone || 'N/A'}</td>
                                    <td class="px-6 py-4 text-sm">${UIComponents.createBadge(user.role || 'student', 'info')}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${user.department || user.program || 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    switchView(view) {
        this.currentView = view;
        this.render();
    }

    viewStudentDetails(studentId) {
        const student = dataService.getStudentById(studentId);
        if (!student) return;

        UIComponents.showModal(
            'Student Details',
            `
                <div class="space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-bold text-blue-900">${student.name}</h4>
                        <p class="text-sm text-blue-800">${student.rollNumber}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-gray-500 text-xs">Email</p>
                            <p class="font-medium">${student.email}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">Phone</p>
                            <p class="font-medium">${student.phone}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">Program</p>
                            <p class="font-medium">${student.program}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">Semester/Section</p>
                            <p class="font-medium">${student.semester}/${student.section}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Status</p>
                        <p class="font-medium">${UIComponents.createBadge(student.verificationStatus, 'success')} ${UIComponents.createBadge(student.applicationStatus, this.getStatusType(student.applicationStatus))}</p>
                    </div>
                </div>
            `,
            [{ label: 'Close', type: 'secondary' }]
        );
    }

    approveApplication(studentId) {
        const student = dataService.updateStudent(studentId, { applicationStatus: 'approved' });
        dataService.addActivityLog({
            userId: student.id,
            userName: student.name,
            action: 'Application approved',
            type: 'approval'
        });
        UIComponents.showToast('Application approved successfully!', 'success');
        this.render();
    }

    rejectApplication(studentId) {
        const student = dataService.updateStudent(studentId, { applicationStatus: 'rejected' });
        dataService.addActivityLog({
            userId: student.id,
            userName: student.name,
            action: 'Application rejected',
            type: 'rejection'
        });
        UIComponents.showToast('Application rejected', 'warning');
        this.render();
    }

    rejectStaff(staffId) {
        dataService.rejectStaff(staffId);
        UIComponents.showToast('Staff registration rejected', 'info');
        this.render();
    }

    approveFacultyAndAssign(staffId, staffName) {
        const modal = UIComponents.showModal(
            'Assign Section to Faculty',
            `
                <form id="assign-section-modal-form" class="space-y-4">
                    <p class="text-sm text-gray-600">Assigning: <strong>${staffName}</strong></p>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Program</label>
                        <select name="program" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                            <option value="">Select program</option>
                            <option value="B.Tech CSE">B.Tech CSE</option>
                            <option value="B.Tech AI&ML">B.Tech AI&ML</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                            <select name="semester" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                <option value="">Select semester</option>
                                <option value="2">2nd</option>
                                <option value="4">4th</option>
                                <option value="6">6th</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Section</label>
                            <select name="section" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                                <option value="">Select section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                    </div>
                </form>
            `,
            [
                {
                    label: 'Approve & Assign',
                    type: 'primary',
                    callback: () => {
                        const form = document.getElementById('assign-section-modal-form');
                        const formData = new FormData(form);
                        const assignment = {
                            program: formData.get('program'),
                            semester: parseInt(formData.get('semester')),
                            section: formData.get('section')
                        };

                        const pendingStaff = dataService.getPendingStaff().find(s => s.id === staffId);
                        const faculty = {
                            id: `faculty_${Date.now()}`,
                            email: pendingStaff.email,
                            password: 'faculty123',
                            name: pendingStaff.name,
                            role: 'faculty',
                            phone: pendingStaff.phone,
                            department: pendingStaff.department,
                            assignedSections: [assignment],
                            avatar: 'https://util.visme.co/temp/default-faculty.png'
                        };

                        dataService.approveStaffAndAddUser(staffId, faculty);
                        UIComponents.showToast('Faculty approved and assigned successfully!', 'success');
                        this.render();
                    }
                },
                { label: 'Cancel', type: 'secondary' }
            ]
        );
    }

    generateBootcampDescription() {
        const form = document.getElementById('create-bootcamp-form');
        if (!form) return;

        const formData = new FormData(form);
        const title = formData.get('title');
        const outcomes = formData.get('outcomes');
        const startDate = formData.get('startDate');
        const endDate = formData.get('endDate');

        if (!title || !outcomes || !startDate || !endDate) {
            UIComponents.showToast('Please fill in title, outcomes, and dates first', 'warning');
            return;
        }

        const outcomeList = outcomes.split(',').map((o, i) => `${i + 1}. ${o.trim()}`).join(' ');
        const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const description = `${title}: An intensive bootcamp running from ${start} to ${end}. Participants will develop expertise in ${outcomes.split(',')[0].trim()} and related technologies. Key learning outcomes: ${outcomeList}. Perfect for students seeking hands-on experience and industry-recognized credentials.`;

        document.getElementById('bootcamp-description').value = description;
        UIComponents.showToast('Description generated successfully!', 'success');
    }

    setupTableInteractive() {
        // Live search for students
        const searchInput = document.getElementById('search-students');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                const term = e.target.value.toLowerCase();
                document.querySelectorAll('.students-table tbody tr').forEach(row => {
                    const name = row.cells[0]?.textContent.toLowerCase() || '';
                    row.style.display = name.includes(term) ? '' : 'none';
                });
            });
        }

        // Live search for email directory
        const emailSearch = document.getElementById('search-email');
        if (emailSearch) {
            emailSearch.addEventListener('keyup', (e) => {
                const term = e.target.value.toLowerCase();
                document.querySelectorAll('.email-table tbody tr').forEach(row => {
                    const name = row.cells[0]?.textContent.toLowerCase() || '';
                    const email = row.cells[1]?.textContent.toLowerCase() || '';
                    row.style.display = (name.includes(term) || email.includes(term)) ? '' : 'none';
                });
            });
        }

        // Filter students
        const programFilter = document.getElementById('filter-program');
        const semesterFilter = document.getElementById('filter-semester');
        const sectionFilter = document.getElementById('filter-section');

        const applyFilters = () => {
            const program = programFilter?.value;
            const semester = semesterFilter?.value;
            const section = sectionFilter?.value;

            document.querySelectorAll('.students-table tbody tr').forEach(row => {
                const progCol = row.dataset.program;
                const semCol = row.cells[3]?.textContent.split('/')[0];
                const secCol = row.cells[3]?.textContent.split('/')[1];

                const match = (!program || program === row.cells[2]?.textContent) &&
                              (!semester || semester === semCol) &&
                              (!section || section === secCol);
                row.style.display = match ? '' : 'none';
            });
        };

        programFilter?.addEventListener('change', applyFilters);
        semesterFilter?.addEventListener('change', applyFilters);
        sectionFilter?.addEventListener('change', applyFilters);

        // Create bootcamp form
        const bootcampForm = document.getElementById('create-bootcamp-form');
        if (bootcampForm) {
            bootcampForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const minSem = formData.getAll('minSemester')[0] || 2;
                const maxSem = formData.getAll('maxSemester')[0] || 6;

                const bootcamp = {
                    title: formData.get('title'),
                    description: formData.get('description'),
                    outcomes: formData.get('outcomes').split(',').map(o => o.trim()),
                    startDate: formData.get('startDate'),
                    endDate: formData.get('endDate'),
                    duration: this.calculateDuration(formData.get('startDate'), formData.get('endDate')),
                    minSemester: parseInt(minSem),
                    maxSemester: parseInt(maxSem),
                    capacity: 50,
                    mentor: 'faculty_001'
                };

                dataService.createBootcamp(bootcamp);
                UIComponents.showToast('Bootcamp created successfully!', 'success');
                e.target.reset();
                document.getElementById('bootcamp-description').value = '';
                this.currentView = 'bootcamp';
                this.render();
            });
        }

        // Assign faculty form
        const assignForm = document.getElementById('assign-faculty-form');
        if (assignForm) {
            assignForm.addEventListener('submit', (e) => {
                e.preventDefault();
                UIComponents.showToast('Faculty assigned to section successfully!', 'success');
                e.target.reset();
                this.render();
            });
        }
    }

    calculateDuration(startDate, endDate) {
        if (!startDate || !endDate) return 'N/A weeks';
        const start = new Date(startDate);
        const end = new Date(endDate);
        const weeks = Math.ceil((end - start) / (7 * 24 * 60 * 60 * 1000));
        return `${weeks} weeks`;
    }

    attachEventListeners() {
        // Event listeners will be attached in setupTableInteractive
    }
}

// Initialize admin dashboard
const adminDashboard = new AdminDashboard();
