
import { PhishingAttack, PhishingType, ContinentData, YearlyData } from "../types";

// Données de phishing simulées
export const phishingAttacks: PhishingAttack[] = [
  // 2018
  { id: "1", year: 2018, country: "United States", continent: "North America", city: "New York", latitude: 40.7128, longitude: -74.0060, count: 2500, type: "Email" },
  { id: "2", year: 2018, country: "United Kingdom", continent: "Europe", city: "London", latitude: 51.5074, longitude: -0.1278, count: 1800, type: "Email" },
  { id: "3", year: 2018, country: "Japan", continent: "Asia", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, count: 1200, type: "Email" },
  { id: "4", year: 2018, country: "Brazil", continent: "South America", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, count: 800, type: "SMS" },
  { id: "5", year: 2018, country: "Australia", continent: "Oceania", city: "Sydney", latitude: -33.8688, longitude: 151.2093, count: 600, type: "Email" },
  { id: "6", year: 2018, country: "South Africa", continent: "Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, count: 400, type: "SMS" },
  
  // 2019
  { id: "7", year: 2019, country: "United States", continent: "North America", city: "New York", latitude: 40.7128, longitude: -74.0060, count: 3200, type: "Email" },
  { id: "8", year: 2019, country: "United Kingdom", continent: "Europe", city: "London", latitude: 51.5074, longitude: -0.1278, count: 2300, type: "Email" },
  { id: "9", year: 2019, country: "Japan", continent: "Asia", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, count: 1700, type: "Email" },
  { id: "10", year: 2019, country: "Brazil", continent: "South America", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, count: 1200, type: "SMS" },
  { id: "11", year: 2019, country: "Australia", continent: "Oceania", city: "Sydney", latitude: -33.8688, longitude: 151.2093, count: 900, type: "Email" },
  { id: "12", year: 2019, country: "South Africa", continent: "Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, count: 700, type: "Website" },
  
  // 2020
  { id: "13", year: 2020, country: "United States", continent: "North America", city: "New York", latitude: 40.7128, longitude: -74.0060, count: 4500, type: "Email" },
  { id: "14", year: 2020, country: "United Kingdom", continent: "Europe", city: "London", latitude: 51.5074, longitude: -0.1278, count: 3100, type: "Email" },
  { id: "15", year: 2020, country: "Japan", continent: "Asia", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, count: 2800, type: "Website" },
  { id: "16", year: 2020, country: "Brazil", continent: "South America", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, count: 2100, type: "SMS" },
  { id: "17", year: 2020, country: "Australia", continent: "Oceania", city: "Sydney", latitude: -33.8688, longitude: 151.2093, count: 1500, type: "Website" },
  { id: "18", year: 2020, country: "South Africa", continent: "Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, count: 1100, type: "Website" },
  
  // 2021
  { id: "19", year: 2021, country: "United States", continent: "North America", city: "New York", latitude: 40.7128, longitude: -74.0060, count: 5800, type: "Email" },
  { id: "20", year: 2021, country: "United Kingdom", continent: "Europe", city: "London", latitude: 51.5074, longitude: -0.1278, count: 4200, type: "Email" },
  { id: "21", year: 2021, country: "Japan", continent: "Asia", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, count: 3900, type: "Website" },
  { id: "22", year: 2021, country: "Brazil", continent: "South America", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, count: 3100, type: "Social Media" },
  { id: "23", year: 2021, country: "Australia", continent: "Oceania", city: "Sydney", latitude: -33.8688, longitude: 151.2093, count: 2400, type: "Website" },
  { id: "24", year: 2021, country: "South Africa", continent: "Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, count: 1800, type: "Social Media" },
  
  // 2022
  { id: "25", year: 2022, country: "United States", continent: "North America", city: "New York", latitude: 40.7128, longitude: -74.0060, count: 7200, type: "Email" },
  { id: "26", year: 2022, country: "United Kingdom", continent: "Europe", city: "London", latitude: 51.5074, longitude: -0.1278, count: 5600, type: "Email" },
  { id: "27", year: 2022, country: "Japan", continent: "Asia", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, count: 5100, type: "Website" },
  { id: "28", year: 2022, country: "Brazil", continent: "South America", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, count: 4300, type: "Social Media" },
  { id: "29", year: 2022, country: "Australia", continent: "Oceania", city: "Sydney", latitude: -33.8688, longitude: 151.2093, count: 3500, type: "Website" },
  { id: "30", year: 2022, country: "South Africa", continent: "Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, count: 2700, type: "Social Media" },
  
  // 2023
  { id: "31", year: 2023, country: "United States", continent: "North America", city: "New York", latitude: 40.7128, longitude: -74.0060, count: 9400, type: "Email" },
  { id: "32", year: 2023, country: "United Kingdom", continent: "Europe", city: "London", latitude: 51.5074, longitude: -0.1278, count: 7800, type: "Social Media" },
  { id: "33", year: 2023, country: "Japan", continent: "Asia", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, count: 7100, type: "Website" },
  { id: "34", year: 2023, country: "Brazil", continent: "South America", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, count: 6200, type: "Social Media" },
  { id: "35", year: 2023, country: "Australia", continent: "Oceania", city: "Sydney", latitude: -33.8688, longitude: 151.2093, count: 5300, type: "Mobile App" },
  { id: "36", year: 2023, country: "South Africa", continent: "Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, count: 4100, type: "Mobile App" },
  
  // 2024
  { id: "37", year: 2024, country: "United States", continent: "North America", city: "New York", latitude: 40.7128, longitude: -74.0060, count: 11500, type: "Email" },
  { id: "38", year: 2024, country: "United Kingdom", continent: "Europe", city: "London", latitude: 51.5074, longitude: -0.1278, count: 9700, type: "Social Media" },
  { id: "39", year: 2024, country: "Japan", continent: "Asia", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, count: 9200, type: "Website" },
  { id: "40", year: 2024, country: "Brazil", continent: "South America", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, count: 8400, type: "Social Media" },
  { id: "41", year: 2024, country: "Australia", continent: "Oceania", city: "Sydney", latitude: -33.8688, longitude: 151.2093, count: 7500, type: "Mobile App" },
  { id: "42", year: 2024, country: "South Africa", continent: "Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, count: 6300, type: "Mobile App" },
];

// Fonction pour obtenir les données par année
export const getDataByYear = (year: number): PhishingAttack[] => {
  return phishingAttacks.filter(attack => attack.year === year);
};

// Fonction pour obtenir les données par continent et année
export const getDataByContinentAndYear = (year: number): ContinentData[] => {
  const continentColors: Record<string, string> = {
    "North America": "#5465FF",
    "Europe": "#788BFF",
    "Asia": "#9BB1FF",
    "South America": "#BFD7FF",
    "Oceania": "#E2EAFC",
    "Africa": "#C8B6FF"
  };
  
  const filteredData = phishingAttacks.filter(attack => attack.year === year);
  const continents: Record<string, number> = {};
  
  filteredData.forEach(attack => {
    if (!continents[attack.continent]) {
      continents[attack.continent] = 0;
    }
    continents[attack.continent] += attack.count;
  });
  
  return Object.keys(continents).map(continent => ({
    name: continent,
    count: continents[continent],
    color: continentColors[continent] || "#AAAAAA"
  }));
};

// Fonction pour obtenir les types de phishing par année
export const getPhishingTypesByYear = (year: number): PhishingType[] => {
  const typeColors: Record<string, string> = {
    "Email": "#5465FF",
    "SMS": "#788BFF",
    "Website": "#9BB1FF",
    "Social Media": "#BFD7FF",
    "Mobile App": "#E2EAFC"
  };
  
  const filteredData = phishingAttacks.filter(attack => attack.year === year);
  const types: Record<string, number> = {};
  
  filteredData.forEach(attack => {
    if (!types[attack.type]) {
      types[attack.type] = 0;
    }
    types[attack.type] += attack.count;
  });
  
  return Object.keys(types).map(type => ({
    type,
    count: types[type],
    color: typeColors[type] || "#AAAAAA"
  }));
};

// Fonction pour obtenir les données par année pour la courbe d'évolution
export const getYearlyData = (): YearlyData[] => {
  const years = [...new Set(phishingAttacks.map(attack => attack.year))].sort();
  
  return years.map(year => {
    const attacksForYear = phishingAttacks.filter(attack => attack.year === year);
    const totalCount = attacksForYear.reduce((sum, attack) => sum + attack.count, 0);
    
    return {
      year,
      count: totalCount
    };
  });
};

// Années disponibles pour la sélection
export const availableYears = [...new Set(phishingAttacks.map(attack => attack.year))].sort();
