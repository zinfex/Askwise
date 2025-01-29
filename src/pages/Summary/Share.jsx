import React from 'react';
import { FaCopy } from "react-icons/fa";

export function Share({ pesquisa }) {
  const link = `https:///form/${pesquisa}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copiado!');
      })
      .catch(err => {
        alert('Falha ao copiar o link.');
      });
  };

  return (
    <div className="share">
      <h3>Link de compartilhamento</h3>

      <span>
        Seu formulário agora está publicado e pronto para ser compartilhado com o mundo! Copie este link para compartilhar seu formulário nas redes sociais, aplicativos de mensagens ou por e-mail.
      </span>

      <input type="text" value={link} readOnly />
      <button
        className="button"
        style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15 }}
        onClick={handleCopy}
      >
        <FaCopy /> Copiar
      </button>
    </div>
  );
}

export default Share;
