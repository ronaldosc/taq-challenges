export interface VerifyTimeTravelPossibilityInputModel {
  passport: number
  travelDate: string | Date
}
export interface TravelPossibilityResponseModel {
  message: string
  possibility: boolean
}
