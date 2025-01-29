import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Api from '../../config/Api';
import FormQuestions from '../../components/Form/Form';
import End from '../../components/Form/End';
import '../../components/Form/Index.css';
import { cripto } from 'cripto';

const FormPage = () => {
  const { idPesquisa } = useParams();
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState({});
  const [loading, setLoading] = useState(true);

  if (localStorage.getItem('finished') == idPesquisa) {
    return (
      <div className='containe'>
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

  useEffect(() => {
    const fetchQuestionsAndTopics = async () => {
      try {
        const response = await Api.get('/_questions', {
          params: {
            // pesquisa: idPesquisa
            hash_id: idPesquisa
          }
        });

        const questions = response.data;
        const topicIds = [...new Set(questions.map(q => q.topico))];

        // const topicsResponse = await Api.get(`/topicos?pesquisa=${idPesquisa}`);
        const topicsResponse = await Api.get(`/topicos?hash_id=${idPesquisa}`);

        const topicsObject = topicsResponse.data.reduce((acc, topic) => {
          acc[topic.id] = topic.topico; 
          // acc[topic.id_2] = topic.topico; //new db
          return acc;
        }, {});

        setQuestions(questions);
        setTopics(topicsObject);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar perguntas e tópicos:', error);
        setLoading(false);
      }
    };

    fetchQuestionsAndTopics();
  }, [idPesquisa]);

  if (loading) {
    return <Spinner animation="border" variant="primary" className='loading' />
  }

  return <FormQuestions questions={questions} topics={topics} idPesquisa={idPesquisa} apiEndpoint={'_resp'}  />;
};

export default FormPage; 