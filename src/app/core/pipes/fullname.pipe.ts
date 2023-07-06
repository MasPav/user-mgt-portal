import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  constructor(private utilsService: UtilsService) { }
  transform(value: any): string | undefined {
    if(value) {
      return this.utilsService.capitalize(`${value?.other_names} ${value?.last_name}`)
    }
  }

}
