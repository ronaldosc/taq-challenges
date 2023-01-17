export interface TimeTravellerModel {
  id?: string
  name: string
  birth: string
  passport: number
}

export type CreateTimeTravellerInputModel = Omit<TimeTravellerModel, "id"> & {
  password: string
}

export type GetTravellerInfoInputModel = Pick<TimeTravellerModel, "passport">
