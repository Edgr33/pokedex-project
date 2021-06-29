import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divider'
})
export class DividerPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    
    return value / 10
  }

}
