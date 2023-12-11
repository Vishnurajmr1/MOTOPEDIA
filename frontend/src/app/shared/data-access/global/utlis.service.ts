import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  page = new BehaviorSubject<string>('');
  constructor() {}

  trimObject(Obj: any) {
    for (let k in Obj) {
      Obj[k] = Obj[k].trim();
    }

    return Obj;
  }

  makeObjectSelected = (obj: any, props: any) => {
    let newObj: any = {};
    props.forEach((p: string | number) => {
      newObj[p] = obj[p];
    });
    return newObj;
  };
}
