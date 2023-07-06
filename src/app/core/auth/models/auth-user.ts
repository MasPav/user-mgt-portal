import { Permission } from './permission';
import { Role } from './role';

export class AuthUser {
  id: number;
  username: string;
  logged_in_at: string;
  password_changed_at: string;
  status: 'active' | 'inactive';
  token?: string;
  token_expires_at?: string;
  permissions?: Permission[];
  roles?: Role[];
}
