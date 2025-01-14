import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
