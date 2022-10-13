import socketIo, { Socket } from "socket.io-client";

type EventHandler = {
  eventName: string;
  callback: (eventData: any) => void;
  isSubscribed: boolean;
};

export class SocketClient {
  private static wsUrl = process.env.VUE_APP_WEBSOCKET_URL;
  private socketIo?: Socket;
  private handlers: EventHandler[] = [];

  connect(token: string) {
    this.socketIo = socketIo(SocketClient.wsUrl, {
      auth: {
        token,
      },
    });

    for (const handler of this.handlers) {
      if (!handler.isSubscribed) {
        this.socketIo.on(handler.eventName, handler.callback);
      }
    }
  }

  on<T>(eventName: string, callback: (eventData: T) => void) {
    this.handlers.push({ eventName, callback, isSubscribed: !!this.socketIo });
    if (!this.socketIo) return;
    this.socketIo.on(eventName, callback);
  }

  emit<T>(eventName: string, eventData: T) {
    if (!this.socketIo) return;
    this.socketIo.emit(eventName, eventData);
  }
}
