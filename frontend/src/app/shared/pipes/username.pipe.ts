import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userNameJoining'
})

export class userNameJoining implements PipeTransform {
    transform(value: string, value2:string): string {
        return value+value2;
    }
}