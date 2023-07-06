import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace_global'
})
export class ReplaceGlobalPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.replace(new RegExp(args[0], 'g'), args[1]);
  }
}