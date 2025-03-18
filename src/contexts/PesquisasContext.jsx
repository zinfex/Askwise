import React, { createContext, useState, useEffect } from 'react';
const PesquisaContext = createContext();

export const PesquisaProvider = ({ children }) => {
  const [pesquisas, setPesquisas] = useState([]);

  useEffect(() => {
    setPesquisas([]);
  }, []);

  return (
    <PesquisaContext.Provider value={{ pesquisas, setPesquisas }}>
      {children}
    </PesquisaContext.Provider>
  );
};

export default PesquisaContext;