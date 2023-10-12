export interface Country {
  // allowState: boolean;
  countryId: number;
  countryName: string;
  createdBy: number;
  createdDate: Date | null;
  modifiedBy: number;
  modifiedDate: Date | null;
}
export interface City {
  cityId: number;
  countryId: number;
  stateId: number;
  cityName: string;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date | null;
}

export interface State {
  countryId: number;
  stateId: number;
  stateName: string;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date | null;
}
