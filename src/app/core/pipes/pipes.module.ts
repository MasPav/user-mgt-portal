import { NgModule } from '@angular/core';

import { FilterPipe } from '../pipes/filter.pipe';

import { InitialsPipe } from '../pipes/initials.pipe';

import { SafePipe } from '../pipes/safe.pipe';
import { StripHtmlPipe } from '../pipes/stripHtml.pipe';
import { AllowedPermissionsPipe } from './allowed-permissions.pipe';
import { FullnamePipe } from './fullname.pipe';
import { ReplaceGlobalPipe } from './replace_global';

@NgModule({
  declarations: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe, FullnamePipe,ReplaceGlobalPipe, AllowedPermissionsPipe],
  imports: [],
  exports: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe, FullnamePipe,ReplaceGlobalPipe, AllowedPermissionsPipe]
})
export class CorePipesModule {}
