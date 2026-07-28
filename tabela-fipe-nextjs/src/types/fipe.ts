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