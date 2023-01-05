export interface TravellerViolationModel {
  id: string
  description: string
  severity: number
}

export interface ViolationModel extends TravellerViolationModel {
  passport: number
}

export type GetTravellerViolationsInputModel = Pick<ViolationModel, "passport">


//TODO buscar por todos os ViolationModel pois era o nome da primeira interface. E talvez renomear essa primeira para "(get)TravellerViolationsResponseModel"