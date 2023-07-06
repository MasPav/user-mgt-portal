import { User } from '../../../features/users/user.model';
import { Role } from './role';
export interface Permission {
    id: number;
    name: string;
    users?: User,
    roles?: Role
  }
