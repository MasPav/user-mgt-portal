import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';

export class DatepickerConfig {
    dayTemplate: TemplateRef<DayTemplateContext>;
    dayTemplateData: (date: NgbDateStruct, current: { year: number, month: number }) => any;
    footerTemplate: TemplateRef<any>;
    displayMonths = 1;
    firstDayOfWeek = 7;
    markDisabled: (date: NgbDateStruct, current: { year: number, month: number }) => boolean;
    minDate: NgbDateStruct = this._minDate;
    maxDate: NgbDateStruct = this._maxDate
    navigation: 'select' | 'arrows' | 'none' = 'select';
    outsideDays: 'visible' | 'collapsed' | 'hidden' = 'visible';
    showWeekdays = true;
    showWeekNumbers = false;
    startDate: { year: number, month: number };

    get currentYear(): number {
        return new Date().getFullYear();
    }
    get _minDate(): NgbDateStruct {
        return { year: this.currentYear - 100, month: 1, day: 1 }
    }
    get _maxDate(): NgbDateStruct {
        return { year: this.currentYear + 10, month: 12, day: 31 }
    }
    convertDateStructToString(date: NgbDateStruct, separator: string = '-') {
        return `${date.year}${separator}${date.month}${separator}${date.day}`;
    }
}
