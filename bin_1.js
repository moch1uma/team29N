class Question {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.opinions = [];
        this.maxMarbles = 10;
        this.revealTime = null;
    }
}

class MarbleOpinionSystem {
    constructor() {
        this.questions = [];
        this.currentQuestionId = null;
        this.init();
    }

    init() {
        document.getElementById('addQuestion').addEventListener('click', () => {
            const titleInput = document.getElementById('questionTitle');
            const title = titleInput.value.trim();
            
            if (title) {
                this.addQuestion(title);
                titleInput.value = '';
            }
        });
    }

    addQuestion(title) {
        const id = Date.now().toString();
        const question = new Question(id, title);
        this.questions.push(question);

        this.addQuestionTab(question);
        this.addQuestionContent(question);
        this.switchToQuestion(question.id);
    }

    addQuestionTab(question) {
        const tabsContainer = document.getElementById('questionTabs');
        const tab = document.createElement('div');
        tab.className = 'question-tab';
        tab.dataset.questionId = question.id;
        tab.innerHTML = `
            <span>${question.title}</span>
            <button class="delete-btn">×</button>
        `;

        tab.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                this.switchToQuestion(question.id);
            }
        });

        tab.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteQuestion(question.id);
        });

        tabsContainer.appendChild(tab);
    }

    addQuestionContent(question) {
        const template = document.getElementById('questionTemplate');
        const content = template.content.cloneNode(true);
        const container = content.querySelector('.question-content');
        container.dataset.questionId = question.id;

        // イベントリスナーの設定
        container.querySelector('.submit-btn').addEventListener('click', () => {
            this.submitOpinion(question.id);
        });

        container.querySelector('.reveal-time').addEventListener('change', (e) => {
            this.setRevealTime(question.id, e.target.value);
        });

        document.getElementById('activeQuestionContent').appendChild(container);
    }

    switchToQuestion(questionId) {
        // タブの切り替え
        document.querySelectorAll('.question-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.questionId === questionId);
        });

        // コンテンツの切り替え
        document.querySelectorAll('.question-content').forEach(content => {
            content.style.display = content.dataset.questionId === questionId ? 'block' : 'none';
        });

        this.currentQuestionId = questionId;
    }

    deleteQuestion(questionId) {
        // タブとコンテンツの削除
        document.querySelector(`.question-tab[data-question-id="${questionId}"]`).remove();
        document.querySelector(`.question-content[data-question-id="${questionId}"]`).remove();

        // 質問の削除
        this.questions = this.questions.filter(q => q.id !== questionId);

        // 他の質問があれば最初の質問に切り替え
        if (this.questions.length > 0) {
            this.switchToQuestion(this.questions[0].id);
        }
    }

    submitOpinion(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        const content = document.querySelector(`.question-content[data-question-id="${questionId}"]`);
        const input = content.querySelector('.opinion-input');
        const opinion = input.value.trim();

        if (!opinion) {
            alert('意見を入力してください！');
            return;
        }

        if (question.opinions.length >= question.maxMarbles) {
            alert('最大数に達しました！');
            return;
        }

        question.opinions.push(opinion);
        input.value = '';

        this.addMarble(questionId);
        this.updateProgress(questionId);
    }

    addMarble(questionId) {
        const content = document.querySelector(`.question-content[data-question-id="${questionId}"]`);
        const marblesContainer = content.querySelector('.marbles');
        const marble = document.createElement('div');
        marble.className = 'marble';
        marblesContainer.appendChild(marble);
    }

    updateProgress(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        const content = document.querySelector(`.question-content[data-question-id="${questionId}"]`);
        
        const progress = (question.opinions.length / question.maxMarbles) * 100;
        content.querySelector('.progress').style.width = `${progress}%`;
        content.querySelector('.count-display').textContent = 
            `${question.opinions.length} / ${question.maxMarbles}`;
    }

    setRevealTime(questionId, timeString) {
        const revealTime = new Date(timeString).getTime();
        const now = Date.now();

        if (revealTime <= now) {
            alert('未来の時間を設定してください！');
            return;
        }

        const question = this.questions.find(q => q.id === questionId);
        question.revealTime = revealTime;

        setTimeout(() => {
            this.revealOpinions(questionId);
        }, revealTime - now);
    }

    revealOpinions(questionId) {
        const content = document.querySelector(`.question-content[data-question-id="${questionId}"]`);
        const opinionSection = content.querySelector('.opinions-section');
        const opinionsList = content.querySelector('.opinions-list');
        const question = this.questions.find(q => q.id === questionId);

        opinionSection.classList.remove('hidden');
        opinionsList.innerHTML = '';

        question.opinions.forEach(opinion => {
            const li = document.createElement('li');
            li.textContent = opinion;
            opinionsList.appendChild(li);
        });
    }

    addMarble(questionId) {
        const content = document.querySelector(`.question-content[data-question-id="${questionId}"]`);
        const marblesContainer = content.querySelector('.marbles');
        const marble = document.createElement('div');
        marble.className = 'marble';
    
        const question = this.questions.find(q => q.id === questionId);
        const marbleCount = question.opinions.length;
    
        // 行のインデックスを計算（0から始まる）
        const rowIndex = Math.floor((marbleCount - 1) /  6);
        
        // 現在の行を取得または作成
        let currentRow;
        const existingRows = marblesContainer.querySelectorAll('.marble-row');
        
        if (existingRows.length <= rowIndex) {
            // 新しい行が必要な場合
            currentRow = document.createElement('div');
            currentRow.className = 'marble-row';
            // 一番下に新しい行を追加
            marblesContainer.appendChild(currentRow);
        } else {
            // 既存の行を使用
            currentRow = existingRows[existingRows.length - 1];
        }
    
        currentRow.appendChild(marble);
    }
    
}

// システムの初期化
document.addEventListener('DOMContentLoaded', () => {
    window.opinionSystem = new MarbleOpinionSystem();
});


