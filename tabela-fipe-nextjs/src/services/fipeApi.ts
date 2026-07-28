// src/services/fipeApi.ts

import type { FipeOption } from '../types/fipe';

const BASE_URL = 'https://fipe.parallelum.com.br/api/v2';

export const fipeApi = {
  // Busca as marcas (ex: Fiat, Honda)
  async getBrands(vehicleType: string): Promise<FipeOption[]> {
    const response = await fetch(`${BASE_URL}/${vehicleType}/brands`, {
      next: {revalidate: 3500}
    });
    if (!response.ok) throw new Error('Erro ao buscar as marcas');
    return response.json();
  },

  // Busca os modelos de uma marca específica (ex: Palio, Civic)
  async getModels(vehicleType: string, brandId: string): Promise<FipeOption[]> {
    const response = await fetch(`${BASE_URL}/${vehicleType}/brands/${brandId}/models`);
    if (!response.ok) throw new Error('Erro ao buscar os modelos');
    return response.json();
  },

  // Busca os anos disponíveis de um modelo específico (ex: 2010, 2020)
  async getYears(vehicleType: string, brandId: string, modelId: string): Promise<FipeOption[]> {
    const response = await fetch(`${BASE_URL}/${vehicleType}/brands/${brandId}/models/${modelId}/years`);
    if (!response.ok) throw new Error('Erro ao buscar os anos');
    return response.json();
  }
};