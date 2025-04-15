
import React, { useState, useEffect } from 'react';
import YearSelector from '@/components/YearSelector';
import GlobeVisualization from '@/components/GlobeVisualization';
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import { 
  getDataByYear, 
  getDataByContinentAndYear, 
  getPhishingTypesByYear, 
  getYearlyData,
  availableYears 
} from '@/data/phishingData';

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[availableYears.length - 1]); // Dernière année par défaut
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simule un chargement des données
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedYear]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* En-tête */}
      <header className="bg-slate-900 py-6 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-4 sm:mb-0">
            Phishing Voyage Explorer
          </h1>
          
          <YearSelector 
            selectedYear={selectedYear} 
            onYearChange={handleYearChange} 
          />
        </div>
      </header>
      
      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-[600px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Section Globe */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-purple-300">
                Carte mondiale des attaques de phishing ({selectedYear})
              </h2>
              <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                <GlobeVisualization data={getDataByYear(selectedYear)} />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Survolez les points sur la carte pour voir les détails des attaques par ville.
              </p>
            </section>
            
            {/* Grille de visualisations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Courbe d'évolution */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-purple-300">
                  Évolution des attaques de phishing
                </h2>
                <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                  <LineChart data={getYearlyData()} />
                </div>
              </section>
              
              {/* Histogramme par continent */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-purple-300">
                  Attaques par continent ({selectedYear})
                </h2>
                <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                  <BarChart data={getDataByContinentAndYear(selectedYear)} />
                </div>
              </section>
              
              {/* Diagramme circulaire des types */}
              <section className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 text-purple-300">
                  Types de phishing les plus fréquents ({selectedYear})
                </h2>
                <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                  <PieChart data={getPhishingTypesByYear(selectedYear)} />
                </div>
              </section>
            </div>
          </>
        )}
      </main>
      
      {/* Pied de page */}
      <footer className="bg-slate-900 py-6 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            Phishing Voyage Explorer - Visualisation interactive des données de phishing à travers le monde
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} - Données simulées à des fins de démonstration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
