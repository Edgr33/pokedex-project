import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeArrow'
})
export class RemoveArrowPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    return value.replace(/\/g, ' ');
  }

}
