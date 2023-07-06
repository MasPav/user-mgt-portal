import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? this.decrypt(item) : null;
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, this.encrypt(data));
  }

  clear(key?: string) {
    key ? localStorage.removeItem(key) : localStorage.clear();
  }

  clearExcept(keys: string[]) {
    const values: any = {};
    keys.forEach(key => {
      const item = this.get(key);
      if(item) {
        values[key] = item;
      }
    });
    this.clear();
    Object.keys(values).forEach(key => this.set(key, values[key]));
  }

  encrypt(item: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(item), CONSTANTS.LOCALSTORAGEKEY).toString();
  }

  decrypt(item: string): any {
    const bytes = CryptoJS.AES.decrypt(item, CONSTANTS.LOCALSTORAGEKEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
