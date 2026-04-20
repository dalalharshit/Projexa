/**
 * UI Components
 * Reusable components for modals, toasts, and skeleton loaders
 */

class UIComponents {
    // Toast Notifications
    static showToast(message, type = 'success', duration = 3000) {
        const container = document.getElementById('toast-container');
        const typeClasses = {
            success: 'bg-green-50 text-green-800 border-green-200',
            error: 'bg-red-50 text-red-800 border-red-200',
            warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
            info: 'bg-blue-50 text-blue-800 border-blue-200'
        };

        const toast = document.createElement('div');
        toast.className = `toast border-l-4 p-4 rounded-lg ${typeClasses[type]} fade-in`;
        toast.innerHTML = `
            <div class="flex items-center gap-3">
                <span>${this.getToastIcon(type)}</span>
                <span class="flex-1">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="text-lg opacity-50 hover:opacity-100">×</button>
            </div>
        `;
        container.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => toast.remove(), duration);
        }

        return toast;
    }

    static getToastIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || '✓';
    }

    // Modal/Dialog
    static showModal(title, content, buttons = [], options = {}) {
        return new Promise((resolve) => {
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50';
            backdrop.id = `modal_${Date.now()}`;

            const modal = document.createElement('div');
            modal.className = 'modal-content bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto';
            modal.innerHTML = `
                <div class="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between border-b-0">
                    <h2 class="text-xl font-bold text-white">${title}</h2>
                    <button onclick="document.getElementById('${backdrop.id}').remove()" class="text-white hover:bg-indigo-800 rounded-lg p-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div class="p-6">
                    ${content}
                </div>
                <div class="bg-gray-50 px-6 py-4 flex gap-3 justify-end rounded-b-xl border-t">
                    ${buttons.map((btn, idx) => `
                        <button class="px-4 py-2 rounded-lg font-medium transition-all ${
                            btn.type === 'primary' 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }" data-action="${idx}">
                            ${btn.label}
                        </button>
                    `).join('')}
                </div>
            `;

            backdrop.appendChild(modal);
            document.getElementById('modal-container').appendChild(backdrop);

            modal.querySelectorAll('button[data-action]').forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    backdrop.remove();
                    if (buttons[idx].callback) {
                        buttons[idx].callback();
                    }
                    resolve(buttons[idx].value || idx);
                });
            });

            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    backdrop.remove();
                    resolve(null);
                }
            });

            return modal;
        });
    }

    // Skeleton Loader
    static createSkeletonLoader(type = 'card', count = 1) {
        const skeletons = [];
        
        for (let i = 0; i < count; i++) {
            if (type === 'card') {
                skeletons.push(`
                    <div class="bg-white rounded-lg p-6 shadow-sm mb-4">
                        <div class="skeleton h-6 w-3/4 rounded mb-4"></div>
                        <div class="skeleton h-4 w-full rounded mb-2"></div>
                        <div class="skeleton h-4 w-5/6 rounded mb-2"></div>
                        <div class="skeleton h-4 w-4/5 rounded"></div>
                    </div>
                `);
            } else if (type === 'row') {
                skeletons.push(`
                    <tr>
                        <td class="px-6 py-4"><div class="skeleton h-4 w-20 rounded"></div></td>
                        <td class="px-6 py-4"><div class="skeleton h-4 w-32 rounded"></div></td>
                        <td class="px-6 py-4"><div class="skeleton h-4 w-24 rounded"></div></td>
                        <td class="px-6 py-4"><div class="skeleton h-4 w-20 rounded"></div></td>
                    </tr>
                `);
            } else if (type === 'chat') {
                skeletons.push(`
                    <div class="mb-4">
                        <div class="skeleton h-12 w-3/4 rounded-lg mb-2"></div>
                        <div class="skeleton h-3 w-1/4 rounded"></div>
                    </div>
                `);
            }
        }

        return skeletons.join('');
    }

    // Skeleton HTML Template
    static getSkeletonHTML(type) {
        return this.createSkeletonLoader(type);
    }

    // Badge Component
    static createBadge(text, type = 'info') {
        const classes = {
            info: 'badge-info',
            success: 'badge-success',
            warning: 'badge-warning',
            danger: 'badge-danger'
        };
        return `<span class="inline-block px-3 py-1 rounded-full text-sm font-medium ${classes[type]}">${text}</span>`;
    }

    // Countdown Timer
    static createCountdownTimer(targetDate, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;

            if (distance < 0) {
                container.innerHTML = '<span class="text-red-600 font-bold">Expired</span>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const parts = [];
            if (days > 0) parts.push(`${days}d`);
            if (hours > 0 || days > 0) parts.push(`${String(hours).padStart(2, '0')}h`);
            parts.push(`${String(minutes).padStart(2, '0')}m`);
            parts.push(`${String(seconds).padStart(2, '0')}s`);

            container.textContent = parts.join(' ');
            container.className = 'countdown-timer text-center font-mono';
        };

        updateTimer();
        return setInterval(updateTimer, 1000);
    }

    // Form Validation
    static validateForm(formElement) {
        const formData = new FormData(formElement);
        const errors = {};

        for (let [key, value] of formData.entries()) {
            if (!value || value.trim() === '') {
                errors[key] = 'This field is required';
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
            data: Object.fromEntries(formData)
        };
    }

    // File Upload to Base64
    static fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Responsive Table
    static createResponsiveTable(headers, rows, options = {}) {
        let html = `
            <div class="overflow-x-auto rounded-lg border border-gray-200">
                <table class="w-full">
                    <thead class="bg-gray-100 border-b">
                        <tr>
                            ${headers.map(h => `<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr class="border-b hover:bg-gray-50">
                                ${row.map(cell => `<td class="px-6 py-4 text-sm text-gray-700">${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        return html;
    }

    // Search Filter
    static debounce(func, delay = 300) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Live Search
    static setupLiveSearch(inputSelector, tableSelector, columnsToSearch = [0]) {
        const input = document.querySelector(inputSelector);
        const table = document.querySelector(tableSelector);

        if (!input || !table) return;

        const debounceSearch = this.debounce(() => {
            const searchTerm = input.value.toLowerCase();
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                let matches = false;

                columnsToSearch.forEach(colIndex => {
                    if (cells[colIndex] && cells[colIndex].textContent.toLowerCase().includes(searchTerm)) {
                        matches = true;
                    }
                });

                row.style.display = matches ? '' : 'none';
            });
        });

        input.addEventListener('keyup', debounceSearch);
    }

    // Sort Table
    static setupTableSort(tableSelector, sortableColumns = []) {
        const table = document.querySelector(tableSelector);
        if (!table) return;

        const headers = table.querySelectorAll('thead th');
        
        headers.forEach((header, index) => {
            if (!sortableColumns.includes(index)) return;

            header.style.cursor = 'pointer';
            header.innerHTML += ' <span class="text-gray-400">⇅</span>';
            header.addEventListener('click', () => {
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));

                const isAsc = header.classList.contains('sort-asc');
                
                rows.sort((a, b) => {
                    const aVal = a.querySelectorAll('td')[index].textContent.trim();
                    const bVal = b.querySelectorAll('td')[index].textContent.trim();

                    if (isNaN(aVal) || isNaN(bVal)) {
                        return isAsc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
                    }

                    return isAsc ? bVal - aVal : aVal - bVal;
                });

                headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
                header.classList.toggle('sort-asc', !isAsc);
                header.classList.toggle('sort-desc', isAsc);

                rows.forEach(row => tbody.appendChild(row));
            });
        });
    }
}

// Export for use
window.UIComponents = UIComponents;
