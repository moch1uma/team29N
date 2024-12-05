class ScheduleManager {
    constructor() {
        this.initializeEvents();
        this.initializeCommonEvents();
    }

    initializeEvents() {
        // 既存のイベント初期化処理
        const events = document.querySelectorAll('.event');
        events.forEach(event => {
            event.addEventListener('click', (e) => {
                this.handleEventClick(e);
            });
        });
    }

    initializeCommonEvents() {
        // 共通予定追加ボタンのイベントリスナー
        const addCommonBtn = document.querySelector('.add-common-btn');
        if (addCommonBtn) {
            addCommonBtn.addEventListener('click', () => {
                this.handleAddCommonEvent();
            });
        }

        // 共通予定のイベントリスナー
        const commonEvents = document.querySelectorAll('.common-event');
        commonEvents.forEach(event => {
            event.addEventListener('click', (e) => {
                this.handleCommonEventClick(e);
            });
        });
    }

    handleEventClick(e) {
        const event = e.target;
        console.log('予定がクリックされました:', event.textContent);
    }

    handleCommonEventClick(e) {
        const event = e.target;
        console.log('共通予定がクリックされました:', event.textContent);
    }

    handleAddCommonEvent() {
        // 新規共通予定追加のダイアログを表示する処理
        const startTime = prompt('開始時間を入力してください (例: 14:00):', '');
        const duration = prompt('予定の長さを入力してください (時間単位):', '1');
        const title = prompt('予定のタイトルを入力してください:', '');

        if (startTime && duration && title) {
            this.addCommonEvent({
                startTime,
                duration,
                title
            });
        }
    }

    addCommonEvent(eventData) {
        // 時間を位置とwidthに変換する処理
        const startHour = parseInt(eventData.startTime.split(':')[0], 10);
        const left = 5 + ((startHour - 10) / 14.5) * 95; // 10時を10%として計算
        const width = (parseFloat(eventData.duration) / 14.5) * 95; // 幅も全体の90%を基準に計算
        

        const eventElement = document.createElement('div');
        eventElement.className = 'event common-event';
        eventElement.style.left = `${left}%`;
        eventElement.style.width = `${width}%`;
        eventElement.textContent = eventData.title;

        const eventsLayer = document.querySelector('.common-events-container .events-layer');
        eventsLayer.appendChild(eventElement);

       m // 新しいイベントにクリックイベントを追加
        eventElement.addEventListener('click', (e) => this.handleComonEventClick(e));
    }

    // 既存の予定追加メソッド
    addEvent(timelineElement, eventData) {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.style.left = eventData.left;
        eventElement.style.width = eventData.width;
        eventElement.textContent = eventData.title;
        
        const eventsLayer = timelineElement.querySelector('.events-layer');
        eventsLayer.appendChild(eventElement);
        
        eventElement.addEventListener('click', (e) => this.handleEventClick(e));
    }
}

// スケジュール管理インスタンスの作成
const scheduleManager = new ScheduleManager();