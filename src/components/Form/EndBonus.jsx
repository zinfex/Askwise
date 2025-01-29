import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IoIosCheckmarkCircle } from "react-icons/io";
import Confetti from 'react-confetti';
import './Index.css';

const EndBonus = ({ onContinue }) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [confettiRunning, setConfettiRunning] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setConfettiRunning(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="end-animation">
      {confettiRunning && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={50}
          gravity={0.2}
        />
      )}
      <Form.Group className='end-group'>
        <IoIosCheckmarkCircle className='end-icon' />
        <Form.Label className='end-text'>
          <b>Para receber seu prêmio, clique em: </b>
          <br />
        </Form.Label>

        <button className='endbonusbutton mt-3' onClick={onContinue}>
          Continuar
        </button>
      </Form.Group>
    </div>
  );
};

export default EndBonus;
