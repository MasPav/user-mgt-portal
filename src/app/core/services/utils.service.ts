import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { CONSTANTS } from '../constants';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

type DiffDateTypes = 'day' | 'month';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getKeysOfObject(object: Object) {
    return Object.keys(object)
  }

  capitalize(value: string) {
    if (value.trim()) {
      return value
        .split(" ")
        .map(w => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    }
  }

  toggleItemInList(item: any, list: any[] = []) {
    const selectedItem = this.isItemInList(item, list);
    if (selectedItem) {
      list.splice(list.indexOf(selectedItem), 1);
    } else {
      list.push(item);
    }
  }
  isItemInList(item: any, list: any[] = []) {
    return list.find(lItem => lItem === item);
  }
  markForm(form: FormGroup | FormArray): void {
    if (form instanceof FormArray) {
      form.controls.forEach((control: AbstractControl) => this.markGroup(control));
    } else {
      this.markGroup(form);
    }
  }
  markGroup(formGroup: any) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsDirty();
      formGroup.get(key)?.markAsTouched();
    });
  }
  convertDateStructToString(date: NgbDateStruct, separator: string = '-') {
    if(date) {
      return `${date.year}${separator}${date.month}${separator}${date.day}`;
    } else {
      return '';
    }
  }
  isEmpty = (item: any ) => {
    if(item instanceof Object) {
      return Object.keys(item)?.length <= 0;
    } else if (Array.isArray(item)) {
      return item?.length <= 0
    } else {
      return item?.length <= 0;
    }
  }
  formatDateDiff(date: string, type: DiffDateTypes = 'day', customDateFormat?: string): String {
    if(!date) {
      return '';
    }
    const diff = moment(date,CONSTANTS.RAWDATEFORMAT).diff(moment().endOf(type), type, true);
    if(diff > -2 && diff <= -1) {
      if(type == 'day') {
        return 'yesterday';
      } else {
        return 'last month';
      }
    }
    else if(diff > -1 && diff <= 0) {
      if(type == 'day') {
        return 'today';
      } else {
        return 'this month';
      }
    } else if(diff > 0 && diff <= 1) {
      if(type == 'day') {
        return 'tomorrow';
      } else {
        return 'next month';
      }
    } else {
      return moment(date).format(customDateFormat || CONSTANTS.DATEFORMAT);
    }
  }
  convertDateToDateStruct(date?: string | moment.Moment) {
    const momentDate = moment(date);
    return {year: Number(momentDate.format('YYYY')), month: Number(momentDate.format('MM')), day: Number(momentDate.format('DD'))}
  }


}
