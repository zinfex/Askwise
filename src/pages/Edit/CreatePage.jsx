import React, { useState } from "react";
import MainLayout from "../../MainLayout";
import './index.css';
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { CgChevronRight } from "react-icons/cg";
import { MdOutlineAddBox } from "react-icons/md";
import { IoMdStarOutline, IoMdCheckboxOutline, IoMdCheckmarkCircleOutline, IoMdList } from "react-icons/io";
import { MdShortText } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiPaintBrushHouseholdFill } from "react-icons/pi";
import { AiOutlineCarryOut } from "react-icons/ai";



const CreatePage = () => {
    const [hoveredOption, setHoveredOption] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionTitle, setQuestionTitle] = useState('');
    const [options, setOptions] = useState(['']);
    const [starCount, setStarCount] = useState(3);
    const [loading, setLoading] = useState(false);

    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState('#000000'); // Estado para a cor selecionada

    const handleSurveyTitleChange = (event) => setSurveyTitle(event.target.value);
    const handleSurveyDescriptionChange = (event) => setSurveyDescription(event.target.value);
    const handleColorChange = (event) => setSelectedColor(event.target.value); // Função para atualizar a cor

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setQuestionTitle('');
        setOptions(['']);
        setStarCount(3); // Resetar o número de estrelas quando fechar o modal
    };

    // Função para gerar 6 caracteres aleatórios (letras e números)
    const generateHashId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let hashId = '';
        for (let i = 0; i < 6; i++) {
            hashId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return hashId;
    };

    const handleAddQuestion = (questionType) => {
        const newQuestion = {
            id: Date.now(), // Identificador único baseado no timestamp
            type: questionType,
            title: questionTitle,
            value: '',
            options: [],
            stars: 3
        };

        if (questionType === 'resposta_curta' || questionType === 'resposta_longa') {
            newQuestion.value = '';
        } else if (questionType === 'unica_escolha' || questionType === 'multipla_escolha') {
            newQuestion.options = [...options];
        } else if (questionType === 'avaliacao') {
            newQuestion.stars = starCount;
        }

        setQuestions([...questions, newQuestion]);
        handleCloseModal();
    };

    const handleInputChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].value = event.target.value;
        setQuestions(newQuestions);
    };

    const handleTitleChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].title = event.target.value;
        setQuestions(newQuestions);
    };

    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleQuestionOptionChange = (questionIndex, optionIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAddQuestionOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push('');
        setQuestions(newQuestions);
    };

    const handleDeleteQuestionOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
        setQuestions(newQuestions);
    };

    const handleStarCountChange = (questionIndex, event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 3 && value <= 10) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].stars = value;
            setQuestions(newQuestions);
        }
    };

    const handlePublish = async () => {
        setLoading(true);

       //ir para a ela do formulario

        setLoading(false);
    };

    const getDescriptionContent = (option) => {
        switch (option) {
          case 'Novo tópico':
            return 'Utilize para separar o formulário em seções ou tópicos diferentes.';
          case 'Resposta curta':
            return 'Permite ao usuário inserir uma resposta breve em uma única linha.';
          case 'Resposta longa':
            return 'Permite ao usuário fornecer uma resposta mais detalhada em múltiplas linhas.';
          case 'Única escolha':
            return 'O usuário pode selecionar apenas uma opção dentre as fornecidas.';
          case 'Múltipla escolha':
            return 'O usuário pode selecionar várias opções dentre as fornecidas.';
          case 'Avaliação':
            return 'O usuário pode avaliar algo em uma escala de 3 a 10 estrelas.';
          default:
            return 'Escolha um item para criar seu formulário.';
        }
      };

    return (
        <MainLayout>
            <header style={{ display: 'flex', justifyContent: 'space-between',}}>
                <div>Minhas pesquisas <CgChevronRight /> Nova pesquisa</div>
                {loading ? <Spinner animation="border" variant="primary" /> : <Button className="p-1" onClick={handlePublish}>Publicar</Button>}
            </header>

            <div className="infoedit">
                <input 
                    style={{padding: 0}}
                    type="text" 
                    placeholder="Título da Pesquisa" 
                    value={surveyTitle} 
                    onChange={handleSurveyTitleChange}
                />
                <input 
                    className="mb-5 descricao" 
                    style={{ fontWeight: 400, padding: 0, display: 'flex', alignItems: 'center', gap: 7 }}
                    placeholder={`Adicionar descricao`}
                    value={surveyDescription}
                    onChange={handleSurveyDescriptionChange}
                />

                <div className="questions">
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="mb-3 question-item">
                            <RiDeleteBin6Line
                                className="mr-2 delete-icon"
                                onClick={() => handleDeleteQuestion(questionIndex)}
                            />
                            <input
                                type="text"
                                placeholder="Título da pergunta"
                                value={question.title}
                                onChange={(event) => handleTitleChange(questionIndex, event)}
                                className="w-100 mb-2 p-0 d-flex small"
                            />
                            {question.type === 'resposta_curta' && (
                                <input
                                    className="boxinput"
                                    type="text"
                                    value={question.value}
                                    onChange={(event) => handleInputChange(questionIndex, event)}
                                />
                            )}
                            {question.type === 'resposta_longa' && (
                                <textarea
                                    className="boxinput"
                                    rows={3}
                                    value={question.value}
                                    onChange={(event) => handleInputChange(questionIndex, event)}
                                />
                            )}
                            {question.type === 'unica_escolha' && (
                                <div className="option-container">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="d-flex align-items-center">
                                            <input
                                                type="text"
                                                className="unicaescolha"
                                                placeholder={`Opção ${optionIndex + 1}`}
                                                value={option}
                                                onChange={(event) => handleQuestionOptionChange(questionIndex, optionIndex, event)}
                                            />
                                            <Button variant="transparent" style={{ fontSize: 25, margin: 0, p:0 }} onClick={() => handleDeleteQuestionOption(questionIndex, optionIndex)}>
                                                <CiCircleRemove style={{padding: 0}} />
                                            </Button>
                                        </div>
                                    ))}
                                    {question.options.length < 6 && (
                                        <div className="option-buttons">
                                            <Button variant="transparent" onClick={() => handleAddQuestionOption(questionIndex)}>
                                                Nova opção
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                            {question.type === 'multipla_escolha' && (
                                <div className="option-container">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="d-flex align-items-center">
                                            <MdCheckBoxOutlineBlank size={25}/>

                                            <input
                                                type="text"
                                                className="boxradio"
                                                placeholder={`Opção ${optionIndex + 1}`}
                                                value={option}
                                                onChange={(event) => handleQuestionOptionChange(questionIndex, optionIndex, event)}
                                            />
                                            <Button variant="transparent" style={{ fontSize: 25, margin: 0 , padding: 0}} onClick={() => handleDeleteQuestionOption(questionIndex, optionIndex)}>
                                                <CiCircleRemove style={{margin: 0, py:0 }}/>
                                            </Button>
                                        </div>
                                    ))}
                                    {question.options.length < 6 && (
                                        <div className="option-buttons">
                                            <Button variant="transparent" style={{padding: 0, marginTop: 10, color: '#000000d0'}} onClick={() => handleAddQuestionOption(questionIndex)}>
                                                <MdCheckBoxOutlineBlank size={25}/> Nova opção
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                            {question.type === "avaliacao" && (
                                <div>
                                    <Form.Group controlId="formStarCount" className="d-flex align-items-center">
                                        <Form.Label style={{ fontSize: 16 }}>Quantidade de estrelas: </Form.Label>
                                        <input
                                            style={{ width: 'fit-content', margin: '0 0 5px 5px', border: 'none', fontSize: 17, color: '#0D6EFD' }}
                                            type="number"
                                            value={question.stars}
                                            onChange={(event) => handleStarCountChange(questionIndex, event)}
                                            min={3}
                                            max={10}
                                        />
                                    </Form.Group>
                                    <div className="d-flex align-items-center">
                                        {[...Array(question.stars)].map((_, starIndex) => (
                                            <IoMdStarOutline key={starIndex} size={30} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        className="novapergunta"
                        onClick={handleShowModal}
                    >
                        <MdOutlineAddBox /> Nova pergunta
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Selecione um item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content-container">
            {/* Coluna da esquerda: opções */}
            <div className="options-column">
              <Form>
                <Form.Group>
                  <div className="custom-radio">
                    <div
                      className="custom-radio-item"
                      style={{ color: '#2A61C1' }}
                      onMouseEnter={() => setHoveredOption('Novo tópico')}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <div>
                        <AiOutlineCarryOut /> Novo tópico
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddQuestion('resposta_curta')}
                      className="custom-radio-item"
                      onMouseEnter={() => setHoveredOption('Resposta curta')}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <div>
                        <MdShortText fontSize={20} /> Resposta curta
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddQuestion('resposta_longa')}
                      className="custom-radio-item"
                      onMouseEnter={() => setHoveredOption('Resposta longa')}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <div>
                        <IoMdList fontSize={20} /> Resposta longa
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddQuestion('unica_escolha')}
                      className="custom-radio-item"
                      onMouseEnter={() => setHoveredOption('Única escolha')}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <div>
                        <IoMdCheckmarkCircleOutline fontSize={20} /> Única escolha
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddQuestion('multipla_escolha')}
                      className="custom-radio-item"
                      onMouseEnter={() => setHoveredOption('Múltipla escolha')}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <div>
                        <IoMdCheckboxOutline fontSize={20} /> Múltipla escolha
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddQuestion('avaliacao')}
                      className="custom-radio-item"
                      onMouseEnter={() => setHoveredOption('Avaliação')}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <div>
                        <IoMdStarOutline fontSize={20} /> Avaliação
                      </div>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </div>

            {/* Linha vertical */}
            <div className="vertical-line"></div>

            {/* Coluna da direita: descrição */}
            <div className="description-column">
              <p>{getDescriptionContent(hoveredOption)}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </MainLayout>
    );
};

export default CreatePage;