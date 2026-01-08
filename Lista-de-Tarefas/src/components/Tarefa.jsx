import { useEffect, useState, memo} from "react"
import './cssComponente/tarefa.css'

function Tarefa ({texto}){

    const [concluida, setConcluida] = useState(false);

    const alternar = () => {
        setConcluida(!concluida);
        
    }
    return (
        <div>
            <li><input type="checkbox" onChange={alternar}/><span className={concluida ? 'concluida' : ''}>{texto}</span><button>Remover</button></li>
        </div>
    )
}

//utiliza o memo para impedir a re-rendiração de um componente executando ele somente qquando alterado
export default  memo(Tarefa)