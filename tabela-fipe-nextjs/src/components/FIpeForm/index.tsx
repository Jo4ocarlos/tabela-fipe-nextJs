'use client'
import { fipeApi } from '@/services/fipeApi';
import type { FipeOption } from '@/types/fipe';
import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useFipe } from '../../contexts/FipeContext'; //  hook customizado

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

  // Estado para capturar e exibir erros na tela
  const [error, setError] = useState<string>('');

  //context
  const { fetchVehicleResult, isLoadingResult } = useFipe();
  const router = useRouter();

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
      setError('');
      try {
        const data = await fipeApi.getBrands(vehicleType);
        setBrands(data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
        setError('Falha ao carregar as marcas. Tente novamente mais tarde.');
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
      setError('');
      try {
        const data = await fipeApi.getModels(vehicleType, selectedBrand);
        setModels(data);
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
        setError('Falha ao carregar os modelos. Tente novamente mais tarde.');
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
      setError('');
      try {
        const data = await fipeApi.getYears(vehicleType, selectedBrand, selectedModel);
        setYears(data);
      } catch (error) {
        console.error("Erro ao buscar anos:", error);
        setError('Falha ao carregar os anos. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchYears();
  }, [selectedModel, selectedBrand, vehicleType]);

// A função que busca o resultado final e muda de página
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    if (!selectedYear) return; 

    setError('');
    // Usamos a função do contexto! Ela retorna true se a requisição deu certo.
    const success = await fetchVehicleResult(vehicleType, selectedBrand, selectedModel, selectedYear);
    
    if (success) {
      router.push('/resultado');// navega para a página de resultado!
    }else{
      setError('Ocorreu um erro ao consultar o preço final. Verifique sua conexão.');
    }
  };
  

  
  return(
    <div className={styles.container}>
      

      <div className={styles.header}>
        <h2>Tabela Fipe</h2>
        <p>Consulte o valor de um veículo de forma gratuita</p>
      </div>

      {/* Card principal flutuante */}
      <div className={styles.card}>
        
        {/* Grupo de radios */}
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type="radio" name="vehicle" onChange={handleVehicleChange} value="cars" checked={vehicleType === 'cars'}/>
            <span>Carro</span>
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="vehicle" onChange={handleVehicleChange} value="motorcycles" checked={vehicleType === 'motorcycles'}/>
            <span>Moto</span>
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="vehicle" onChange={handleVehicleChange} value="trucks" checked={vehicleType === 'trucks'}/>
            <span>Caminhão</span>
          </label>
        </div>

        {/* Formulário */}
        <form className={styles.form} onSubmit={handleSubmit}>
          
          <select className={styles.select} value={selectedBrand} onChange={handleBrandChange} disabled={isLoading}>
            <option value="">{isLoading ? 'Carregando...' : 'Selecione a marca'}</option>
            {brands && brands.map((brand) => (
              <option key={brand.code} value={brand.code}>{brand.name}</option>
            ))}
          </select>

          <select className={styles.select} value={selectedModel} onChange={handleModelChange} disabled={!selectedBrand || isLoading}>
            <option value="">Selecione o modelo</option>
            {models.map((model) => (
              <option key={model.code} value={model.code}>{model.name}</option>
            ))}
          </select>

          <select className={styles.select} value={selectedYear} onChange={handleYearChange} disabled={!selectedModel || isLoading}>
            <option value="">Selecione o ano</option>
            {years.map((year) => (
              <option key={year.code} value={year.code}>{year.name}</option>
            ))}
          </select>

          <button className={styles.submitButton} type="submit" disabled={!selectedYear || isLoading}>
            {isLoadingResult ? 'Buscando...' : 'Consultar preço'}
          </button>
        </form>
        {/* Renderização Condicional do Erro */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>

    </div>
  )

}