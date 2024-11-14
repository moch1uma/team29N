// カレンダー関連の機能
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
        dayElement.onclick = () => selectDate(i);
        calendarGrid.appendChild(dayElement);
    }
}

function selectDate(day) {
    // 選択された日付の処理
    document.querySelectorAll('.calendar-day').forEach(el => {
        el.classList.remove('selected');
    });
    
    const selectedElement = Array.from(document.querySelectorAll('.calendar-day'))
        .find(el => el.textContent === day.toString());
    
    if (selectedElement) {
        selectedElement.classList.add('selected');
        showTasksAndTimetable();
    }
}

function showTasksAndTimetable() {
    document.getElementById('taskManagement').classList.remove('hidden');
    document.getElementById('timetable').classList.remove('hidden');
}

// 編集機能
function editCalendar() {
    // カレンダー編集機能の実装
    alert('カレンダー編集モード');
}

function editTasks() {
    // タスク編集機能の実装
    alert('タスク編集モード');
}

function editTimetable() {
    // 時間割編集機能の実装
    alert('時間割編集モード');
}

function editTodo() {
    // ToDo編集機能の実装
    alert('ToDo編集モード');
}

// ToDoリスト機能
function addNewTodo() {
    const text = prompt('新しいタスクを入力してください:');
    if (text) {
        const todoList = document.getElementById('todoList');
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox">
            <span>${text}</span>
            <button onclick="deleteTodo(this)">削除</button>
        `;
        todoList.appendChild(li);
    }
}

function deleteTodo(button) {
    button.closest('.todo-item').remove();
}

// 投票システムとビー玉の表示
let marbles = {
    option1: 0,
    option2: 0
};

function addMarble(option) {
    marbles[option]++;
    updateMarbles();
}

function updateMarbles() {
    const jar = document.querySelector('.jar-svg');
    // 既存のビー玉をクリア
    const existingMarbles = jar.querySelectorAll('.marble');
    existingMarbles.forEach(marble => marble.remove());

    // 新しいビー玉を追加
    Object.entries(marbles).forEach(([option, count]) => {
        for (let i = 0; i < count; i++) {
            const marble = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            marble.setAttribute('class', 'marble');
            marble.setAttribute('cx', 60 + Math.random() * 80);
            marble.setAttribute('cy', 220 - (i * 20));
            marble.setAttribute('r', '8');
            jar.appendChild(marble);
        }
    });
}

// 初期化
window.onload = () => {
    generateCalendar();
    updateMarbles();
};
