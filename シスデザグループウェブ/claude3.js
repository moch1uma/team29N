// カレンダーの日付選択
class CalendarManager {
    constructor() {
        this.initializeCalendar();
    }

    initializeCalendar() {
        document.querySelectorAll('.date-cell.selectable').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const date = e.target.textContent;
                const hasEvent = e.target.classList.contains('has-event');
                
                if (hasEvent) {
                    alert(`${date}日のイベントです`);
                } else {
                    alert(`${date}日のイベントはありません`);
                }
            });
        });
    }
}

// TODOリストの管理
class TodoManager {
    constructor() {
        this.initializeTodo();
    }

    initializeTodo() {
        const addButton = document.getElementById('addTodo');
        if (addButton) {
            addButton.addEventListener('click', () => {
                const content = document.getElementById('todoContent').value;
                const name = document.getElementById('todoName').value;
                
                if (!content && !name) {
                    alert('内容と名前を入力してください。');
                    return;
                }
                if (!content) {
                    alert('内容を入力してください。');
                    return;
                }
                if (!name) {
                    alert('名前を入力してください。');
                    return;
                }
                
                this.addTodoItem(content, name);
                document.getElementById('todoContent').value = '';
                document.getElementById('todoName').value = '';
            });
        }
    }

    addTodoItem(content, name) {
        const todoList = document.getElementById('todoList');
        if (todoList) {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            
            todoItem.innerHTML = `
                <div class="todo-checkbox"></div>
                <span class="todo-text">${content}</span>
                <span class="todo-name">${name}</span>
            `;
            
            todoList.appendChild(todoItem);
            
            const checkbox = todoItem.querySelector('.todo-checkbox');
            checkbox.addEventListener('click', function() {
                this.classList.toggle('checked');
                todoItem.classList.toggle('checked');
            });
        }
    }
}

// 投票機能の管理
class VotingManager {
    constructor() {
        this.initializeVoting();
    }

    initializeVoting() {
        const voteButton = document.querySelector('.vote-button');
        const voteDateInput = document.getElementById('voteDate');

        if (voteDateInput) {
            const today = new Date().toISOString().split('T')[0];
            voteDateInput.value = today;
        }

        if (voteButton) {
            voteButton.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedDate = document.getElementById('voteDate').value;
                if (selectedDate) {
                    const voteUrl = `/vote?date=${selectedDate}`;
                    window.location.href = voteUrl;
                } else {
                    alert('日付を選択してください。');
                }
            });
        }
    }
}

// スケジュール管理
class ScheduleManager {
    constructor() {
        this.initializeSchedule();
        this.setupEventListeners();
        this.isEditing = false;
    }

    initializeSchedule() {
        this.scheduleContent = document.getElementById('scheduleContent');
        this.editButton = document.querySelector('.schedule-edit');
        this.scheduleForm = document.querySelector('.schedule-form');
        this.addButton = document.querySelector('.add-schedule-btn');
    }

    setupEventListeners() {
        if (this.editButton) {
            this.editButton.addEventListener('click', () => this.handleEditClick());
        }

        if (this.addButton) {
            this.addButton.addEventListener('click', () => this.toggleAddEventForm());
        }

        const addEventBtn = document.getElementById('addEventBtn');
        const cancelEventBtn = document.getElementById('cancelEventBtn');
        if (addEventBtn && cancelEventBtn) {
            addEventBtn.addEventListener('click', () => this.handleAddEventSubmit());
            cancelEventBtn.addEventListener('click', () => this.hideAddEventForm());
        }

        if (this.scheduleContent) {
            this.scheduleContent.addEventListener('click', (e) => {
                if (e.target.classList.contains('schedule-event') && this.isEditing) {
                    this.handleEventClick(e.target);
                }
            });
        }
    }

    toggleAddEventForm() {
        if (this.scheduleForm) {
            this.scheduleForm.style.display = 
                this.scheduleForm.style.display === 'none' ? 'flex' : 'none';
        }
    }

    hideAddEventForm() {
        if (this.scheduleForm) {
            this.scheduleForm.style.display = 'none';
            document.getElementById('eventStartTime').value = '';
            document.getElementById('eventDuration').value = '';
            document.getElementById('eventTitle').value = '';
        }
    }

    handleAddEventSubmit() {
        const startTime = document.getElementById('eventStartTime').value;
        const duration = document.getElementById('eventDuration').value;
        const title = document.getElementById('eventTitle').value;

        if (!startTime || !duration || !title) {
            alert('すべての項目を入力してください。');
            return;
        }

        const [hours] = startTime.split(':').map(Number);
        if (hours < 8 || hours > 24) {
            alert('開始時間は8:00から24:00の間で設定してください。');
            return;
        }

        const durationNum = parseFloat(duration);
        if (durationNum < 0.5 || durationNum > 14) {
            alert('予定の長さは0.5から14時間の間で設定してください。');
            return;
        }

        this.addScheduleEvent(startTime, durationNum, title);
        this.hideAddEventForm();
    }

    handleEditClick() {
        this.isEditing = !this.isEditing;
        const events = this.scheduleContent.querySelectorAll('.schedule-event');
        
        events.forEach(event => {
            event.classList.toggle('editing');
        });
        
        if (this.editButton) {
            this.editButton.textContent = this.isEditing ? '編集を完了' : '編集';
        }
    }

    handleEventClick(event) {
        const title = event.textContent;
        const newTitle = prompt('予定の内容を編集:', title);
        if (newTitle !== null && newTitle.trim() !== '') {
            event.textContent = newTitle;
        }
    }

    addScheduleEvent(startTime, duration, title) {
        const event = document.createElement('div');
        event.className = 'schedule-event';
        
        const [hours, minutes] = startTime.split(':').map(Number);
        const top = ((hours - 8) + minutes / 60) * (100 / 16);
        const height = duration * (100 / 16);
        
        if (top < 0 || top > 100 || top + height > 100) {
            alert('指定された時間が表示範囲外です。');
            return;
        }
        
        event.style.top = `${top}%`;
        event.style.height = `${height}%`;
        event.textContent = title;
        
        this.scheduleContent.appendChild(event);
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    window.calendarManager = new CalendarManager();
    window.todoManager = new TodoManager();
    window.votingManager = new VotingManager();
    window.scheduleManager = new ScheduleManager();
});