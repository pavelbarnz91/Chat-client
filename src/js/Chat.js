/* eslint-disable class-methods-use-this */
export default class Chat {
  constructor(user) {
    this.user = user;
    this.usersOnline = [this.user];
    this.wrapper = document.querySelector('.wrapper');
    this.usersOnlineList = this.wrapper.querySelector('.chat__users-online');
    this.enterMessageWindow = this.wrapper.querySelector('.input-box__input');
    this.btnBox = this.wrapper.querySelector('.enter-message-box__btn-box');
    this.exitBtn = this.wrapper.querySelector('.chat__exit-btn');

    this.startChat();
  }

  startChat() {
    const ws = new WebSocket('wss://chatserver0.herokuapp.com');

    this.exitBtn.addEventListener('click', () => {
      ws.send(JSON.stringify({ del: this.user }));
      document.querySelector('.chat').remove();
      document.querySelector('.youname__wrapper').classList.remove('hidden');
      ws.close();
    });

    ws.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.text !== undefined) {
        const sms = this.pickOutMySms(data);

        document.querySelector('.chat__messages-window').insertAdjacentHTML('beforeend', sms);

        this.scrollDownChat();
        this.enterMessageWindow.value = '';
        return;
      }

      /// ////////////ONLNE USERS/////////////
      const usersElement = document.createElement('div');
      usersElement.classList.add('chat__users-online');

      data.users.forEach((item) => {
        let user;
        if (item.userName === this.user.userName) {
          user = `<span class="onlineUser me">${item.userName}</span>`;
        } else {
          user = `<span class="onlineUser">${item.userName}</span>`;
        }
        usersElement.insertAdjacentHTML('beforeend', user);
      });

      const lastUserElement = document.querySelector('.chat__users-online');
      document.querySelector('.chat__users').replaceChild(usersElement, lastUserElement);

      /// ////////////ACTUAL DIALOG/////////////
      const actualDialogEl = document.createElement('div');
      actualDialogEl.classList.add('chat__messages-window');

      data.actualDialog.forEach((item) => {
        const sms = this.pickOutMySms(item);

        actualDialogEl.insertAdjacentHTML('beforeend', sms);
      });

      this.messagesWindow = document.querySelector('.chat__messages-window');
      document.querySelector('.chat__window').replaceChild(actualDialogEl, this.messagesWindow);

      this.scrollDownChat();
    });

    this.btnBox.addEventListener('click', (e) => {
      if (e.target.dataset.messagebtn === 'clear') {
        this.enterMessageWindow.value = '';
        this.enterMessageWindow.focus();
      } else if (e.target.dataset.messagebtn === 'send') {
        const sms = {
          userName: this.user.userName,
          date: this.setDate(),
          text: this.enterMessageWindow.value,
        };

        ws.send(JSON.stringify(sms));
      }
    });
  }

  setDate() {
    const thisDate = new Date();
    const hours = thisDate.getHours() < 10 ? `0${thisDate.getHours()}` : thisDate.getHours();
    const minutes = thisDate.getMinutes() < 10 ? `0${thisDate.getMinutes()}` : thisDate.getMinutes();
    const day = thisDate.getDate() < 10 ? `0${thisDate.getDate()}` : thisDate.getDate();
    const month = thisDate.getMonth() < 10 ? `0${thisDate.getMonth()}` : thisDate.getMonth();
    const year = thisDate.getFullYear();

    return `${hours}:${minutes} ${day}.${month + 1}.${year}`;
  }

  scrollDownChat() {
    const mw = document.querySelector('.chat__messages-window');

    mw.scrollTo({
      top: mw.scrollHeight,
    });
  }

  pickOutMySms(data) {
    if (data.userName === this.user.userName) {
      return `<div class="my-sms">
                        <div class="sms__header-me">
                            <span class="autor">${data.userName}</span>
                            <span class="date">${data.date}</span>
                        </div>
                        <span>${data.text}</span>
                    </div>`;
    }
    return `<div class="sms">
                        <div class="sms__header">
                            <span class="autor">${data.userName}</span>
                            <span class="date">${data.date}</span>
                        </div>
                        <span>${data.text}</span>
                    </div>`;
  }
}
