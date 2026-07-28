'use client'
import { fipeApi } from '@/services/fipeApi';
import type { FipeOption } from '@/types/fipe';
import { useEffect, useState, type ChangeEvent } from 'react';
//css
import styles from './styles.module.css'

export default function FipeForm(){
  //Estados para guardar as escolhas do usuário
  const [vehicleType, setVehicleType] = useState<string>('cars')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedModel, setSelectedModel]= useState<string>('')
  const[selectedYear, setSelectedYear] = useState<string>('')

  //Estados das Listas da API(guardar o retorno da api)
  const [brands, setBrands] = useState<FipeOption[]>([]);
  const [models, setModels] = useState<FipeOption[]>([]);
  const [years, setYears] = useState<FipeOption[]>([]);

  // Estado de Loading para dar feedback visual
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Ações disparadas quando o usuário interage
  const handleVehicleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVehicleType(e.target.value);
    // Limpa TUDO se o usuário trocar de Carro para Moto, por exemplo
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    // Limpa modelo e ano ao trocar a marca
    setSelectedModel('');
    setSelectedYear('');
  };

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    // Limpa o ano ao trocar o modelo
    setSelectedYear('');
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };


// Busca MARCAS quando o TIPO de veículo muda ou a tela carrega
  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      try {
        const data = await fipeApi.getBrands(vehicleType);
        setBrands(data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, [vehicleType]); // O array de dependências avisa: "Só rode se o vehicleType mudar"

  // Busca MODELOS quando a MARCA muda
  useEffect(() => {
    // Trava de segurança: se a marca estiver vazia, não faz a requisição
    if (!selectedBrand) return; 

    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const data = await fipeApi.getModels(vehicleType, selectedBrand);
        setModels(data);
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, [selectedBrand, vehicleType]);

  // Busca ANOS quando o MODELO muda
  useEffect(() => {
    if (!selectedModel) return;

    const fetchYears = async () => {
      setIsLoading(true);
      try {
        const data = await fipeApi.getYears(vehicleType, selectedBrand, selectedModel);
        setYears(data);
      } catch (error) {
        console.error("Erro ao buscar anos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYears();
  }, [selectedModel, selectedBrand, vehicleType]);

  
  return(
    <div className={styles.container}>
      {/** Grupo de radios para os tipos */}
      <div className={styles.radioGroup}>
        <label>
          <input type="radio" name="vehicle" onChange={handleVehicleChange} value="cars" checked={vehicleType === 'cars'}/>
          <span>Carro</span>
        </label>
        <label>
          <input type="radio" name="vehicle" onChange={handleVehicleChange} value="motorcycles" checked={vehicleType === 'motorcycles'}/>
          <span>Moto</span>
        </label>
        <label>
          <input type="radio" name="vehicle" onChange={handleVehicleChange} value="trucks" checked={vehicleType === 'trucks'}/>
          <span>Caminhão</span>
        </label>
      </div>

      {/** Formulário com os Selects */}
      <form className={styles.form}>

        {/* Select de MARCAS */}
        <select className={styles.select} value={selectedBrand} onChange={handleBrandChange} disabled={isLoading}>
          <option value="">{isLoading ? 'Carregando...' : 'Selecione a marca'}</option>
          {brands && brands.map((brand) => (
            <option key={brand.code} value={brand.code}>
              {brand.name}
            </option>
          ))}
        </select>

        {/* Select de MODELOS */}
        <select className={styles.select} value={selectedModel} onChange={handleModelChange} disabled={!selectedBrand || isLoading}>
          <option value="">Selecione o modelo</option>
          {models.map((model) => (
            <option key={model.code} value={model.code}>
              {model.name}
            </option>
          ))}
        </select>

        {/* Select de ANOS */}
        <select className={styles.select} value={selectedYear} onChange={handleYearChange} disabled={!selectedModel || isLoading}>
          <option value="">Selecione o ano</option>
          {years.map((year) => (
            <option key={year.code} value={year.code}>
              {year.name}
            </option>
          ))}
        </select>
      </form>


    </div>
  )

}