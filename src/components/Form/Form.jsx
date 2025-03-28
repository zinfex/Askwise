import React, { useEffect, useState } from 'react';
import { Form, Spinner, ProgressBar } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import End from './End';
import ProgressDots from './ProgressDots';
import { MdOutlineStarPurple500 } from "react-icons/md";
import './Index.css';
import '../../styles/Responsive.css';
import { GrFormNextLink } from "react-icons/gr";

/**
 * Esperamos receber em props:
 * survey = {
 *   nome: string,
 *   descricao: string,
 *   hash_id: string,
 *   questoes: [
 *     { texto_pergunta, type, placeholder, options, hash_id }, ...
 *   ]
 * }
 * 
 * className, idPesquisa (se necessário)
 */
const FormQuestions = ({ survey, className, idPesquisa }) => {
  // Se o survey não estiver definido, tratamos como objeto vazio.
  // Assim não quebramos o código caso venha undefined.
  const {
    nome = '',
    descricao = '',
    hash_id = '',
    questoes = []
  } = survey || {};

  // Estados internos
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [end, setEnd] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [shake, setShake] = useState(false);
  const [direction, setDirection] = useState('forward');
  const [tempAnswers, setTempAnswers] = useState([]);

  const totalQuestions = questoes.length;
  const user_id = localStorage.getItem('user_id');

  // A pergunta atual
  const currentQuestion = questoes[currentQuestionIndex];

  // Quando a pergunta mudar, resetamos (ou ajustamos) a resposta atual
  useEffect(() => {
    if (!currentQuestion) return;
    
    // Se for multipla escolha, definimos um array vazio.
    if (currentQuestion.type === 'multipla_escolha') {
      setCurrentAnswer([]);
    } else {
      setCurrentAnswer('');
    }
  }, [currentQuestion]);

  // Se o usuário sair da página antes de terminar, faz algo? 
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!end) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [end]);

  // Lógica avançar
  const handleNext = () => {
    if (!currentQuestion) return;

    const isMultiChoice = currentQuestion.type === 'multipla_escolha';
    const isAnswerEmpty = isMultiChoice
      ? currentAnswer.length === 0
      : currentAnswer.trim() === '';

    if (isAnswerEmpty) {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      return;
    }

    const newAnswer = {
      resposta: Array.isArray(currentAnswer)
        ? currentAnswer.join(', ')
        : currentAnswer,
      user_id,
      hash_id: hash_id,              // do survey
      idPergunta: `${currentQuestionIndex}`,  // se quiser um id único
      titulo_pergunta: currentQuestion.texto_pergunta,
      tipo_pergunta: currentQuestion.type,
    };

    // Guardamos temporariamente
    setTempAnswers((prevTempAnswers) => {
      const updatedAnswers = [...prevTempAnswers];
      updatedAnswers[currentQuestionIndex] = newAnswer;
      return updatedAnswers;
    });

    // Se não for a última pergunta, vai para a próxima
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection('forward');
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Se for a última, marcamos fim ou chamamos algo
      setEnd(true);
      // Você pode chamar 'sendAnswers(tempAnswers)' aqui, etc.
    }
  };

  // Lógica voltar
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection('backward');
      setCurrentQuestionIndex((prev) => prev - 1);

      // Restaurar resposta anterior
      const previousAnswer = tempAnswers[currentQuestionIndex - 1]?.resposta;
      setCurrentAnswer(Array.isArray(previousAnswer) ? previousAnswer : previousAnswer || '');
    }
  };

  // Só para exemplificar como você pode enviar as respostas
  const sendAnswers = async (answersToSend) => {
    try {
      // Chamada de API, etc.
    } catch (error) {
      console.log('Erro ao enviar respostas:', error);
    }
  };

  const handleChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleOptionSelect = (option) => {
    if (currentQuestion.type === 'multipla_escolha') {
      setCurrentAnswer((prevAnswer) => {
        if (prevAnswer.includes(option)) {
          return prevAnswer.filter((item) => item !== option);
        } else {
          return [...prevAnswer, option];
        }
      });
    } else {
      setCurrentAnswer(option);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const handleStarSelect = (rating) => {
    setCurrentAnswer(rating.toString());
  };

  // Cálculo de progresso
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Renderiza o input de acordo com o tipo
  const renderInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'resposta_longa':
        return (
          <textarea
            placeholder={currentQuestion.placeholder}
            className='input long-answer'
            value={currentAnswer}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={200}
          />
        );
      case 'resposta_curta':
        return (
          <input
            type="text"
            placeholder={currentQuestion.placeholder}
            className='input'
            value={currentAnswer}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={60}
          />
        );
      case 'avaliacao':
        // Aqui o placeholder contém o número de estrelas
        const stars = parseInt(currentQuestion.placeholder, 10) || 3;
        return (
          <div className="star-rating">
            {[...Array(stars)].map((_, index) => {
              const starNum = index + 1;
              return (
                <button
                  type="button"
                  key={starNum}
                  className={starNum <= currentAnswer ? "on" : "off"}
                  onClick={() => handleStarSelect(starNum)}
                >
                  <MdOutlineStarPurple500 size={40} />
                </button>
              );
            })}
          </div>
        );
      case 'multipla_escolha':
      case 'Score': // se "Score" for algo parecido
        // Aqui options é uma string com "Opção1", "Opção2"?
        // Você pode splitar ou já converter isso antes
        // Exemplo: se vier "Opção1, Opção2"
        const multiOptions = currentQuestion.options
          .split(',')
          .map((opt) => opt.replaceAll('"', '').trim());
        return (
          <div className="options-container">
            {multiOptions.map((option, index) => (
              <div
                key={index}
                className={`option-box ${currentAnswer.includes(option) ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        );
      case 'unica_escolha':
        // Idem, se "options" for string, converta
        const singleOptions = currentQuestion.options
          .split(',')
          .map((opt) => opt.replaceAll('"', '').trim());
        return (
          <div className="options-container">
            {singleOptions.map((option, index) => (
              <div
                key={index}
                className={`option-box ${currentAnswer === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        );
      default:
        // Caso queira tratar "email", "number", etc.
        return (
          <input
            type="text"
            placeholder={currentQuestion.placeholder}
            className='input'
            value={currentAnswer}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        );
    }
  };

  // Se ainda não tem questoes ou está vazio

  return (
    <div className={`containe ${className}`}>
      {/* Exemplo de exibir título/descrição da pesquisa */}
      {/* <h2>{nome}</h2> */}
      {/* <p>{descricao}</p> */}

      <ProgressBar variant="info" now={progress} className="progressbar" />

      {!end && (
        <div className="buttons">
          {currentQuestionIndex > 0 && (
            <button onClick={handlePrevious}>
              <AiOutlineCaretLeft fontSize={30} />
            </button>
          )}
          <button onClick={handleNext}>
            <AiOutlineCaretRight fontSize={30} />
          </button>
        </div>
      )}

      <div className="form">
        {end ? (
          // Quando acaba
          <End pesquisa={idPesquisa} />
        ) : (
          <TransitionGroup>
            <CSSTransition
              key={currentQuestionIndex}
              timeout={500}
              classNames={direction === 'forward' ? 'slide' : 'slide-back'}
            >
              <div className={`question-container ${shake ? 'shake' : ''}`}>
                {/* Exemplo: dots de progresso */}
                {questoes.length > 1 && (
                  <ProgressDots
                    currentIndex={currentQuestionIndex}
                    totalSteps={questoes.length}
                  />
                )}

                <Form.Group className="mb-3" controlId={`formBasic${currentQuestionIndex}`}>
                  <Form.Label className='mb-4 pb-3' style={{ fontSize: 24, borderBottom: '2px solid' }}>
                    {currentQuestion?.texto_pergunta}
                  </Form.Label>
                  {renderInput()}
                </Form.Group>
                
                <button className='button' onClick={handleNext}>
                  Próximo <GrFormNextLink fontSize={25} />
                </button>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )}
      </div>
    </div>
  );
};

export default FormQuestions;
