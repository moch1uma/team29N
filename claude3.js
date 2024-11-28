// カレンダーの日付選択
document.querySelectorAll('.date-cell.selectable').forEach(cell => {
  cell.addEventListener('click', function() {
    const date = this.textContent;
    const hasEvent = this.classList.contains('has-event');
    
    if (hasEvent) {
      alert(`${date}日のイベントです`);
    } else {
      // イベントがない場合は「イベントなし」と表示するだけ
      alert(`${date}日のイベントはありません`);
    }
  });
});

// その他のコードは変更なし...
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
  
  const checkbox = todoItem.querySelector('.todo-checkbox');
  checkbox.addEventListener('click', function() {
    this.classList.toggle('checked');
    todoItem.classList.toggle('checked');
  });
}

// 編集ボタンの制御
document.querySelectorAll('.edit-button').forEach(button => {
  button.addEventListener('click', function() {
    if (this.classList.contains('schedule-edit')) {
      editSchedule();
    } else {
      editCalendar();
    }
  });
});


function editSchedule() {
  const scheduleContent = document.getElementById('scheduleContent');
  if (!scheduleContent.querySelector('.schedule-event.editing')) {
    // 編集モードを開始
    const events = scheduleContent.querySelectorAll('.schedule-event');
    events.forEach(event => {
      event.classList.add('editing');
      event.setAttribute('contenteditable', 'true');
    });
    alert('予定をクリックして編集できます。編集ボタンを再度クリックして完了します。');
  } else {
    // 編集モードを終了
    const events = scheduleContent.querySelectorAll('.schedule-event');
    events.forEach(event => {
      event.classList.remove('editing');
      event.removeAttribute('contenteditable');
    });
    alert('編集を完了しました');
  }
}

function addScheduleEvent(startTime, duration, title) {
  const scheduleContent = document.getElementById('scheduleContent');
  const event = document.createElement('div');
  event.className = 'schedule-event';
  
  // 位置とサイズを計算（9:00-24:00の15時間を100%とする）
  const startHour = parseInt(startTime.split(':')[0]);
  const startMinute = parseInt(startTime.split(':')[1]);
  const top = ((startHour - 9.5) + startMinute / 60) * (100 / 15);
  const height = duration * (100 / 15); // durationは時間単位
  
  event.style.top = `${top}%`;
  event.style.height = `${height}%`;
  event.textContent = title;
  
  scheduleContent.appendChild(event);
}

// サンプルの予定を追加
addScheduleEvent('9:00', 3, '授業');
addScheduleEvent('17:00', 4, 'バイト');
addScheduleEvent('22:00', 1, 'GW');