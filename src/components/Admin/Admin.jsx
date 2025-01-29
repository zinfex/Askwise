import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Modal, Accordion, Placeholder, Spinner } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import './Index.css';

const Admin = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {


        setPesquisas([
          {
              "id": 57,
              "order": "14.00000000000000000000",
              "nome": "(Final) NPS / Pesquisa de satisfação",
              "descricao": "Elaborar algumas perguntas para fazer uma pesquisa de satisfação onde, a partir dessas perguntas, chegaremos a idealização concreta do ICP e enxergaremos pontos de melhoras internas.",
              "data": "16/08/2024 - 09:51:15",
              "cor": null,
              "hash_id": "W5fB2g"
          }
      ]);

  }, []);

  const openPerguntasPesquisas = (idPesquisa) => {
    location.href = `/pesquisa/summary/${idPesquisa}`;
  };

  return (
    <MainLayout>
      <div className='dashboard-admin'>
        <div className="infocreate">
          <h3 style={{ fontWeight: 600 }}>Minhas pesquisas</h3>
          <Link to='/pesquisas/create'>
            <Button className='pesquisaadd d-flex gap-1'>
              <IoAddOutline style={{ fontSize: 22 }}/>Nova pesquisa
            </Button>
          </Link>
        </div>

        <div className="pesquisas">
          <hr style={{ margin: '0' }} />

          {loading ? (
            <>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="mb-5">
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6 + idx % 2 * 1} size="lg" />
                  </Placeholder>
                </div>
              ))}
            </>
          ) : (
            pesquisas.map((pesquisa, index) => (
              <div 
                key={index} 
                className='pesquisa' 
                title={`Criado: ${pesquisa.data}`} 
                // onClick={() => openPerguntasPesquisas(pesquisa.id_2)}
                onClick={() => openPerguntasPesquisas(pesquisa.hash_id)}
              >
                <div className="d-block d-flex flex-column text-decoration-none">
                  <span style={{ color: 'black' }}>{pesquisa.nome}</span>
                  <span className='small'>{pesquisa.descricao}</span>
                </div>
                
                <div className="iconbuttons">
                  <button
                    className="btn btn-link p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      // navigate(`/pesquisas/edit/${pesquisa.id_2}`);
                      navigate(`/pesquisas/edit/${pesquisa.hash_id}`);
                    }}
                    title='Editar pesquisa'
                  >
                    <AiFillEdit fontSize={25} />
                  </button>

                  <FaTrash color='primary' />

                  <Link 
                    // to={`/form/${pesquisa.id_2}`} 
                    to={`/form/${pesquisa.hash_id}`} 
                    className='btn btn-link p-0'
                  >
                    <IoIosLink fontSize={25} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;