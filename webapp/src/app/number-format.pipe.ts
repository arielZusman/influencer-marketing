import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true,
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    const suffixes: string[] = ['', 'K', 'M', 'B', 'T'];
    let index: number = 0;

    while (value >= 1000 && index < suffixes.length - 1) {
      value /= 1000.0;
      index += 1;
    }

    return `${value.toFixed(2)}${suffixes[index]}`;
  }
}
