import React, { createContext, useState, useEffect } from 'react';
import Api from '../config/Api';

const PesquisaContext = createContext();

export const PesquisaProvider = ({ children }) => {
  const [pesquisas, setPesquisas] = useState([]);

  useEffect(() => {
    setPesquisas([
      {
          "id": 1,
          "order": "14.00000000000000000000",
          "nome": "(Final) NPS / Pesquisa de satisfação",
          "descricao": "Elaborar algumas perguntas para fazer uma pesquisa de satisfação onde, a partir dessas perguntas, chegaremos a idealização concreta do ICP e enxergaremos pontos de melhoras internas.",
          "data": "16/08/2024 - 09:51:15",
          "cor": null,
          "hash_id": "W5fB2g"
      }
  ]);
  }, []);

  return (
    <PesquisaContext.Provider value={{ pesquisas }}>
      {children}
    </PesquisaContext.Provider>
  );
};

export default PesquisaContext;
