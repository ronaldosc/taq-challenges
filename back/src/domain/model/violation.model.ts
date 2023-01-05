export interface TravellerViolationModel {
  id: string
  description: string
  occurredAt: string | Date
  severity: number
}

export interface ViolationModel extends TravellerViolationModel {
  passport: number
}

export type GetTravellerViolationsInputModel = Pick<ViolationModel, "passport">
