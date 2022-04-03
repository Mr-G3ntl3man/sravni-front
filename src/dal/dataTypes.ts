export type DataT = {
   name: string
   alias: string
   rate: RateT
   organization: OrganizationT
   customerRequirements: CustomerRequirementsT
}

type RateT = {
   currency: string
   periods: PeriodsT[]
   initialAmount: {
      from: number
      to?: number
   }
   creditAmount: {
      from: number
      to?: number
   }
}

type PeriodsT = {
   termUnit: string
   isFloatingRate: boolean
   rate: { from: number, to: number }
   term: { from: number, to: number }
}

type OrganizationT = {
   license: string
   logo: string
   name: string
}

type CustomerRequirementsT = {
   age: number
   documents: number
   femaleAgeAtRepayment: number
   fullExperience: number
   lastExperience: number
   manAgeAtRepayment: number
   salary: number
}