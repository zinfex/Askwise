import React, { useState } from 'react';
import './Login.css';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
function SignIn() {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email || !senha) {
            setError("Preencha todos os campos");
            return;
        } else if (email === 'user@user.com' && senha === 'user') {
            localStorage.setItem('token', 'tokentest');
                
            // Chamando a função signin do contexto de autenticação
            signin(email, 'tokentest');

            navigate("/pesquisas/create");
        }

    };

    return (
        <div className="containerlogin">
            <div className="boxlogin">
                <div className="infobox">
                    <h1>Faça seu login</h1>
                    <p>Não tem uma conta? <Link to="/">Começar uma conta</Link></p>

                    <div className='icons'>
                        <FcGoogle /> Entrar com o Google
                    </div>
                </div>

                <hr style={{marginBlock: 20}}/>

                <form onSubmit={handleLogin}>
                    <input 
                        placeholder='Endereço de E-mail' 
                        type="email" 
                        className='email' 
                        value={email}
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />

                    <input 
                        placeholder='Senha' 
                        type="password" 
                        className='password'
                        value={senha}
                        onChange={(e) => [setSenha(e.target.value), setError("")]}
                    />
                    <span>Esqueceu a senha?</span>
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
