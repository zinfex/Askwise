import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import './Login.css'
import { FcGoogle } from "react-icons/fc";

function Signup() {
  return (
    <MDBContainer fluid className='p-5 containerlogin'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-2 fw-bold ls-tight px-3">
            Crie suas pesquisas com<br />
            <span className="text-primary">Criador de Formulários</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Desenvolvido por <a target='_blank' href="https://github.com/zinfex">Zinfe</a>
          </p>
        </MDBCol>

        <MDBCol md='4'>
          <div className="boxlogin">
              <div className="infobox">
                  <h1>Crie sua conta</h1>
                  <p>Já tem uma conta? <a href="/login">Entrar na conta</a></p>

                  <div className='icons'>
                      <FcGoogle /> Entrar com o Google
                  </div>
              </div>

              <hr style={{marginBlock: 20}}/>

              <form action="">
                  <div className="nomes" style={{display: 'flex', gap: 10}}>
                    <input placeholder='Nome' type="text" id='nome' />
                    <input placeholder='Sobrenome' type="text" />
                  </div>
                  <input placeholder='Endereço de E-mail' type="email" className='email' />
                  <input placeholder='Senha' type="password" className='password'/>
                  <button>Criar conta</button>
              </form>
          </div>
    
          <button id='demobtn'>ENTRAR COMO CONVIDADO</button>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;