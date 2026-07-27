'use client'

//css
import styles from './styles.module.css'

export default function FipeForm(){
  
  return(
    <div className={styles.container}>
      {/** Grupo de radios para os tipos */}
      <div className={styles.radioGroup}>
        <label>
          <input type="radio" name="vehicle" value="cars" />
          <span>Carro</span>
        </label>
        <label>
          <input type="radio" name="vehicle" value="motorcycles" />
          <span>Moto</span>
        </label>
        <label>
          <input type="radio" name="vehicle" value="trucks" />
          <span>Caminhão</span>
        </label>
      </div>

      {/** Formulário com os Selects */}
      <form className={styles.form}>

        <select className={styles.select}>
          <option value="">Selecione a marca</option>
        </select>

        <select className={styles.select} disabled>
          <option value="">Selecione o modelo</option>
        </select>

        <select className={styles.select} disabled>
          <option value="">Selecione o ano</option>
        </select>
      </form>

      
    </div>
  )

}