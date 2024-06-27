import { useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import axios from "axios";

function CadastarTarefa(){
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("");
    const [categoria, setCategoria] = useState("");

    function CadastarTarefa(e: any){
        e.preventDefault();

        const tarefa: Tarefa= {
            titulo: titulo,
            descricao: descricao,
            categoriaId: categoria,
        };

        fetch ("http://localhost:5000/tarefas/cadastrar", {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(tarefa)
            });
    }
    return(
        <div>
      <h1>Cadastar Tarefa</h1>
       <form onSubmit={CadastarTarefa}>
         <label>Titulo:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e: any) => setDescricao(e.target.value)}
          required
        />
        <select name="categoria" id="" value={categoria}
        onChange={(e: any) => setCategoria(e.target.value)}>
            <option value="bfe4e7dc-81e4-4e47-a67b-d4fbf3e124bd">Tarefa</option>
            <option value="6d091456-5a2f-4b5a-98fc-f1a3b50a627d">Estudos</option>
            <option value="39be53a2-fc09-4b6a-bafa-18a6a23c8f6e">Lazer</option>
        </select>
        <button type="submit">Cadastrar Livro</button>
      </form>
    </div>
    );

}
export default CadastarTarefa;