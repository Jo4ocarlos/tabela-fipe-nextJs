'use client'

import { useEffect, useState, type ChangeEvent } from 'react';
//css
import styles from './styles.module.css'

export default function FipeForm(){
  //Estados para guardar as escolhas do usuário
  const [vehicleType, setVehicleType] = useState<string>('cars')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedModel, setSelectedModel]= useState<string>('')
  const[selectedYear, setSelectedYear] = useState<string>('')

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


  useEffect(()=>{
    console.log(vehicleType)
  },[vehicleType])

  
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

        <select className={styles.select} onChange={handleBrandChange}>
          <option value="">Selecione a marca</option>
        </select>

        <select className={styles.select} onChange={handleModelChange} disabled={!selectedBrand}>{/** se o campo anterior estiver vazio ele fica desativado */}
          <option value="">Selecione o modelo</option>
        </select>

        <select className={styles.select} onChange={handleYearChange} disabled={!selectedModel}>
          <option value="">Selecione o ano</option>
        </select>
      </form>


    </div>
  )

}