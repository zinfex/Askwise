import React, { useState } from 'react';
import { FaRegTrashAlt, FaRegStar } from "react-icons/fa";
import { LuPanelBottomOpen, LuText } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import { MdCheckBoxOutlineBlank, MdOutlineShortText } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap';
import { FaRegCircle } from "react-icons/fa6";

export function Submissions({ hash_id, respostas, perguntas }) {
  if (!respostas || respostas.length === 0) {
    return <div>Nenhuma resposta enviada ainda.</div>;
  }

  // Mapeamento de ID da pergunta para texto da pergunta e tipo da pergunta
  const questionMap = {};
  const tipoPerguntaMap = {};

  // Primeiro, extraímos o tipo_pergunta das respostas
  respostas.forEach(resposta => {
    const questionId = String(
      resposta.idPergunta ||
      resposta.id_pergunta ||
      resposta.pergunta_id ||
      resposta.pergunta ||
      resposta.question_id ||
      resposta.id_question ||
      resposta.id
    );
    const tipo_pergunta = resposta.tipo_pergunta || resposta.type_question;
    if (questionId && tipo_pergunta && !tipoPerguntaMap[questionId]) {
      tipoPerguntaMap[questionId] = tipo_pergunta;
    }
  });

  // Agora, construímos o questionMap incluindo texto_pergunta e tipo_pergunta
  perguntas.forEach(pergunta => {
    const questionId = String(pergunta.id);
    questionMap[questionId] = {
      texto_pergunta: pergunta.texto_pergunta,
      tipo_pergunta: pergunta.tipo_pergunta || tipoPerguntaMap[questionId] || '',
    };
  });

  // Lista de IDs das perguntas na ordem original
  const questionIds = perguntas.map(pergunta => String(pergunta.id));

  // Agrupamento das respostas por submissão
  const submissionsGrouped = {};

  respostas.forEach(resposta => {
    const submissionKey = resposta.user_id || resposta.data;

    if (!submissionsGrouped[submissionKey]) {
      submissionsGrouped[submissionKey] = {
        dataHora: resposta.data,
        user_id: resposta.user_id,
        respostas: {}
      };
    }

    const questionId = String(
      resposta.idPergunta ||
      resposta.id_pergunta ||
      resposta.pergunta_id ||
      resposta.pergunta ||
      resposta.question_id ||
      resposta.id_question ||
      resposta.id
    );

    const answerText = resposta.resposta || resposta.texto_resposta;
    const idResposta = resposta.idresposta || resposta.idResposta || resposta.id_resposta || resposta.id;
    const tipoPergunta = resposta.tipo_pergunta || resposta.type_question;

    if (questionId !== 'undefined' && questionId !== null) {
      submissionsGrouped[submissionKey].respostas[questionId] = {
        answerText: answerText,
        idResposta: idResposta,
        tipo_pergunta: tipoPergunta,
      };
    }
  });

  const [submissionsData, setSubmissionsData] = useState(() => Object.values(submissionsGrouped));

  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleOpenModal = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };

  const handleDeleteSubmission = async (submission) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta submissão? Esta ação não pode ser desfeita.');

    if (confirmDelete) {
      const previousSubmissionsData = [...submissionsData];
      const newSubmissionsData = submissionsData.filter(item => item !== submission);
      setSubmissionsData(newSubmissionsData);

      try {
        const idRespostas = Object.values(submission.respostas).map(resposta => resposta.idResposta);

        // const deletePromises = idRespostas.map(idResposta =>
        //   Api.delete('/_resp', {
        //     data: {
        //       idresposta: idResposta,
        //       idPesquisa: hash_id,
        //     },
        //   })
        // );

        await Promise.all(deletePromises);
      } catch (error) {
        console.error('Erro ao excluir a submissão:', error);
        alert('Ocorreu um erro ao excluir a submissão. Por favor, tente novamente.');
        setSubmissionsData(previousSubmissionsData);
      }
    }
  };

  function formatDateTime(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return dateString;
    }
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}, ${formattedTime}`;
  }

  return (
    <div className="submissions" style={{ overflowX: 'auto' }}>
      <table className="table table-hover table-bordered submissions-table" style={{ minWidth: '600px', whiteSpace: 'nowrap' }}>
        <thead>
          <tr className='tituloperguntas'>
            <th>Data, Hora</th>
            {questionIds.map((questionId, index) => (
              <th key={index}>
                
                {(() => {
                  const question = questionMap[questionId];
                  const tipoPergunta = question.tipo_pergunta;

                  if (tipoPergunta === 'avaliacao') {
                    return <><FaRegStar  size={20} /> {questionMap[questionId].texto_pergunta}</>;
                  } else if (tipoPergunta === 'multipla_escolha') {
                    return <><MdCheckBoxOutlineBlank size={20} /> {questionMap[questionId].texto_pergunta}</>;
                  } else if (tipoPergunta === 'unica_escolha') {
                    return <><FaRegCircle size={15} /> {questionMap[questionId].texto_pergunta}</>;
                  } else if (tipoPergunta === 'resposta_curta') {
                    return <><MdOutlineShortText size={20} /> {questionMap[questionId].texto_pergunta}</>;
                  } else if (tipoPergunta === 'resposta_longa') {
                    return <><LuText size={20} /> {questionMap[questionId].texto_pergunta}</>;
                  } else {
                    return question.texto_pergunta;
                  }
                })()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissionsData.map((submission, submissionIndex) => (
            <tr className='respostas' key={submissionIndex}>
              <td className="submission-date-cell" style={{ display: 'flex' }}>
                {formatDateTime(submission.dataHora)}
                <div className="buttonssubm">
                  <button onClick={() => handleOpenModal(submission)}>
                    <LuPanelBottomOpen size={19} />
                  </button>
                  <button onClick={() => handleDeleteSubmission(submission)}>
                    <FaRegTrashAlt size={18} />
                  </button>
                </div>
              </td>
              {questionIds.map((questionId, index) => {
                const respostaObj = submission.respostas[questionId];
                const answerText = respostaObj?.answerText || '-';
                const tipoPergunta = respostaObj?.tipo_pergunta || questionMap[questionId].tipo_pergunta;

                return (
                  <td key={index}>
                    {tipoPergunta === 'avaliacao' ? (
                      <div className="star-rating">
                        {Array.from({ length: parseInt(answerText) }, (_, i) => (
                          <IoIosStar key={i} size={20} color="gold" />
                        ))}
                      </div>
                    ) : (
                      answerText
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para exibir as perguntas e respostas */}
      {selectedSubmission && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Respostas do usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {questionIds.map((questionId, index) => {
              const respostaObj = selectedSubmission.respostas[questionId];
              const answerText = respostaObj?.answerText || '-';
              const tipoPergunta = respostaObj?.tipo_pergunta || questionMap[questionId].tipo_pergunta;

              return (
                <div className='table' key={index}>
                  <div className='text-black'>
                    {questionMap[questionId].texto_pergunta}
                    {tipoPergunta && (
                      <span style={{ fontWeight: 'normal', fontSize: '0.9em' }}>
                        {(() => {
                          const question = questionMap[questionId];
                          const tipoPergunta = question.tipo_pergunta;

                          if (tipoPergunta === 'avaliacao') {
                            return <><FaRegStar  size={35} /></>;
                          } else if (tipoPergunta === 'multipla_escolha') {
                            return <><MdCheckBoxOutlineBlank size={35} /></>;
                          } else if (tipoPergunta === 'unica_escolha') {
                            return <><FaRegCircle size={30} /></>;
                          } else if (tipoPergunta === 'resposta_curta') {
                            return <><MdOutlineShortText size={40} /></>;
                          } else if (tipoPergunta === 'resposta_longa') {
                            return <><LuText size={35} /></>;
                          } else {
                            return question.texto_pergunta;
                          }
                        })()}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 500, fontSize: 18 }}>
                    {tipoPergunta === 'avaliacao' ? (
                      <div className="star-rating">
                        {Array.from({ length: parseInt(answerText) }, (_, i) => (
                          <IoIosStar key={i} size={40} color="#2A61BB" />
                        ))}
                      </div>
                    ) : (
                      answerText
                    )}
                  </div>
                  <hr />
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Submissions;
