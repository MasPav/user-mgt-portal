import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { AddUsersComponent } from './users-list/add-users/add-users.component';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddUsersStaffSelectionComponent } from './users-list/add-users/add-users-staff-selection/add-users-staff-selection.component';
import { UserRolesComponent } from './users-list/user-roles/user-roles.component';

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { FullnamePipe } from '@core/pipes/fullname.pipe';
import { SalesAgentsListComponent } from './sales-agents-list/sales-agents-list.component';
import { UsersComponent } from './users.component';
import { AddUserRolesComponent } from './users-list/user-roles/add-user-roles/add-user-roles.component';
import { RecoveryAgentsListComponent } from './recovery-agents/recovery-agents-list/recovery-agents-list.component';
import { OfficeUsersComponent } from './office-users/office-users.component';
import { AddStaffMemberBioinfoComponent } from './users-list/add-staff-member/add-staff-member-bioinfo/add-staff-member-bioinfo.component';
import { AddStaffMemberContactinfoComponent } from './users-list/add-staff-member/add-staff-member-contactinfo/add-staff-member-contactinfo.component';
import { AddStaffMemberUserInfoComponent } from './users-list/add-staff-member/add-staff-member-userinfo/add-staff-member-userinfo.component';
import { AddStaffMemberExtrainfoComponent } from './users-list/add-staff-member/add-staff-member-extrainfo/add-staff-member-extrainfo.component';
import { AddStaffMemberPreviewComponent } from './users-list/add-staff-member/add-staff-member-preview/add-staff-member-preview.component';
import { AddStaffMemberComponent } from './users-list/add-staff-member/add-staff-member.component';
import { FieldUsersComponent } from './field-users/field-users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children:[
     { path: '', redirectTo: 'all-users', pathMatch: 'full' },
     { path: 'all-users',component: UsersListComponent },
     { path: 'office-users', component: OfficeUsersComponent },
     { path: 'field-users', component: FieldUsersComponent },
     { path: 'sales-agents',component: SalesAgentsListComponent },
     { path: 'recovery-agents', component: RecoveryAgentsListComponent }
    ]
  },
  { path: 'add', component: AddStaffMemberComponent }

]
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ContentHeaderModule,
    CardSnippetModule,
    CoreDirectivesModule,
    NgSelectModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    FullnamePipe
  ],
  declarations: [UsersListComponent, AddUsersComponent,AddStaffMemberComponent, AddUsersStaffSelectionComponent, UserRolesComponent,UsersComponent,SalesAgentsListComponent,RecoveryAgentsListComponent,AddUserRolesComponent,OfficeUsersComponent,AddStaffMemberBioinfoComponent, AddStaffMemberContactinfoComponent, AddStaffMemberExtrainfoComponent, AddStaffMemberUserInfoComponent, AddStaffMemberPreviewComponent, FieldUsersComponent]
})
export class UsersModule { }
