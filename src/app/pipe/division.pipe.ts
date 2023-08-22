import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'division'
})
export class DivisionPipe implements PipeTransform {

  transform(numA: number, numB: number): number {

    if (isNaN(numA) || isNaN(numB) || numB === 0) {
      throw new Error('Invalid inputs or division by zero.');
    }
    var val = numA / numB;
    return parseFloat(val.toFixed(2));
  }

}
