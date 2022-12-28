export interface ViolationModel {
  id: string
  description: string
  severity: number
}

export interface GetTravellerViolationsInputModel {
  passport: number
}
