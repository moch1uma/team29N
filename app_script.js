// ページ管理
function showMainPage() {
    document.getElementById('mainPage').classList.remove('hidden');
    document.getElementById('schedulePage').classList.add('hidden');
}

function showSchedulePage(date) {
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('schedulePage').classList.remove('hidden');
    document.getElementById('selectedDate').textContent = `11月${date}日`;
    loadScheduleAndTasks(date);
}

// カレンダー関連
function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const daysInMonth = 30;
    const firstDay = 3;

    // 既存の日付をクリア（曜日ヘッダーは残す）
    const headers = Array.from(calendarGrid.children).slice(0, 7);
    calendarGrid.innerHTML = '';
    headers.forEach(header => calendarGrid.appendChild(header));

    // 空のセルを追加
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }

    // 日付を追加
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        dayElement.onclick = () => showSchedulePage(i);
        calendarGrid.appendChild(dayElement);
    }
}

// タスク管理
let tasks = [];

function addNewTask() {
    const modal = document.getElementById('taskModal');
    const form = document.getElementById('taskForm');
    
    // フォームをリセット
    form.reset();
    
    // モーダルを表示
    modal.style.display = 'flex';
    
    // フォームの送信イベントを設定
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const task = {
            content: document.getElementById('taskContent').value,
            assignee: document.getElementById('taskAssignee').value,
            deadline: document.getElementById('taskDeadline').value,
            id: Date.now()
        };
        
        tasks.push(task);
        updateTaskList();
        closeTaskModal();
    };
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div>
                <strong>${task.content}</strong>
                <div>担当: ${task.assignee}</div>
                <div>期限: ${task.deadline}</div>
            </div>
            <div>
                <button onclick="editTask(${task.id})" class="edit-btn">編集</button>
                <button onclick="deleteTask(${task.id})" class="delete-btn">削除</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('taskContent').value = task.content;
    document.getElementById('taskAssignee').value = task.assignee;
    document.getElementById('taskDeadline').value = task.deadline;

    const modal = document.getElementById('taskModal');
    const form = document.getElementById('taskForm');
    
    modal.style.display = 'flex';
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        task.content = document.getElementById('taskContent').value;
        task.assignee = document.getElementById('taskAssignee').value;
        task.deadline = document.getElementById('taskDeadline').value;
        
        updateTaskList();
        closeTaskModal();
    };
}

function deleteTask(taskId) {
    if (confirm('このタスクを削除してもよろしいですか？')) {
        tasks = tasks.filter(t => t.id !== taskId);
        updateTaskList();
    }
}

function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

// 予定管理
let schedules = [];

function addNewSchedule() {
    const date = document.getElementById('selectedDate').textContent;
    const time = prompt('時間を入力してください（例: 14:00）:');
    const content = prompt('予定の内容を入力してください:');
    
    if (time && content) {
        schedules.push({
            date: date,
            time: time,
            content: content,
            id: Date.now()
        });
        updateScheduleList();
    }
}

function updateScheduleList() {
    const scheduleList = document.getElementById('scheduleList');
    const currentDate = document.getElementById('selectedDate').textContent;
    
    scheduleList.innerHTML = '';
    
    const daySchedules = schedules.filter(s => s.date === currentDate);
    daySchedules.sort((a, b) => a.time.localeCompare(b.time));
    
    daySchedules.forEach(schedule => {
        const scheduleElement = document.createElement('div');
        scheduleElement.className = 'schedule-item';
        scheduleElement.innerHTML = `
            <div>${schedule.time} - ${schedule.content}</div>
            <button onclick="deleteSchedule(${schedule.id})" class="delete-btn">削除</button>
        `;
        scheduleList.appendChild(scheduleElement);
    });
}

function deleteSchedule(scheduleId) {
    if (confirm('この予定を削除して
