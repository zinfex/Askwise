import React, { useContext, useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import { Nav, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Index.css';
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { GoZap, GoHomeFill } from "react-icons/go";
import { FaUserCircle, FaInbox } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings, IoIosAdd } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { MdOutlineSupport } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";

import PesquisaContext from '../../contexts/PesquisasContext';

const Sidebar = () => {
  const { pesquisas } = useContext(PesquisaContext);
  const [showAddIcon, setShowAddIcon] = useState(false);
  const [open, setOpen] = useState(false); 

  return (
    <div className="sidebar">
      <img src="/logo.png" alt="" className='sideloog' style={{ width: 180 }} />

      <Nav className="flex-column sidebaritems">
        <div className="config">
          <Nav.Item className='mb-2'>
              <Dropdown>
                  <Dropdown.Toggle variant="transparent"style={{fontWeight: 600, color: '#065D93'}} id="dropdown-basic">
                      <FaUserCircle /> User
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1"><GoZap /> Assinaturas</Dropdown.Item>
                      <Dropdown.Item href="#/action-2"><IoSettingsOutline/> Configurações</Dropdown.Item>
                      <Dropdown.Item href="#/action-3"><IoLogOutOutline /> Sair</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/pesquisas/create"><GoHomeFill  /> Página inicial</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/dashboard"><MdDashboard /> Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/inbox"><FaInbox /> Caixa de entrada</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/dashboard"><IoMdSettings /> Configurações</Nav.Link>
          </Nav.Item>
        </div>

        <div className="workspace">
          <Nav.Item
            onMouseEnter={() => setShowAddIcon(true)}
            onMouseLeave={() => setShowAddIcon(false)}
          >
            <div className="d-flex align-items-center">
              <Nav.Link
                onClick={() => setOpen(!open)} // Toggle Collapse on click
                aria-controls="pesquisas-collapse"
                aria-expanded={open}
              >
                <IoIosArrowDropdownCircle size={16}/>
                Minhas pesquisas
              </Nav.Link>
              {showAddIcon && <Link to='/pesquisas/create'><IoIosAddCircle className='addside' /></Link>}
            </div>
            <Collapse in={open}>
              <div id="pesquisas-collapse">
                <Nav className="flex-column ml-3">
                  {pesquisas.length < 1 && (
                    <Link to='/pesquisas/create' className='sidecreate'>
                      <IoIosAddCircleOutline size={16} /> Criar pesquisa
                    </Link>
                  )}
                  {pesquisas.length > 1 && (
                    pesquisas.map((pesquisa) => (
                      <Nav.Item key={pesquisa.id_2}>
                        <Nav.Link style={{fontSize: 13}} as={Link} to={`/pesquisa/summary/${pesquisa.hash_id}`}>
                          {pesquisa.nome}
                        </Nav.Link>
                      </Nav.Item>
                    ))
                  )}
                </Nav>
              </div>
            </Collapse>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/personalizacao"><HiTemplate /> Personalização</Nav.Link>
          </Nav.Item>
        </div>

        <div className="helper">
          <Nav.Item>
            <Nav.Link as={Link} to="/iniciar"><RiRoadMapFill /> Como iniciar</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/contato"><MdOutlineSupport /> Contato de suporte</Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
