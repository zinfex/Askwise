import MainLayout from "../../MainLayout";
import { HiInboxArrowDown } from "react-icons/hi2";
import './Index.css'
import { useEffect, useState } from "react";

function Inbox() {
    const [messages, setMessages] = useState([])

    return (
        <MainLayout>
            Caixa de entrada
                
            {messages[0] > 0 ? (
                <div className="none">
                    <HiInboxArrowDown size={50} />
                    <span>Sem notificações</span>
                </div>
            ) : 
            messages.map((message, index) => (
                <div className="pesquisa" >
                    <div className="d-block d-flex flex-column text-decoration-none">
                        <span>PERGUNTA {index}</span>
                        <span style={{ color: 'black' }}>{message}</span>
                    </div>
                </div>
            ))
            // pesquisas.map((pesquisa, index) => (
            //     <div 
            //       onClick={() => openPerguntasPesquisas(pesquisa.id)} 
            //       key={index} 
            //       className='pesquisa' 
            //       title={`Criado: ${pesquisa.data}`}
            //     >
            //       <div className="d-block d-flex flex-column text-decoration-none">
            //         <span style={{ color: 'black' }}>{pesquisa.nome}</span>
            //         <span className='small'>{pesquisa.descricao}</span>
            //       </div>
                  
            //       <div className="iconbuttons">
            //         <button
            //           className="btn btn-link p-0"
            //           onClick={(e) => {
            //             e.stopPropagation();
            //             navigate(`/pesquisas/edit/${pesquisa.id}`);
            //           }}
            //           title='Editar pesquisa'
            //         >
            //           <AiFillEdit fontSize={25} />
            //         </button>
  
            //         <FaTrash color='primary' />
  
            //         <Link to={`/form/${pesquisa.id}`} className='btn btn-link p-0'>
            //           <IoIosLink fontSize={25} />
            //         </Link>
            //       </div>
            //     </div>
            //   ))
            }
        </MainLayout>
    )
}

export default Inbox;