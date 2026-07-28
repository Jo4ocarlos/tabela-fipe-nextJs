// src/types/fipe.ts

export type VehicleType = 'cars' | 'motorcycles' | 'trucks';

export interface FipeOption {
  code: string;
  name: string;
}

export interface FipeModelsResponse {
  models: FipeOption[];
  years: FipeOption[];
}

// Criamos primeiro a interface para o histórico de preços
export interface FipePriceHistory {
  month: string;
  price: string;
  reference: string;
}

// Agora criamos o resultado final exato conforme a documentação
export interface FipeResult {
  brand: string;
  codeFipe: string;
  fuel: string;
  fuelAcronym: string;
  model: string;
  modelYear: number;
  price: string;
  priceHistory: FipePriceHistory[]; // Aqui dizemos que é um array da interface acima
  referenceMonth: string;
  vehicleType: number;
}