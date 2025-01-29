import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import './Index.css';
import { CgChevronRight } from "react-icons/cg";
import Share from './Share';
import Summary from './Summary'; 
import { IoIosLink } from "react-icons/io";
import Submissions from './Submissions';
import Settings from './Settings';
import { MdEdit } from "react-icons/md";

const Answers = () => {
  const { idPesquisa } = useParams();
  const [pesquisa, setPesquisa] = useState('');
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('share');
  const [respostas, setRespostas] = useState([]);

  useEffect(() => {
    

    fetchData();
  }, [idPesquisa]);

  return (
    <MainLayout>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Minhas pesquisas <CgChevronRight /> {pesquisa}</div>
      </header>

      <div className="infosummary">
        <span className='titulo' style={{ display: 'flex', gap: 10 }}>
          {pesquisa} 
          <Link target='_blank' to={`/form/${idPesquisa}`}><IoIosLink fontSize={30} /></Link> 
          <Link target='_blank' to={`/pesquisas/edit/${idPesquisa}`}><MdEdit  fontSize={30} /></Link>
        </span>

        <div className="buttonsummary">
          <button
            className={activeTab === 'summary' ? 'active' : ''}
            onClick={() => setActiveTab('summary')}
          >
            Sumário
          </button>

          <button 
            className={activeTab === 'submissions' ? 'active' : ''}
            onClick={() => setActiveTab('submissions')}
          >
            Respostas
          </button>

          <button 
            className={activeTab === 'share' ? 'active' : ''}
            onClick={() => setActiveTab('share')}
          >
            Compartilhar
          </button>

          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Configurações
          </button>
        </div>
        <hr />
    
        <div className="contentsummary">
          {activeTab === 'share' && <Share pesquisa={idPesquisa} />}
          {activeTab === 'summary' && 
            (respostas.length > 0 ? (
              <Summary respostas={respostas} perguntas={questions} />
            ) : (
              <div className="no-answers">Ainda não há respostas cadastradas.</div>
            ))
          }
          {activeTab === 'submissions' && 
            <Submissions hash_id={idPesquisa} respostas={respostas} perguntas={questions}/>
          }
          {activeTab === 'settings' && <Settings />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Answers;