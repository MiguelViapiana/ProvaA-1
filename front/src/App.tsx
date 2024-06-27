import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ListarTarefas from './components/pages/listar/listar-tarefas';
import ListarTarefasNaoConcluidas from './components/pages/listar/listar-tarefas-nãoconcluidas';
import ListarTarefasConcluidas from './components/pages/listar/listar-tarefas-concluidas';
import CadastarTarefa from './components/pages/cadastro/cadastar-tarefa';

function App() {
  return (
    <div className="App">
      <h1>API de Tarefas</h1>
      <BrowserRouter>
      <ul>
        <li>
          <Link to={"/pages/listar-tarefas"} >Listar todas as tarefas</Link>
        </li>
        <li>
          <Link to={"/pages/listar-tarefas-naoconcluidas"} >Listar tarefas não iniciadas</Link>
        </li>
        <li>
        <Link to={"/pages/listar-tarefas-concluidas"} >Listar tarefas concluídas</Link>
        </li>
        <li>
          <Link to={"/pages/cadastar"}>Cadastar Tarefa</Link>
        </li>
      </ul>
      

        <Routes>
          <Route path={"/pages/listar-tarefas-naoConcluidas"} element={<ListarTarefasNaoConcluidas/>}/>
          <Route path='/pages/listar-tarefas' element={<ListarTarefas/>} />
          <Route path='/pages/listar-tarefas-concluidas' element={<ListarTarefasConcluidas/>}/>
          <Route path='/pages/cadastar' element={<CadastarTarefa/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
