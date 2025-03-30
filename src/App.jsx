  import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import FormPage from './pages/Form/FormPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import HomePage from './pages/Home/HomePage';
import Summary from './pages/Summary/Summary';
import EditPage from './pages/Edit/EditPage';
import Inbox from './pages/Inbox/Inbox';
import CreatePage from './pages/Edit/CreatePage';

import Signup from './pages/Login/SignUp';
import SignIn from './pages/Login/SignIn';
import useAuth from './hooks/useAuth';
import Answers from './pages/Summary/Answers';

const Private = ({ Item }) => {
  const { signed } = useAuth()
  // return signed > 0 ? <Item /> : <SignIn />;
  return <Item /> 
}

const App = () => {

  return (

    <div className="App">
        <Router>
          <Routes>
            <Route path='*' element={<Signup/>} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/pesquisa/summary/:idPesquisa" element={<Answers />} />
            <Route path="/pesquisas/create" element={<Private Item={CreatePage} />} />
            <Route path="/form/:idPesquisa" element={<FormPage />} />
            <Route path="/pesquisas" element={<Private Item={Admin} />} />
            <Route path="/home" element={<Private Item={Admin} />} />
            <Route path="/dashboard" element={<Private Item={DashboardPage} />} />
            <Route path="/inbox" element={<Private Item={Inbox} />} />
            <Route path="/pesquisas/edit/:id" element={<Private Item={EditPage} />}/>
          </Routes>
        </Router>
    </div>
  );
};

export default App;