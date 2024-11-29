let opinions = [];
let maxMarbles = 10;

document.getElementById("maxMarbles").addEventListener("input", (e) => {
  maxMarbles = parseInt(e.target.value);
  updateProgress();
});

document.getElementById("submitOpinion").addEventListener("click", () => {
  const input = document.getElementById("opinionInput");
  const opinion = input.value.trim();

  if (!opinion) {
    alert("意見を入力してください！");
    return;
  }

  if (opinions.length >= maxMarbles) {
    alert("最大数に達しました！");
    return;
  }

  opinions.push(opinion);
  input.value = "";

  addMarble();
  updateProgress();
});

function addMarble() {
  const marbles = document.getElementById("marbles");
  const marble = document.createElement("div");
  marbles.appendChild(marble);
}

function updateProgress() {
  const progress = (opinions.length / maxMarbles) * 100;
  document.getElementById("progress").style.width = progress + "%";
  document.getElementById("countDisplay").textContent = `${opinions.length} / ${maxMarbles}`;
}

// 公開機能
document.getElementById("revealTime").addEventListener("change", (e) => {
  const revealTime = new Date(e.target.value).getTime();
  const now = Date.now();

  if (revealTime <= now) {
    alert("未来の時間を設定してください！");
    return;
  }

  setTimeout(() => {
    document.querySelector(".opinions-section").classList.remove("hidden");
    const opinionList = document.getElementById("opinionList");
    opinionList.innerHTML = "";
    opinions.forEach((opinion) => {
      const li = document.createElement("li");
      li.textContent = opinion;
      opinionList.appendChild(li);
    });
  }, revealTime - now);
});
