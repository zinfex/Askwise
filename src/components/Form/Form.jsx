import React, { useEffect, useState } from 'react';
import { Form, Spinner, ProgressBar } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import End from './End';
import EndBonus from './EndBonus';
import ProgressDots from './ProgressDots';
import { MdOutlineStarPurple500 } from "react-icons/md";
import './Index.css';
import '../../styles/Responsive.css';
import Api from '../../config/Api';
import { GrFormNextLink } from "react-icons/gr";

const FormQuestions = ({ questions, topics, apiEndpoint, className, idPesquisa }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTopicId, setCurrentTopicId] = useState(questions[0]?.topico || null);
  const [end, setEnd] = useState(false);
  const [showEndBonus, setShowEndBonus] = useState(false);
  const [skipTopicIntro, setSkipTopicIntro] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [shake, setShake] = useState(false);
  const [direction, setDirection] = useState('forward');
  const [showTopicIntro, setShowTopicIntro] = useState(true);
  const [tempAnswers, setTempAnswers] = useState([]);
  
  const filteredQuestions = questions.filter(q => q.topico === currentTopicId);
  const totalQuestions = questions.length;
  const topicQuestionCount = filteredQuestions.length;

  const user_id = localStorage.getItem('user_id');

  // Mova a declaração de currentQuestion para antes do useEffect
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const currentTopicName = topics[currentTopicId];

  // Atualize currentAnswer corretamente quando currentQuestion muda
  useEffect(() => {
    if (currentQuestion?.type.value === 'multipla_escolha') {
      setCurrentAnswer([]);
    } else {
      setCurrentAnswer('');
    }
  }, [currentQuestion]);

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

  const handleNext = () => {
    const isMultiChoice = currentQuestion.type.value === 'multipla_escolha';
    const isAnswerEmpty = isMultiChoice
      ? currentAnswer.length === 0
      : currentAnswer.trim() === '';

    if (isAnswerEmpty && !showTopicIntro) {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      return;
    }

    if (showTopicIntro) {
      if (skipTopicIntro) {
        setShowTopicIntro(false);
      } else {
        setShowTopicIntro(false);
        return;
      }
    }

    const newAnswer = {
      resposta: Array.isArray(currentAnswer)
        ? currentAnswer.join(', ')
        : currentAnswer,
      user_id,
      hash_id: idPesquisa,
      idPergunta: filteredQuestions[currentQuestionIndex].id,
      titulo_pergunta: filteredQuestions[currentQuestionIndex].texto_pergunta,
      tipo_pergunta: currentQuestion.type.value,
    };

    setTempAnswers(prevTempAnswers => {
      const updatedAnswers = [...prevTempAnswers];
      updatedAnswers[currentQuestionIndex] = newAnswer;
      return updatedAnswers;
    });

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setDirection('forward');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    } else {
      const topicIds = Object.keys(topics);
      const currentTopicIndex = topicIds.indexOf(currentTopicId);
      const nextTopicIndex = currentTopicIndex + 1;

      setAnswers(prevAnswers => [...prevAnswers, ...tempAnswers, newAnswer]);

      if (nextTopicIndex < topicIds.length) {
        const nextTopicId = topicIds[nextTopicIndex];

        if (nextTopicIndex === topicIds.length - 1) {
          setShowEndBonus(true);
          setSkipTopicIntro(true);

          sendAnswers([...tempAnswers, newAnswer]);

          setTempAnswers([]);
          setCurrentTopicId(nextTopicId);
          setCurrentQuestionIndex(0);
          setCurrentAnswer('');
        } else {
          sendAnswers([...tempAnswers, newAnswer]);

          setTempAnswers([]);
          setCurrentTopicId(nextTopicId);
          setCurrentQuestionIndex(0);
          setCurrentAnswer('');
          setShowTopicIntro(true);
        }
      } else {
        setEnd(true);

        sendAnswers([...tempAnswers, newAnswer]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection('backward');
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = tempAnswers[currentQuestionIndex - 1]?.resposta;
      setCurrentAnswer(Array.isArray(previousAnswer) ? previousAnswer : previousAnswer || '');
    }
  };

  const sendAnswers = async (answersToSend) => {
    try {
      await Api.post(apiEndpoint, answersToSend);
    } catch (error) {
      console.log('Erro ao enviar respostas:', error);
    }
  };

  useEffect(() => {
    if (showTopicIntro && !skipTopicIntro) {
      const timer = setTimeout(() => {
        handleNext();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showTopicIntro, skipTopicIntro]);

  const handleEndBonusContinue = () => {
    setShowEndBonus(false);
    setShowTopicIntro(false);
  };

  const handleChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleOptionSelect = (option) => {
    if (currentQuestion.type.value === 'multipla_escolha') {
      setCurrentAnswer(prevAnswer => {
        if (prevAnswer.includes(option)) {
          return prevAnswer.filter(item => item !== option);
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

  const currentQuestionGlobalIndex = questions.findIndex(
    q => q.id === currentQuestion?.id
  );
  const progress = ((currentQuestionGlobalIndex + 1) / totalQuestions) * 100;

  const renderInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type.value) {
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
      case 'email':
      case 'number':
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
      case 'Texto':
        return (
          <div>
            <input
              type={currentQuestion.type.value}
              placeholder={currentQuestion.placeholder}
              className='input'
              value={currentAnswer}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              maxLength={200}
            />
            <div className="char-counter">
              {currentAnswer.length}/200 caracteres
            </div>
          </div>
        );
      case 'avaliacao':
        const stars = parseInt(currentQuestion.placeholder);
        return (
          <div className="star-rating">
            {[...Array(stars)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= currentAnswer ? "on" : "off"}
                  onClick={() => handleStarSelect(index)}
                >
                  <MdOutlineStarPurple500 size={40} />
                </button>
              );
            })}
          </div>
        );
      case 'Score':
      case 'multipla_escolha':
        return (
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
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
        return (
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
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
        return null;
    }
  };

  if (!questions || questions.length === 0) {
    return <Spinner animation="border" variant="info" className='loading' />;
  }

  return (
    <div className={`containe ${className}`}>
      <ProgressBar variant="info" now={progress} className="progressbar" />
      {!end && !showEndBonus && !showTopicIntro && topicQuestionCount > 1 && (
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
      {!end && !showTopicIntro && <h2 className='topic-name'>{currentTopicName}</h2>}

      <div className="form">
        {end ? (
          <End pesquisa={idPesquisa}/>
        ) : showEndBonus ? (
          <EndBonus onContinue={handleEndBonusContinue} />
        ) : (
          <TransitionGroup>
            {showTopicIntro ? (
              !skipTopicIntro && (
                <CSSTransition
                  key={currentTopicId}
                  timeout={600}
                  classNames="fade"
                >
                  <span className='presentation'>{currentTopicName}</span>
                </CSSTransition>
              )
            ) : (
              <CSSTransition
                key={currentQuestion?.id}
                timeout={500}
                classNames={direction === 'forward' ? 'slide' : 'slide-back'}
              >
                <div className={`question-container ${shake ? 'shake' : ''}`}>
                  {filteredQuestions.length > 1 && (
                    <ProgressDots currentIndex={currentQuestionIndex} totalSteps={filteredQuestions.length} />
                  )}
                  
                  <Form.Group className="mb-3" controlId={`formBasic${currentQuestion?.id}`}>
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
            )}
          </TransitionGroup>
        )}
      </div>
    </div>
  );
};

export default FormQuestions;
