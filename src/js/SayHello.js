/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
import request from './request.js';
import Chat from './Chat.js';

export default class SayHello {
  constructor(app) {
    this.app = app;
    this.sayMyNameBtn = this.app.querySelector('.youname__btn');
    this.name = this.app.querySelector('.youname__input');
    this.user = null;

    this.myNameIs();
  }

  myNameIs() {
    if (!this.app.querySelector('.youname__wrapper')) return;

    document.querySelector('.youname__btn').addEventListener('click', () => {
      if (this.name.value < 1) {
        this.showError('Имя не должно быть менее одного символа');
        return;
      }

      const fd = new FormData();
      fd.set('userName', this.name.value);

      request('/checkUser', 'POST', fd).then(async (response) => {
        const data = await response.json();

        if (data.status) {
          this.showError(data.text);
        } else {
          // Если нет:
          this.name.value = '';
          this.app.querySelector('.youname__wrapper').classList.add('hidden');
          this.user = data.name;
          this.app.insertAdjacentHTML('beforeend', data.html);
          new Chat(this.user);
        }
      });
    });
  }

  showError(text) {
    const errorBox = document.querySelector('.youname__error');
    errorBox.classList.remove('hidden');
    errorBox.textContent = text;

    setInterval(() => {
      errorBox.classList.add('hidden');
    }, 2000);
  }
}
