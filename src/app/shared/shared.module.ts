import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NgbModule,
    PerfectScrollbarModule
  ],
  declarations: []
})
export class SharedModule { }
