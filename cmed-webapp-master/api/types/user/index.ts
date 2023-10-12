export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accountType: string;
  isActive: number;
  isAdmin: boolean;
  profileImage?: string;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number | null;
  modifiedDate: Date;
  isSystem: number;
  isConfirmed: number;
}
