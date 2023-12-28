import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, max } from 'rxjs';

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

  static noWhiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const iswhiteSpace = (control.value || '').trim().length === 0;
      return iswhiteSpace ? { whitespace: true } : null;
    };
  }

//  imageValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//       console.log(control)
//       const file = control.value;
//       console.log(file);
//       if (file) {
//         const allowedTypes = ['image/jpeg', 'image/png'];
//         if (allowedTypes.indexOf(file.mimetype) === -1) {
//           return { 'invalidType': true };
//         }
//         const maxSize = 1024 * 1024;
//         if (file.size > maxSize) {
//           return { 'invalidSize': true };
//         }
//       }
//       return null;
//     };
//   }
imageValidator(file:File):string|null{
  const allowedTypes=['image/jpeg','image/png'];
  const maxSize=1024*1024;//1MB
    if(!allowedTypes.includes(file.type)){
      return 'Invalid file type.Please upload a JPG or PNG file.';
    }
    if(file.size>maxSize){
      return 'File size exceeds the limit.Please upload a smaller image file.'
    }
    return null;
}
}
