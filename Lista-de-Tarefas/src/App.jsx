import { useState } from 'react'
// Importa o hook useState, usado para criar estados no React.

import { useEffect } from 'react'
// Importa o hook useEffect, usado para executar algo quando o componente é montado.

import Tarefa from './components/Tarefa'
// Importa o componente Tarefa, responsável por renderizar cada item da lista.

import './components/App.css'
// Importa o arquivo de estilos CSS associado ao app.


// URL da API crudcrud onde as tarefas serão salvas e lidas.
const API_URL = 'https://crudcrud.com/api/4528314d11564d00b66365b6e6eeceb9/tarefas';


function App() {

  // Estado que guarda a lista de tarefas.
  // Inicialmente vazio, pois as tarefas só chegam da API.
  const [lista, setLista] = useState([])

  // Estado para armazenar o texto digitado no input.
  const [name, setName] = useState('')


  // useEffect roda logo que o componente App é montado na tela.
  // Aqui buscamos os dados da API pela primeira vez.
  useEffect(() =>{
    fetch(API_URL)                               // Faz uma requisição GET para a API.
      .then(res => res.json())                    // Converte a resposta para JSON.
      .then(data => setLista(data))               // Salva a lista de tarefas no estado.
      .catch(error => console.error(              // Caso dê erro, exibe no console.
        'Erro ao buscar tarefas', 
        error
      ))
  },[])  // Array vazio -> executa só uma vez, quando o componente montar.


  // Função chamada quando o formulário é enviado.
  const handleSubmit = (e) =>{
    e.preventDefault();                           // Impede o recarregamento da página.

    if(name.trim() === ''){                       // Verifica se o campo está vazio.
      alert('Campo Obrigatório');
      return;                                     // Sai da função sem fazer nada.
    }

    // Cria um objeto representando a nova tarefa.
    const novaTarefa = {name: name.trim()};

    // Envia a nova tarefa para a API com POST.
    fetch(API_URL, {
      method: 'POST',                             // Método POST (criar item).
      headers: {'Content-Type': 'application/json'}, // Diz que está enviando JSON.
      body: JSON.stringify(novaTarefa)            // Converte a tarefa para JSON.
    })
      .then(res => res.json())                    // Recebe a resposta já criada no servidor.
      .then(tarefaCriada =>{
        // Adiciona a nova tarefa na lista atual, sem perder as outras.
        setLista([...lista, tarefaCriada]);

        // Limpa o campo do input.
        setName('');
      })
      .catch(error => console.error(              // Caso o POST falhe.
        'Erro ao buscar tarefas', 
        error
      ))

  }


  // ------------------------------
  // O que aparece na tela
  // ------------------------------
  return (
    <div className='conteiner'>
      <h1>Lista de Tarefas</h1>

      {/* Formulário de adicionar tarefa */}
      <form onSubmit={handleSubmit}>

        {/* Campo de texto controlado pelo estado "name" */}
        <input 
          type="text" 
          placeholder="Digite sua tarefa" 
          value={name} 
          onChange={(e) => setName(e.target.value)} // Atualiza o estado conforme o usuário digita.
        />

        <button type="submit">Adicionar</button>
      </form>
      
      {/* Lista de tarefas renderizadas */}
      <ul className='ListConteiner'>
        {lista.map(item => (
          // Para cada tarefa da lista, exibimos o componente Tarefa.
          // Usamos item._id pois o crudcrud gera esse campo automaticamente.
          <Tarefa key={item._id} texto={item.name}/>
        ))}
      </ul>

    </div>   
  )
}

export default App
// Exporta o componente App para ser usado no React.
