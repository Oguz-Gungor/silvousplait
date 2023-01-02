export class Observer {
  private listenerMap: {
    [action: string]: { [key: string]: (...args: any[]) => void };
  } = {};

  public addListener(
    action: string,
    listener: (...args: any[]) => any,
    key?: string
  ) {
    if (this.listenerMap[action] == null) {
      this.listenerMap[action] = {};
    }
    this.listenerMap[action][
      key || Object.keys(this.listenerMap[action]).length
    ] = listener;
  }

  public removeListener(action: string, key: string) {
    delete (this.listenerMap[action] ?? { key: null })[key];
  }

  public clearActionListeners(action: string) {
    delete this.listenerMap[action];
  }

  public notify(
    { action, key }: { action: string; key?: string },
    ...payload: any[]
  ) {
    if (key != null) {
      (this.listenerMap[action] ?? { key: () => {console.log("There is no listener for this action and key pair")} })[key](...payload);
    } else {
      Object.values(
        this.listenerMap[action] ?? {
          [action]: () => console.log("There are no listeners for this action"),
        }
      ).forEach((listener) => listener(...payload));
    }
  }
}
