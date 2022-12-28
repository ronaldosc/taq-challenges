export interface VerifyTimeTravelPossibilityInputModel {
  passport: number
  travelDate: string
}
export interface TravelPossibilityResponseModel {
  message: string
  possibility: boolean
}
