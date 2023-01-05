export interface TimeTravellerModel {
  id?: string
  name: string
  passport: number
  birth: string
}

export type GetTravellerInfoInputModel = Pick<TimeTravellerModel, "passport">
