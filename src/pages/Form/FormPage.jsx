import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import FormQuestions from '../../components/Form/Form';
import End from '../../components/Form/End';
import '../../components/Form/Index.css';
import PesquisaContext from '../../contexts/PesquisasContext';

const FormPage = () => {
  const { idPesquisa } = useParams();
  // const [loading, setLoading] = useState(true);
  // const { pesquisas } = useContext(PesquisaContext)
  const pesquisas = useState({
    "nome": "Título da Pesquisa",
    "descricao": "Descrição da pesquisa",
    "hash_id": "ABC123",
    "questoes": [
      {
        "texto_pergunta": "Pergunta 1",
        "type": "resposta_curta",
        "placeholder": "Valor curto",
        "options": "",
        "hash_id": "ABC124"
      },
      {
        "texto_pergunta": "Pergunta 2",
        "type": "unica_escolha",
        "placeholder": "",
        "options": "\"Opção1\", \"Opção2\"",
        "hash_id": "ABC125"
      },
    ]
  })

  console.log(pesquisas)

  if (localStorage.getItem('finished') == idPesquisa) {
    return (
      <div className='container'>
        <div className="form">
          <End pesquisa={idPesquisa}/>
        </div>
      </div>
    );
  }

  function generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }

  if (localStorage.getItem('user_id') == undefined) {
    localStorage.setItem('user_id', generateToken(6))
  }

  // if (loading) {
  //   return <Spinner animation="border" variant="primary" className='loading' />
  // }

  return <FormQuestions survey={pesquisas} idPesquisa={idPesquisa}  />;
};

export default FormPage; 