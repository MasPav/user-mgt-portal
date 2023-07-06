import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

@Pipe({
  name: 'allowedPermissions'
})
export class AllowedPermissionsPipe implements PipeTransform {
  constructor(private authService: AuthenticationService) {}

  transform(value: any): any {
    const rolePermissions = this.authService.currentUserValue?.roles?.map((role: any) => role.permissions);
    const directPermissions = this.authService.currentUserValue.permissions || [];
    rolePermissions?.push(directPermissions)
    const userPermissions = rolePermissions?.reduce((a: any, b: any) => [...a, ...b], [])
      .map((permission: any) => permission.name);
    return userPermissions.filter((permission: any) => value.indexOf(permission) > -1).length > 0;
  }
}
