import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './assets/styles/styles.css';
import Register from './components/Register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades de Bootstrap
import Login from './components/Login.jsx';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/register">Registro</Link>
                <Link to="/login">Inicio de Sesión</Link>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router> 
    );
};

export default App;
