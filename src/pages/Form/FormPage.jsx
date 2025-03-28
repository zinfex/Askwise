import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import FormQuestions from '../../components/Form/Form';
import End from '../../components/Form/End';
import '../../components/Form/Index.css';
import db from '../../db';
// import PesquisaContext from '../..';

const FormPage = () => {
  const { idPesquisa } = useParams();
  // const [loading, setLoading] = useState(true);
  // const { pesquisas } = useContext(PesquisaContext)
  const [pesquisas, setPesquisa] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscamos a pesquisa com esse hash_id
        // Dexie permite várias consultas. Por ex.: db.pesquisas.where("hash_id").equals(idPesquisa).first()
        const found = await db.pesquisas.where("hash_id").equals(idPesquisa).first();

        if (found) {
          setPesquisa(found);
        } else {
          console.log("Não encontrou pesquisa com esse hash_id");
        }
      } catch (error) {
        console.error("Erro ao buscar no IndexedDB:", error);
      }
    }

    fetchData();
  }, [idPesquisa]);

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