class TimesheetTracker {
    constructor() {
        this.entries = this.loadEntries();
        this.init();
    }

    init() {
        this.updateCurrentDate();
        this.updateSummary();
        this.displayLogEntries();
        this.displayWeeklyTable();
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    }

    logEntry(type) {
        const now = new Date();
        const entry = {
            id: Date.now(),
            type: type,
            timestamp: now.toISOString(),
            date: now.toDateString(),
            time: now.toLocaleTimeString('en-US', { hour12: false })
        };

        this.entries.push(entry);
        this.saveEntries();
        this.updateSummary();
        this.displayLogEntries();
        this.displayWeeklyTable();
        this.showStatusMessage(`${this.formatEntryType(type)} logged at ${entry.time}`);
    }

    formatEntryType(type) {
        const typeMap = {
            'clock-in': 'Clock In',
            'lunch-out': 'Lunch Out',
            'lunch-in': 'Lunch In',
            'clock-out': 'Clock Out'
        };
        return typeMap[type] || type;
    }

    calculateDailyHours(dateString) {
        const dayEntries = this.entries.filter(entry => entry.date === dateString);
        
        let clockIn = null;
        let clockOut = null;
        let lunchOut = null;
        let lunchIn = null;

        // Get the last occurrence of each type for the day
        dayEntries.forEach(entry => {
            switch(entry.type) {
                case 'clock-in':
                    clockIn = new Date(entry.timestamp);
                    break;
                case 'clock-out':
                    clockOut = new Date(entry.timestamp);
                    break;
                case 'lunch-out':
                    lunchOut = new Date(entry.timestamp);
                    break;
                case 'lunch-in':
                    lunchIn = new Date(entry.timestamp);
                    break;
            }
        });

        if (!clockIn || !clockOut) return 0;

        let totalMs = clockOut - clockIn;
        
        // Subtract lunch break if both lunch out and lunch in are recorded
        if (lunchOut && lunchIn && lunchIn > lunchOut) {
            totalMs -= (lunchIn - lunchOut);
        }

        return Math.max(0, totalMs / (1000 * 60 * 60)); // Convert to hours
    }

    updateSummary() {
        const today = new Date().toDateString();
        const todayHours = this.calculateDailyHours(today);
        
        // Calculate this week's total hours
        const startOfWeek = this.getStartOfWeek(new Date());
        const weeklyHours = this.getCurrentWeekDates().reduce((total, date) => {
            return total + this.calculateDailyHours(date.toDateString());
        }, 0);

        document.getElementById('todayHours').textContent = todayHours.toFixed(2);
        document.getElementById('totalHours').textContent = weeklyHours.toFixed(2);
    }

    getStartOfWeek(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    }

    getCurrentWeekDates() {
        const today = new Date();
        const startOfWeek = this.getStartOfWeek(today);
        const dates = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        
        return dates;
    }

    displayLogEntries() {
        const logContainer = document.getElementById('logEntries');
        
        // Sort entries by timestamp (newest first)
        const sortedEntries = [...this.entries].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        // Show only last 10 entries
        const recentEntries = sortedEntries.slice(0, 10);

        logContainer.innerHTML = recentEntries.map(entry => `
            <div class="log-entry">
                <div>
                    <div class="log-entry-type">${this.formatEntryType(entry.type)}</div>
                    <div class="log-entry-date">${entry.date}</div>
                </div>
                <div class="log-entry-time">${entry.time}</div>
            </div>
        `).join('');
    }

    displayWeeklyTable() {
        const tableBody = document.getElementById('weeklyTableBody');
        const weekDates = this.getCurrentWeekDates();
        
        tableBody.innerHTML = weekDates.map(date => {
            const dateString = date.toDateString();
            const dayEntries = this.entries.filter(entry => entry.date === dateString);
            
            const clockIn = this.getLastEntryTime(dayEntries, 'clock-in');
            const lunchOut = this.getLastEntryTime(dayEntries, 'lunch-out');
            const lunchIn = this.getLastEntryTime(dayEntries, 'lunch-in');
            const clockOut = this.getLastEntryTime(dayEntries, 'clock-out');
            const totalHours = this.calculateDailyHours(dateString);
            
            return `
                <tr>
                    <td>${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                    <td>${clockIn || '-'}</td>
                    <td>${lunchOut || '-'}</td>
                    <td>${lunchIn || '-'}</td>
                    <td>${clockOut || '-'}</td>
                    <td>${totalHours > 0 ? totalHours.toFixed(2) : '-'}</td>
                </tr>
            `;
        }).join('');
    }

    getLastEntryTime(entries, type) {
        const typeEntries = entries.filter(entry => entry.type === type);
        return typeEntries.length > 0 ? typeEntries[typeEntries.length - 1].time : null;
    }

    showStatusMessage(message) {
        // Remove existing status message
        const existingMessage = document.querySelector('.status-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new status message
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status-message';
        statusDiv.textContent = message;
        
        // Insert after action buttons
        const actionButtons = document.querySelector('.action-buttons');
        actionButtons.insertAdjacentElement('afterend', statusDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            statusDiv.remove();
        }, 3000);
    }

    clearData() {
        if (confirm('Are you sure you want to clear all timesheet data? This action cannot be undone.')) {
            this.entries = [];
            this.saveEntries();
            this.updateSummary();
            this.displayLogEntries();
            this.displayWeeklyTable();
            this.showStatusMessage('All data has been cleared.');
        }
    }

    exportData() {
        const data = {
            entries: this.entries,
            exported: new Date().toISOString(),
            weeklyData: this.getCurrentWeekDates().map(date => {
                const dateString = date.toDateString();
                const dayEntries = this.entries.filter(entry => entry.date === dateString);
                return {
                    date: dateString,
                    clockIn: this.getLastEntryTime(dayEntries, 'clock-in'),
                    lunchOut: this.getLastEntryTime(dayEntries, 'lunch-out'),
                    lunchIn: this.getLastEntryTime(dayEntries, 'lunch-in'),
                    clockOut: this.getLastEntryTime(dayEntries, 'clock-out'),
                    totalHours: this.calculateDailyHours(dateString)
                };
            })
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `timesheet-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showStatusMessage('Data exported successfully!');
    }

    loadEntries() {
        const saved = localStorage.getItem('timesheetEntries');
        return saved ? JSON.parse(saved) : [];
    }

    saveEntries() {
        localStorage.setItem('timesheetEntries', JSON.stringify(this.entries));
    }
}

// Initialize the app
let tracker;

document.addEventListener('DOMContentLoaded', () => {
    tracker = new TimesheetTracker();
});

// Global functions for button clicks
function logEntry(type) {
    tracker.logEntry(type);
}

function clearData() {
    tracker.clearData();
}

function exportData() {
    tracker.exportData();
}
