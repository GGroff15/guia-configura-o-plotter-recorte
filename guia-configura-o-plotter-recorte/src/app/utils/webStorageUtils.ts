export class WebStorageUtil {
  static get(key: string): any {
    const valores = JSON.parse(localStorage.getItem(key)!);
    if(valores === null || valores === undefined) {
      return [];
    }
    return valores;
  }

  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getArray(key: string): any[] {
    if (localStorage.getItem(key) == undefined) {
      localStorage.setItem(key, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(key)!);
  }

  static setArray(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static saveItemArray(keyCollection: string, value: any) {
    let collection = this.getArray(keyCollection);
    collection.push(value);
    this.setArray(keyCollection, collection);
  }

  static sequenceId(key: string) {
    return this.getArray(key).length;
  }
}