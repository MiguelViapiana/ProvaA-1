import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";

function ListarTarefasConcluidas(){
    const[tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(()=>{
        console.log("Carregou lista de tarefas");
        carregarTarefas();

    }, []);

    function carregarTarefas(){
        fetch("http://localhost:5000/tarefas/concluidas")
            .then((resposta) => resposta.json())
            .then((tarefas : Tarefa[]) =>{
                setTarefas(tarefas);
                console.table(tarefas);
            })
            .catch((erro) =>{
                console.log("Deu erro!");
            });
    }

    return(
        <div>
            <h1>Lista de tarefas concluídas</h1>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefas) =>(
                        <tr key={tarefas.id}>
                            <td>{tarefas.titulo}</td>
                            <td>{tarefas.descricao}</td>
                            <td>{tarefas.categoriaId}</td> 
                            <td>{tarefas.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarTarefasConcluidas;