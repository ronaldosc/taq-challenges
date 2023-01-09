export interface VerifyTimeTravelPossibilityInputModel {
  passport: number
  travelDate: string | Date
}
export interface TravelPossibilityResponseModel {
  possibility: boolean
  message: string
}
