import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milimeter'
})
export class MilimeterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    return value + 'mm';
  }

}
