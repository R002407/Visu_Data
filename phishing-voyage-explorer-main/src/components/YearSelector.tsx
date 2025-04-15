
import React from 'react';
import { availableYears } from '@/data/phishingData';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange }) => {
  return (
    <div className="w-full sm:w-48">
      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => onYearChange(parseInt(value))}
      >
        <SelectTrigger className="bg-slate-800 text-white border-slate-700">
          <SelectValue placeholder="Sélectionner une année" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 text-white border-slate-700">
          {availableYears.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelector;
