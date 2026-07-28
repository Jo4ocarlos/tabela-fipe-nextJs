// app/resultado/page.tsx
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFipe } from '../../contexts/FipeContext';
import styles from './Resultado.module.css';

export default function Resultado() {
  const { allInfo, clearResult } = useFipe();
  const router = useRouter();

  // Se o usuário tentar acessar "localhost:3000/resultado" direto pela URL sem ter feito 
  // a busca antes, o allInfo estará vazio. Então, mandamos ele de volta para a Home!
  useEffect(() => {
    if (!allInfo) {
      router.push('/');
    }
  }, [allInfo, router]);

  // Enquanto redireciona (ou se não houver dados), não renderiza a tela quebra.
  if (!allInfo) return null;

  return (
    <div className={styles.container}>
      <div className={styles.resultWrapper}>
        <h2 className={styles.resultMainTitle}>Resultado</h2>
        
        <div className={styles.resultContainer}>
          <h3 className={styles.resultSubtitle}>
            Tabela Fipe: Preço {allInfo.brand} {allInfo.model} {allInfo.modelYear}
          </h3>
          
          <div className={styles.pricePill}>
            {allInfo.price}
          </div>
          
          <p className={styles.resultDescription}>
            Este é o preço de compra do veículo
          </p>
        </div>

        {/* Bônus de UX: Um botão para limpar os dados e voltar para o formulário */}
        <button 
          className={styles.backButton} 
          onClick={() => {
            clearResult();
            router.push('/');
          }}
        >
          Fazer nova consulta
        </button>
      </div>
    </div>
  );
}