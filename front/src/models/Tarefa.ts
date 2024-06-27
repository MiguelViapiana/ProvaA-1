
export interface Tarefa{
    id?: string;
    titulo: string;
    descricao: string;
    categoriaId?: string;
    status?: string;
    
}

export interface Categoria{
    id: string;
    nome: string;
    
}