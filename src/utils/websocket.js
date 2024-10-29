/* eslint-disable no-console */
import { isJSON } from './lang';
const resource_id = '2178f72b-9d53-4f9a-99bd-07f29a795cef';
const READY_STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export default class WebSocketClient {
  constructor(url, path = '/', receive, openCallback) {
    this.url = `${url}${path}`;
    this.client = new WebSocket(url);
    this.receive = receive;
    this.connect();
    this.lockReconnect = false;
    this.openCallback = openCallback;
  }

  connect() {
    this.client.onopen = () => {
      this.openCallback && this.openCallback(this.client);
      console.log('websocket connect success');
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        //Enable heartbeat after connection
        this.client.send(JSON.stringify(this.sendData || 'forHeart'));
      }, 20 * 1000);
    };

    this.client.onmessage = (message) => {
      const { data } = message;
      console.log(this.receive);
      if (!data || !isJSON(data.toString())) return;
      this.receive && this.receive(JSON.parse(data));
    };

    this.client.onsend = (data) => {
      if (this.client.readyState === READY_STATE.OPEN) {
        console.log('websocket sendData');
        this.client.send(
          typeof data === 'string' ? data : JSON.stringify(data || ''),
        );
      } else {
        console.log('websocket not open');
      }
    };

    this.client.onclose = () => {
      console.log('websocket closed');
      this.reConnect();
    };

    this.client.onerror = (e) => {
      console.error('onerror', e);
    };
  }

  reConnect = () => {
    console.log('reConnect');
    if (this.lockReconnect) {
      // Has the reconnection been executed
      return;
    }
    this.lockReconnect = true;
    this.recTimer = setTimeout(() => {
      this.clearnData();
      this.connect();
      this.lockReconnect = false;
    }, 2000);
  };

  clearnData = () => {
    this.timer && clearInterval(this.timer);
    this.client && this.client.close() && this.client.close();
    this.timer = '';
  };

  disconnect() {
    this.client && this.client.close() && this.client.close();
    this.clearnData();
    this.recTimer && clearTimeout(this.recTimer);
    this.recTimer = '';
  }
}
