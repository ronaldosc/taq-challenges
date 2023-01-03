export interface SeverityModel {
  grade: number
  text?: string
}

type SeverityGrade = "low" | "medium" | "high" | "highest"

export const InfractionSeverityGraded: Record<SeverityGrade, SeverityModel> = {
  low:
    { grade: 3, text: "low level severity infraction" },
  medium:
    { grade: 5, text: "medium level severity infraction" },
  high:
    { grade: 7, text: "high level severity infraction" },
  highest:
    { grade: 12, text: "highest level severity infraction" }
}
