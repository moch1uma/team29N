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
      document.getElementById('addTodo').addEventListener('click', () => {
          const content = document.getElementById('todoContent').value;
          const name = document.getElementById('todoName').value;
          
          if (content && name) {
              this.addTodoItem(content, name);
              document.getElementById('todoContent').value = '';
              document.getElementById('todoName').value = '';
          }
      });
  }

  addTodoItem(content, name) {
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

}
// TodoManagerクラスに以下のメソッドを追加
class TodoManager {
    constructor() {
      this.initializeTodo();
      this.initializeVoting(); // 新しく追加
    }
  
    // 投票機能の初期化
    initializeVoting() {
      const voteButton = document.querySelector('.vote-button');
      const voteDateInput = document.getElementById('voteDate');
  
      // 現在の日付をデフォルト値として設定
      const today = new Date().toISOString().split('T')[0];
      voteDateInput.value = today;
  
      voteButton.addEventListener('click', () => {
        const selectedDate = voteDateInput.value;
        if (selectedDate) {
          // ここに投票処理を追加
          alert(`${selectedDate}に投票しました！`);
        } else {
          alert('日付を選択してください。');
        }
      });
    }
  }

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
      // 編集ボタン
      if (this.editButton) {
          this.editButton.addEventListener('click', () => this.handleEditClick());
      }

      // 予定追加ボタン
      if (this.addButton) {
          this.addButton.addEventListener('click', () => this.toggleAddEventForm());
      }

      // フォームの送信とキャンセル
      const addEventBtn = document.getElementById('addEventBtn');
      const cancelEventBtn = document.getElementById('cancelEventBtn');
      if (addEventBtn && cancelEventBtn) {
          addEventBtn.addEventListener('click', () => this.handleAddEventSubmit());
          cancelEventBtn.addEventListener('click', () => this.hideAddEventForm());
      }

      // 既存の予定のクリック
      this.scheduleContent.addEventListener('click', (e) => {
          if (e.target.classList.contains('schedule-event') && this.isEditing) {
              this.handleEventClick(e.target);
          }
      });
  }

  toggleAddEventForm() {
      if (this.scheduleForm.style.display === 'none') {
          this.scheduleForm.style.display = 'flex';
      } else {
          this.scheduleForm.style.display = 'none';
      }
  }

  hideAddEventForm() {
      this.scheduleForm.style.display = 'none';
      // フォームをリセット
      document.getElementById('eventStartTime').value = '';
      document.getElementById('eventDuration').value = '';
      document.getElementById('eventTitle').value = '';
  }



  handleAddEventSubmit() {
      const startTime = document.getElementById('eventStartTime').value;
      const duration = document.getElementById('eventDuration').value;
      const title = document.getElementById('eventTitle').value;

      if (startTime && duration && title) {
          // 時間の検証
          const [hours] = startTime.split(':').map(Number);
          if (hours < 8 || hours > 24) {
              alert('開始時間は9:00から24:00の間で設定してください。');
              return;
          }

          // 長さの検証
          const durationNum = parseFloat(duration);
          if (durationNum < 0.5 || durationNum > 14) {
              alert('予定の長さは0.5から14時間の間で設定してください。');
              return;
          }

          this.addScheduleEvent(startTime, durationNum, title);
          this.hideAddEventForm();
      } else {
          alert('すべての項目を入力してください。');
      }
  }

  handleEditClick() {
      this.isEditing = !this.isEditing;
      const events = this.scheduleContent.querySelectorAll('.schedule-event');

      if (this.isEditing) {
          events.forEach(event => {
              event.classList.add('editing');
          });
          this.editButton.textContent = '編集を完了';
      } else {
          events.forEach(event => {
              event.classList.remove('editing');
          });
          this.editButton.textContent = '編集';
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
      
      // 位置とサイズを計算
      const [hours, minutes] = startTime.split(':').map(Number);
      const top = ((hours - 8) + minutes / 60) * (100 / 16); // 16時間（8:00-24:00）
      const height = duration * (100 / 16);
      
      // 位置が範囲外にならないように調整
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
  window.scheduleManager = new ScheduleManager();
  
  // サンプルの予定を追加（必要な場合）
  // window.scheduleManager.addInitialEvents();
});