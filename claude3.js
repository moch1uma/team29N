// TODOリストの管理
document.getElementById('addTodo').addEventListener('click', function() {
  const content = document.getElementById('todoContent').value;
  const name = document.getElementById('todoName').value;
  
  if (content && name) {
    addTodoItem(content, name);
    document.getElementById('todoContent').value = '';
    document.getElementById('todoName').value = '';
  }
});

function addTodoItem(content, name) {
  const todoList = document.getElementById('todoList');
  const todoItem = document.createElement('div');
  todoItem.className = 'todo-item';
  
  todoItem.innerHTML = `
    <div class="todo-checkbox"></div>
    <span class="todo-text">${content}</span>
    <span class="todo-name">${name}</span>
  `;
  
  todoList.appendChild(todoItem);
  
  // チェックボックスの制御を追加
  const checkbox = todoItem.querySelector('.todo-checkbox');
  checkbox.addEventListener('click', function() {
    this.classList.toggle('checked');
  });
}

// 編集ボタンの制御
document.querySelector('.edit-button').addEventListener('click', function() {
  alert('編集機能は実装予定です');
});

// イベントのある日付のクリックイベント
document.querySelectorAll('.date-cell.has-event').forEach(cell => {
  cell.addEventListener('click', function() {
    const date = this.textContent;
    alert(`${date}日のイベントです`);
  });
});

// サンプルの予定を追加
function addScheduleEvent(startTime, duration, title) {
  const scheduleContent = document.getElementById('scheduleContent');
  const event = document.createElement('div');
  event.className = 'schedule-event';
  
  // 位置とサイズを計算（10:00-22:00の12時間を100%とする）
  const startHour = parseInt(startTime.split(':')[0]);
  const startMinute = parseInt(startTime.split(':')[1]);
  const top = ((startHour - 10) + startMinute / 60) * (100 / 12);
  const height = duration * (100 / 12); // durationは時間単位
  
  event.style.top = `${top}%`;
  event.style.height = `${height}%`;
  event.textContent = title;
  
  scheduleContent.appendChild(event);
}

// サンプルの予定を追加
addScheduleEvent('13:00', 1.5, '会議');
addScheduleEvent('16:30', 2, 'プロジェクトMTG');
addScheduleEvent('20:00', 1, '締め切り作業');