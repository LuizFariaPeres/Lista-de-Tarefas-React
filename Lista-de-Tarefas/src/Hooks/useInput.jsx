import { useState } from "react";

export function useInput(valorInicial = ''){
    //State que armazena o valor com base na prop ValorInicial
    const[valor, setValor] = useState(valorInicial);

    //Constante que armazena o evento onChange responsavel por atribuir o valor digitado ao State Valor
    const onChange = (e)=>{
        setValor(e.target.value?.trim()); //?.trim() verifica se o valor esta vazio
    }

    //Constante que armazena a função de limpeza de campos
    const limpar = () => setValor('')

    //retorna um objeto com toda a logica
    return{
        valor, 
        onChange,
        limpar
    }
}