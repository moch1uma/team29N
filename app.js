// カレンダー機能
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // 月の最初の日と曜日を取得
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let days = "";
    
    // 空のセル（前月の残り部分）
    for (let i = 0; i < firstDay; i++) {
      days += "<div class='empty'></div>";
    }
    
    // 今月の日付を表示
    for (let date = 1; date <= lastDate; date++) {
      days += `<div class='day' onclick='selectDay(${date})'>${date}</div>`;
    }
    
    calendar.innerHTML = days;
  }
  
  function selectDay(day) {
    const taskManager = document.getElementById("task-manager");
    taskManager.style.display = "block";
    const taskText = document.getElementById("task-text");
    taskText.placeholder = `タスクを追加（${day}日）...`;
  }
  
  // To Do リスト
  function addTodo() {
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const newTodo = input.value.trim();
    
    if (newTodo) {
      const li = document.createElement("li");
      li.textContent = newTodo;
      li.onclick = () => li.remove(); // クリックで削除
      todoList.appendChild(li);
    }
    
    input.value = ""; // 入力欄を空にする
  }
  
  // 投票機能
  let votes = { good: 0, neutral: 0, bad: 0 };
  
  function vote(type) {
    votes[type]++;
    document.getElementById(`${type}-votes`).textContent = votes[type];
  }
  
  // 初期化
  generateCalendar();
  