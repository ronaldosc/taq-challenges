export interface RegistryViolationInputModel {
  passport: number
  description: string
  occurredAt: string | Date
  severity: number
}
