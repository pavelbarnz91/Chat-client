/* eslint-disable import/extensions */
/* eslint-disable no-new */
import SayHello from './SayHello.js';

class StartChat {
  constructor() {
    this.appWindow = document.querySelector('.wrapper');
    this.start();
  }

  start() {
    new SayHello(this.appWindow);
  }
}

new StartChat();
