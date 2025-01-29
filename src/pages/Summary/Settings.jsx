import React, { useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { RiProgress8Line } from "react-icons/ri";
import { IoRemoveOutline } from "react-icons/io5";
import { GiFinishLine } from "react-icons/gi";
import { FaEye } from "react-icons/fa";

export function Settings({ pesquisa }) {
  const [barraProgresso, setBarraProgresso] = useState(true);
  const [bolinhasPerguntas, setBolinhasPerguntas] = useState(true);
  const [visibilidade, setVisibilidade] = useState(true);

  return (
    <>
      <div className="summarySettings" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="w-75 m-4">
          <h5><GiFinishLine /> Barra de progresso</h5>
          <span>A barra de progresso fornece uma maneira clara para os entrevistados entenderem o quanto do formulário eles concluíram e os incentiva a continuar até o final.</span>
        </div>

        <ToggleButton
          className="mb-2"
          id="toggle-barraProgresso"
          type="checkbox"
          variant={barraProgresso ? 'primary' : 'secondary'}
          checked={barraProgresso}
          value="1"
          onChange={(e) => setBarraProgresso(e.currentTarget.checked)}
        >
          {barraProgresso ? 'Ligado' : 'Desligado'}
        </ToggleButton>
      </div>

      <div className="summarySettings" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="w-75 m-4">
          <h5><RiProgress8Line /> Bolinhas de perguntas</h5>
          <span>As Bolinhas de perguntas fornecem uma maneira clara para os entrevistados entenderem quantas perguntas de cada tópico ainda faltam ser respondidas.</span>
        </div>

        <ToggleButton
          className="mb-2"
          id="toggle-bolinhasPerguntas"
          type="checkbox"
          variant={bolinhasPerguntas ? 'primary' : 'secondary'}
          checked={bolinhasPerguntas}
          value="1"
          onChange={(e) => setBolinhasPerguntas(e.currentTarget.checked)}
        >
          {bolinhasPerguntas ? 'Ligado' : 'Desligado'}
        </ToggleButton>
      </div>

      <div className="summarySettings" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="w-75 m-4">
          <h5><FaEye /> Visibilidade do formulário </h5>
          <span>
            <button style={{backgroundColor: '#0A58CA', color: 'white', border: 'none', borderRadius: 4, marginBottom: 2, fontSize: 15}}>Aberto</button> Qualquer pessoa com o link pode acessar e responder ao formulário. <br />
            <button style={{backgroundColor: '#6C757D', color: 'white', border: 'none',  borderRadius: 4, fontSize: 15}}>Fechado</button> O formulário não está mais aceitando respostas; participantes não poderão responder.
          </span>
        </div>

        <ToggleButton
          className="mb-2"
          id="toggle-visibilidade"
          type="checkbox"
          variant={visibilidade ? 'primary' : 'secondary'}
          checked={visibilidade}
          value="1"
          onChange={(e) => setVisibilidade(e.currentTarget.checked)}
        >
          {visibilidade ? 'Aberto' : 'Fechado'}
        </ToggleButton>
      </div>
    </>
  );
}

export default Settings;
