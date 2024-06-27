import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import axios from "axios";

function ListarTarefas(){
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [categoria, setcategoria] = useState("");

    useEffect(()=>{
        console.log("Carregou lista de tarefas");
        carregarTarefas();

    }, []);

    function carregarTarefas(){
        fetch("http://localhost:5000/tarefas/listar")
            .then((resposta) => resposta.json())
            .then((tarefas : Tarefa[]) =>{
                setTarefas(tarefas);
                console.table(tarefas);
            })
            .catch((erro) =>{
                console.log("Deu erro!");
            });
    }

    function alterar(id: string){
        console.log("Alterar");
        axios.patch(`http://localhost:5000/tarefas/alterar/${id}`)
            .then((resposta) =>{
                setTarefas(resposta.data);
                console.table(tarefas);
            });

    }

    return(
        <div>
            <h1>Lista de tarefas</h1>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefas) =>(
                        <tr key={tarefas.id}>
                            <td>{tarefas.titulo}</td>
                            <td>{tarefas.descricao}</td>
                            <td>{tarefas.categoriaId}</td> 
                            <td>{tarefas.status}</td>
                            <td>
                                <button onClick={() => {alterar(tarefas.id!)}}>Alterar Status</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ListarTarefas;