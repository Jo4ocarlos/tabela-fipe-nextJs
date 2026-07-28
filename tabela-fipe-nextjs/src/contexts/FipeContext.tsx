// src/contexts/FipeContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { fipeApi } from '@/services/fipeApi';
import type { FipeResult } from '@/types/fipe';

// Interface do contexto
interface FipeContextData {
  allInfo: FipeResult | null;
  isLoadingResult: boolean;
  fetchVehicleResult: (vehicleType: string, brand: string, model: string, year: string) => Promise<boolean>;
  clearResult: () => void;
}

// Criando o Contexto 
const FipeContext = createContext<FipeContextData | undefined>(undefined);

// O "Provedor" que vai abraçar a nossa aplicação
export function FipeProvider({ children }: { children: ReactNode }) {
  const [allInfo, setAllInfo] = useState<FipeResult | null>(null);
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  
  const fetchVehicleResult = async (vehicleType: string, brand: string, model: string, year: string) => {
    setIsLoadingResult(true);
    try {
      const data = await fipeApi.getAllInfo(vehicleType, brand, model, year);
      setAllInfo(data);
      return true; // Retorna true se deu sucesso para podermos mudar de página depois
    } catch (error) {
      console.error("Erro ao buscar os dados finais:", error);
      return false;
    } finally {
      setIsLoadingResult(false);
    }
  };

  const clearResult = () => setAllInfo(null);

  return (
    <FipeContext.Provider value={{ allInfo, isLoadingResult, fetchVehicleResult, clearResult }}>
      {children}
    </FipeContext.Provider>
  );
}

// Hook customizado 
export const useFipe = () => {
  const context = useContext(FipeContext);
  if (context === undefined) {
    throw new Error('useFipe deve ser usado dentro de um FipeProvider');
  }
  return context;
};