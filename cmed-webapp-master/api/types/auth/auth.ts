import { AccountTypeEnum } from '../../../components/Auth/SignUp';

export interface MessageError {
  errors: string[];
  field: string;
}

interface AxiosResponse {
  statusCode: number;
  messages: MessageError[];
}

export interface SignInFormData {
  username: string;
  password: string;
  deviceName: string;
  operatingSystem: string;
  browserName: string;
  location: string;
  ipAddress: string;
  isForAdmin: boolean;
}
export interface SignUpFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isActive: number;
  profileImage: null;
  createdBy: number;
  createdDate: string;
  isSystem: number;
  isConfirmed: number;
  accountType: AccountTypeEnum;
}

export interface SignUpResponse extends AxiosResponse {
  data: string;
}
export interface SignInResponse extends AxiosResponse {
  accessToken: string;
  refreshToken: string;
}
