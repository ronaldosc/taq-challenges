export interface SeverityModel {
  grade: number
  text?: string
}

type SeverityGrade = "low" | "medium" | "severe" | "highly_serious"

export const InfractionSeverityGraded: Record<SeverityGrade, SeverityModel> = {
  low: { grade: 3, text: "low level infraction" },
  medium: { grade: 5, text: "medium level infraction" },
  severe: { grade: 7, text: "severe level infraction" },
  highly_serious: { grade: 12, text: "highly serious level infraction" }
}

// import { InfractionSeverityGraded } from "./path/to/file"
// const severity: SeverityModel = InfractionSeverityGraded.severe
// ou:    const { low, medium, severe, highly_serious  } = InfractionSeverityGraded
// console.log(severity) // { grade: 7, text: "severe level infraction" }
