import Utf8 from 'crypto-js/enc-utf8';
import { AES } from 'crypto-js';

export class Aes {
  static encrypt(key: string, value: any): string {
    return AES.encrypt(JSON.stringify({ value }), key).toString();
  }

  static decrypt(key: string, value: any): any {
    return JSON.parse(AES.decrypt(value, key).toString(Utf8)).value;
  }
}
