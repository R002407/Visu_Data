
export interface PhishingAttack {
  id: string;
  year: number;
  country: string;
  continent: string;
  city: string;
  latitude: number;
  longitude: number;
  count: number;
  type: string;
}

export type PhishingType = {
  type: string;
  count: number;
  color: string;
}

export type ContinentData = {
  name: string;
  count: number;
  color: string;
}

export type YearlyData = {
  year: number;
  count: number;
}
