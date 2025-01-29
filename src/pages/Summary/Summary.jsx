import React, { useState } from 'react';
import './Index.css';
import { MdDateRange, MdOutlineQuestionAnswer } from "react-icons/md";
import ApexCharts from 'react-apexcharts';
import Accordion from 'react-bootstrap/Accordion';
import { AiFillStar } from 'react-icons/ai';

export function Summary({ perguntas, respostas }) {
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    const handleQuestionClick = (questionId) => {
        setSelectedQuestionId(prevId => prevId === questionId ? null : questionId);
    };

    return (
        <div className="answers">
            <Accordion defaultActiveKey="0" className="questions-list">
                {perguntas.map((pergunta) => {
                    const questionType = pergunta.type.value;
                    const isMultipleChoice = questionType === 'unica_escolha' || questionType === 'multipla_escolha';

                    const respostasDaPergunta = respostas.filter(resposta => resposta.pergunta == pergunta.id);
                    const quantidadeRespostas = respostasDaPergunta.length;

                    // Preparar dados para o gráfico se necessário
                    let chartData = null;
                    if (isMultipleChoice && quantidadeRespostas > 0) {
                        const respostaCounts = {};

                        respostasDaPergunta.forEach(resposta => {
                            let selectedOptions = [];

                            if (questionType === 'unica_escolha') {
                                selectedOptions = [resposta.resposta];
                            } else if (questionType === 'multipla_escolha') {
                                if (resposta.resposta) {
                                    selectedOptions = resposta.resposta.split(',').map(option => option.trim());
                                }
                            }

                            selectedOptions.forEach(option => {
                                if (option) {
                                    respostaCounts[option] = (respostaCounts[option] || 0) + 1;
                                }
                            });
                        });

                        const labels = Object.keys(respostaCounts);
                        const data = Object.values(respostaCounts);

                        chartData = {
                            series: data,
                            options: {
                                chart: {
                                    type: 'pie',
                                },
                                labels: labels,
                                legend: {
                                    position: 'bottom'
                                }
                            },
                        };
                    } else if (questionType === 'avaliacao' && quantidadeRespostas > 0) {
                        // Preparar dados para gráfico de barras de avaliações
                        const respostaCounts = {};

                        respostasDaPergunta.forEach(resposta => {
                            const rating = parseInt(resposta.resposta, 10);
                            if (!isNaN(rating)) {
                                respostaCounts[rating] = (respostaCounts[rating] || 0) + 1;
                            }
                        });

                        const ratings = Object.keys(respostaCounts).sort((a, b) => a - b);
                        const counts = ratings.map(rating => respostaCounts[rating]);

                        chartData = {
                            series: [{
                                data: counts,
                            }],
                            options: {
                                chart: {
                                    type: 'bar',
                                },
                                xaxis: {
                                    categories: ratings.map(rating => {
                                        // Converter o número de estrelas em ícones
                                        const stars = Array.from({ length: rating }, () => '★').join('');
                                        return stars;
                                    }),
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                    },
                                },
                                yaxis: {
                                    title: {
                                        text: 'Quantidade de Respostas',
                                    },
                                },
                                tooltip: {
                                    y: {
                                        formatter: function (val) {
                                            return val + " respostas";
                                        }
                                    }
                                }
                            },
                        };
                    }

                    return (
                        <Accordion.Item eventKey={pergunta.id.toString()} key={pergunta.id}>
                            <Accordion.Header
                                className="question-title"
                                onClick={() => handleQuestionClick(pergunta.id)}
                            >
                                <div className="quantbox">{quantidadeRespostas}</div>
                                {pergunta.texto_pergunta}
                            </Accordion.Header>

                            {selectedQuestionId === pergunta.id && (
                                <Accordion.Body>
                                    {chartData && (
                                        <div className="chart-container">
                                            <ApexCharts
                                                options={chartData.options}
                                                series={chartData.series}
                                                type={chartData.options.chart.type}
                                                height={350}
                                            />
                                        </div>
                                    )}
                                    <table className="respostas-table">
                                        <thead>
                                            <tr>
                                                <th><MdDateRange /> Data e Hora</th>
                                                <th><MdOutlineQuestionAnswer /> Resposta</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {respostasDaPergunta.map((resposta, index) => (
                                                <tr key={index}>
                                                    <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        {resposta.data}
                                                    </td>
                                                    <td className='resp'>
                                                        {questionType === 'avaliacao' ? (
                                                            // Renderizar estrelas em vez de números
                                                            <div>
                                                                {Array.from({ length: parseInt(resposta.resposta, 10) }, (_, i) => (
                                                                    <AiFillStar key={i} color="#FFD700" />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            resposta.resposta
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Accordion.Body>
                            )}
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </div>
    );
}

export default Summary;
