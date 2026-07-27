// src/types/fipe.ts

export type VehicleType = 'cars' | 'motorcycles' | 'trucks';

export interface FipeOption {
  codigo: string;
  nome: string;
}

export interface FipeModelsResponse {
  modelos: FipeOption[];
  anos: FipeOption[];
}