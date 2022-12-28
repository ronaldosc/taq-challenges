export interface TimeTravellerModel {
  id?: string;
  name: string;
  passport: number;
  birth: string;
}

export interface GetTravellerInfoInputModel {
  passport: number;
}
