import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { IoIosCheckmarkCircle } from "react-icons/io";
import './Index.css';
import { IoCloud } from "react-icons/io5";
import { Link } from 'react-router-dom';

const End = ({ pesquisa }) => {
  if (localStorage.getItem('token') == undefined) {
    localStorage.setItem('finished', pesquisa)
  }
 
  return (
    <div className="end-animation">
        <Form.Group className='end-group'>
            {/* <IoIosCheckmarkCircle className='end-icon' /> */}
            <img onClick src="/logo.png" width={300} style={{marginBottom: 30}} alt="" className='end-icon'/>

            <Form.Label className='end-text' >


              <b style={{width: '100%'}}>Feito com Simples Forms, o jeito mais fácil de criar formulários</b> <br/>

              <Link to={'/'} ><button className='endbutton'><IoCloud /> Crie seu próprio formulário</button></Link>
            </Form.Label>

            
        </Form.Group>
    </div>
  );
};

export default End;