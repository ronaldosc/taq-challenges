export interface ViolationModel {
  id: string
  passport: number
  description: string
  occurredAt: string | Date
  severity: number
}
export type TravellerViolationModel = Omit<ViolationModel, "passport">

export type RegistryViolationInputModel = Omit<ViolationModel, "id">

export type GetTravellerViolationsInputModel = Pick<ViolationModel, "passport">
