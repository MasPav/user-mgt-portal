import { Role } from './../../core/auth/models/role';
import { Permission } from './../../core/auth/models/permission';
export class User {
  id: number;
  username: string;
  email: string;
  name: string;
  image: string;
  logged_in_at: string;
  password_changed_at: string;
  status: 'active' | 'inactive';
  created_at: string;
  permissions?: Permission[];
  roles?: Role;
}
