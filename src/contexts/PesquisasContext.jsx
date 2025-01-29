import React, { createContext, useState, useEffect } from 'react';
import Api from '../config/Api';

const PesquisaContext = createContext();

export const PesquisaProvider = ({ children }) => {
  const [pesquisas, setPesquisas] = useState([]);

  useEffect(() => {
    setPesquisas([
      {
          "id": 1,
          "nome": "Pesquisa de satisfação",
          "descricao": "Elaborar algumas perguntas para fazer uma pesquisa de satisfação.",
          "data": "29/01/2025 - 09:51:15",
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
