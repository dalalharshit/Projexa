/**
 * Faculty Member Portal
 */

class FacultyDashboard {
    constructor() {
        this.currentView = 'overview';
        this.selectedChat = null;
        this.messageInterval = null;
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
                    ${this.renderHeader()}
                    
                    <div class="flex-1 overflow-hidden flex">
                        <div id="faculty-content" class="flex-1 overflow-y-auto p-6">
                            ${this.renderContent()}
                        </div>
                        ${this.currentView === 'mentorship' ? this.renderChatSidebar() : ''}
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
                <p class="text-slate-400 text-xs mt-1">Faculty Portal</p>
            </div>

            <nav class="mt-6 space-y-1 px-3">
                ${this.createNavItem('overview', '📊 Dashboard')}
                ${this.createNavItem('mentor', '🎓 Mentorship Hub')}
                ${this.createNavItem('bootcamp', '📚 Class Monitor')}
                ${this.createNavItem('mentorship', '💬 Real-Time Mentorship')}
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
            <button onclick="facultyDashboard.switchView('${view}')" 
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
            overview: 'Dashboard',
            mentor: 'Mentorship Hub',
            bootcamp: 'Class Monitor',
            mentorship: 'Real-Time Chat'
        };
        return titles[this.currentView] || 'Dashboard';
    }

    renderContent() {
        switch (this.currentView) {
            case 'overview': return this.renderOverview();
            case 'mentor': return this.renderMentorshipHub();
            case 'bootcamp': return this.renderClassMonitor();
            case 'mentorship': return this.renderRealTimeMentorship();
            default: return '<p>Loading...</p>';
        }
    }

    renderOverview() {
        const assignedSections = authManager.currentUser.assignedSections;
        const recentQueries = this.getRecentStudentQueries();

        return `
            <!-- Metrics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p class="text-sm text-gray-600">Assigned Sections</p>
                    <p class="text-3xl font-bold text-gray-900 mt-2">${assignedSections.length}</p>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p class="text-sm text-gray-600">Students Under Mentorship</p>
                    <p class="text-3xl font-bold text-gray-900 mt-2">${this.getAssignedStudentsCount()}</p>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p class="text-sm text-gray-600">Unread Messages</p>
                    <p class="text-3xl font-bold text-gray-900 mt-2">${this.getUnreadMessageCount()}</p>
                </div>
            </div>

            <!-- Assigned Sections -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Your Assigned Sections</h3>
                <div class="space-y-3">
                    ${assignedSections.map(section => `
                        <div class="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                            <div>
                                <p class="font-medium text-indigo-900">${section.program}</p>
                                <p class="text-sm text-indigo-700">Semester ${section.semester}, Section ${section.section}</p>
                            </div>
                            <span class="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm font-medium">
                                ${this.getStudentCountForSection(section)}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Recent Student Queries -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Recent Student Queries</h3>
                ${recentQueries.length > 0 ? `
                    <div class="space-y-3">
                        ${recentQueries.slice(0, 5).map(query => `
                            <div class="p-4 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <p class="font-medium text-gray-900">${query.senderName}</p>
                                        <p class="text-sm text-gray-600 mt-1">${query.content}</p>
                                        <p class="text-xs text-gray-500 mt-2">${this.formatTime(query.timestamp)}</p>
                                    </div>
                                    <button onclick="facultyDashboard.startChat('${query.senderId}', '${query.senderName}')" 
                                        class="ml-4 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                                        Reply
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="text-center py-8 text-gray-500">
                        <p>No recent queries from students</p>
                    </div>
                `}
            </div>
        `;
    }

    renderMentorshipHub() {
        const assignedSections = authManager.currentUser.assignedSections;
        let students = [];

        assignedSections.forEach(section => {
            const sectionStudents = dataService.getStudentsBySection(section.program, section.semester, section.section);
            students = students.concat(sectionStudents);
        });

        return `
            <div class="space-y-4">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <input type="text" id="search-students-mentor" placeholder="Search students..." 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600">
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-100 border-b">
                            <tr>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Roll Number</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Program</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Section</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.length > 0 ? students.map(student => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${student.name}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${student.rollNumber}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${student.program}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${student.section}</td>
                                    <td class="px-6 py-4 text-sm">${UIComponents.createBadge(student.applicationStatus, this.getStatusType(student.applicationStatus))}</td>
                                    <td class="px-6 py-4 text-sm">
                                        <button onclick="facultyDashboard.startChat('${student.id}', '${student.name}')" 
                                            class="text-indigo-600 hover:text-indigo-900 font-medium">
                                            Message
                                        </button>
                                    </td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                                        No students in your assigned sections
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderClassMonitor() {
        const assignedSemesters = [...new Set(authManager.currentUser.assignedSections.map(s => s.semester))];
        const bootcamps = dataService.getAllBootcamps();
        const applicableBootcamps = bootcamps.filter(b => 
            assignedSemesters.some(sem => b.minSemester <= sem && sem <= b.maxSemester) && b.status === 'active'
        );

        return `
            <div class="space-y-6">
                ${applicableBootcamps.map(bootcamp => `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900">${bootcamp.title}</h3>
                                <p class="text-sm text-gray-600 mt-1">${bootcamp.description}</p>
                            </div>
                            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div>
                                <p class="text-gray-500">Duration</p>
                                <p class="font-medium text-gray-900">${bootcamp.duration}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Enrolled</p>
                                <p class="font-medium text-gray-900">${bootcamp.enrolled}/${bootcamp.capacity}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Start Date</p>
                                <p class="font-medium text-gray-900">${new Date(bootcamp.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Commencement In</p>
                                <p id="contdown-${bootcamp.id}" class="font-medium text-red-600">Loading...</p>
                            </div>
                        </div>

                        <div>
                            <button onclick="facultyDashboard.viewBootcampStudents('${bootcamp.id}')" 
                                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-all">
                                View Enrolled Students
                            </button>
                        </div>
                    </div>
                `).join('')}

                ${applicableBootcamps.length === 0 ? `
                    <div class="text-center py-12 bg-gray-50 rounded-lg">
                        <p class="text-gray-500">No active bootcamps for your assigned semesters</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderRealTimeMentorship() {
        const assignedSections = authManager.currentUser.assignedSections;
        let students = [];

        assignedSections.forEach(section => {
            const sectionStudents = dataService.getStudentsBySection(section.program, section.semester, section.section);
            students = students.concat(sectionStudents);
        });

        if (!this.selectedChat && students.length > 0) {
            this.selectedChat = students[0];
        }

        return `
            <div class="flex gap-6 h-full">
                <!-- Chat List -->
                <div class="w-64 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div class="p-4 border-b bg-indigo-50">
                        <h3 class="font-bold text-gray-900">Student Conversations</h3>
                    </div>
                    <div class="flex-1 overflow-y-auto">
                        ${students.length > 0 ? students.map(student => `
                            <button onclick="facultyDashboard.selectChat('${student.id}', '${student.name}')" 
                                class="w-full text-left px-4 py-3 border-b hover:bg-indigo-50 transition-colors ${this.selectedChat?.id === student.id ? 'bg-indigo-100 border-l-4 border-indigo-600' : ''}">
                                <p class="font-medium text-gray-900 text-sm">${student.name}</p>
                                <p class="text-xs text-gray-500">${student.rollNumber}</p>
                            </button>
                        `).join('') : `
                            <div class="p-4 text-center text-gray-500 text-sm">
                                No students to message
                            </div>
                        `}
                    </div>
                </div>

                <!-- Chat Window -->
                <div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
                    ${this.selectedChat ? this.renderChatWindow() : `
                        <div class="flex-1 flex items-center justify-center text-gray-500">
                            <p>Select a student to start chatting</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    renderChatWindow() {
        const messages = dataService.getConversation(authManager.currentUser.id, this.selectedChat.id);
        dataService.markMessagesAsRead(authManager.currentUser.id, this.selectedChat.id);

        return `
            <div class="p-4 border-b bg-indigo-50 flex items-center justify-between">
                <div>
                    <h3 class="font-bold text-gray-900">${this.selectedChat.name}</h3>
                    <p class="text-xs text-gray-600">${this.selectedChat.rollNumber}</p>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto p-4 space-y-4">
                ${messages.length > 0 ? messages.map(msg => `
                    <div class="flex ${msg.senderId === authManager.currentUser.id ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-xs px-4 py-2 rounded-lg ${msg.senderId === authManager.currentUser.id ? 'chat-bubble-outgoing' : 'chat-bubble-incoming'}">
                            <p class="text-sm">${msg.content}</p>
                            <p class="text-xs opacity-70 mt-1">${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                `).join('') : `
                    <div class="text-center text-gray-500 text-sm py-8">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                `}
            </div>

            <div class="p-4 border-t">
                <form id="chat-form-faculty" class="flex gap-2">
                    <input type="text" name="message" placeholder="Type a message..." 
                        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600" required>
                    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                        Send
                    </button>
                </form>
            </div>
        `;
    }

    renderChatSidebar() {
        return '';
    }

    switchView(view) {
        this.currentView = view;
        this.render();
    }

    startChat(studentId, studentName) {
        this.currentView = 'mentorship';
        this.selectedChat = { id: studentId, name: studentName };
        this.render();
    }

    selectChat(studentId, studentName) {
        this.selectedChat = { id: studentId, name: studentName };
        this.render();
    }

    viewBootcampStudents(bootcampId) {
        const bootcamp = dataService.getAllBootcamps().find(b => b.id === bootcampId);
        if (!bootcamp) return;

        UIComponents.showModal(
            `${bootcamp.title} - Enrolled Students`,
            `
                <div class="space-y-4">
                    <div class="flex items-center gap-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-600">Start Date</p>
                            <p class="font-medium">${new Date(bootcamp.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Duration</p>
                            <p class="font-medium">${bootcamp.duration}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Enrolled</p>
                            <p class="font-medium">${bootcamp.enrolled}/${bootcamp.capacity}</p>
                        </div>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-4">
                        <p class="text-sm font-medium text-gray-700 mb-3">Commencement Countdown</p>
                        <div id="countdown-modal" class="text-center font-bold text-indigo-600 text-2xl">Loading...</div>
                    </div>

                    <div>
                        <p class="text-sm font-medium text-gray-700 mb-3">Enrolled Students</p>
                        <div class="space-y-2 max-h-96 overflow-y-auto">
                            ${[...Array(bootcamp.enrolled)].map((_, i) => `
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <p class="text-sm text-gray-700">Student ${i + 1}</p>
                                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Enrolled</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `,
            [{ label: 'Close', type: 'secondary' }]
        );

        setTimeout(() => {
            UIComponents.createCountdownTimer(bootcamp.startDate, 'countdown-modal');
        }, 100);
    }

    setupEventListeners() {
        // Chat form
        const chatForm = document.getElementById('chat-form-faculty');
        if (chatForm && this.selectedChat) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = e.target.message.value;
                dataService.sendMessage(
                    authManager.currentUser.id,
                    this.selectedChat.id,
                    authManager.currentUser.name,
                    this.selectedChat.name,
                    message
                );
                e.target.reset();
                this.render();
            });
        }

        // Bootcamp countdowns
        authManager.currentUser.assignedSections.forEach(section => {
            const bootcamps = dataService.getAllBootcamps().filter(b => 
                b.minSemester <= section.semester && section.semester <= b.maxSemester && b.status === 'active'
            );
            
            bootcamps.forEach(b => {
                const counterId = `contdown-${b.id}`;
                const element = document.getElementById(counterId);
                if (element) {
                    UIComponents.createCountdownTimer(b.startDate, counterId);
                }
            });
        });

        // Search students
        const searchInput = document.getElementById('search-students-mentor');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                const term = e.target.value.toLowerCase();
                document.querySelectorAll('table tbody tr').forEach(row => {
                    const name = row.cells[0]?.textContent.toLowerCase() || '';
                    row.style.display = name.includes(term) ? '' : 'none';
                });
            });
        }
    }

    getRecentStudentQueries() {
        const messages = dataService.getMessages(authManager.currentUser.id);
        const assignedSections = authManager.currentUser.assignedSections;
        let students = [];

        assignedSections.forEach(section => {
            const sectionStudents = dataService.getStudentsBySection(section.program, section.semester, section.section);
            students = students.concat(sectionStudents.map(s => s.id));
        });

        return messages.filter(m => students.includes(m.senderId)).slice(-5);
    }

    getAssignedStudentsCount() {
        const assignedSections = authManager.currentUser.assignedSections;
        let count = 0;

        assignedSections.forEach(section => {
            count += dataService.getStudentsBySection(section.program, section.semester, section.section).length;
        });

        return count;
    }

    getAssignedStudents() {
        const assignedSections = authManager.currentUser.assignedSections;
        let students = [];

        assignedSections.forEach(section => {
            const sectionStudents = dataService.getStudentsBySection(section.program, section.semester, section.section);
            students = students.concat(sectionStudents);
        });

        return students;
    }

    getStudentCountForSection(section) {
        const students = dataService.getStudentsBySection(section.program, section.semester, section.section);
        return `${students.length} students`;
    }

    getUnreadMessageCount() {
        const messages = dataService.getMessages(authManager.currentUser.id);
        return messages.filter(m => !m.read && m.receiverId === authManager.currentUser.id).length;
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

    getStatusType(status) {
        const types = {
            'pending': 'warning',
            'approved': 'success',
            'rejected': 'danger',
            'verified': 'success'
        };
        return types[status] || 'info';
    }
}

// Initialize faculty dashboard
const facultyDashboard = new FacultyDashboard();
