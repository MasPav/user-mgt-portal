import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule
} from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layouts/layout.module';
import { CoreModule } from './core/core.module';
import { SpinnerComponent } from './shared/spinner.component';

// Select some icons (use an object, not an array)


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(Approutes, { relativeLinkResolution: 'legacy' }),
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
