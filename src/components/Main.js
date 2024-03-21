import React, { Component} from "react";

import './Main.css'

import Form from "./Form";
import Tarefas from "./Tarefas";


export default class Main extends Component {
        state = {
            novaTarefa: '',
            tarefas: [],
        }

         async componentDidMount(){
            try{
                const response = await fetch('http://localhost:3001/tasks')
                
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados');
                  }
                   const jsonData = await response.json();
                   const tarefas = jsonData.map((tarefa) => {
                    return tarefa.tarefas
                   })
    
                   this.setState({
                    tarefas: [...tarefas]
                 })
    
            }catch(e){
                console.log(e)
            }
         }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value
        })
    }

    handleSubmit = async(e) => {
        e.preventDefault()
        let { novaTarefa } = this.state
        const url = 'http://localhost:3001/tasks'
        const dados = { tarefas: novaTarefa};

        if(!novaTarefa){
            return
        }

       try{
        const task = await fetch(`http://localhost:3001/tasks/${novaTarefa}`, {
            method: 'GET', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' // Tipo de conteúdo JSON
            },
        })

        const taskJson = await task.json()
        if(taskJson.ok){
            return;
        }
        const response = await fetch(url, {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' // Tipo de conteúdo JSON
            },
            body: JSON.stringify(dados) // Dados convertidos para JSON
        })

        if (!response.ok) {
            throw new Error('Falha ao enviar os dados');
        }
        this.setState({
            novaTarefa: ''
           })
       this.componentDidMount()
       
       }catch(e){
        console.log(e)
       }
    }

    handleDelete = async(e,index) => {
       const { tarefas } = this.state
       const deleteTask = tarefas[index]
       const url = `http://localhost:3001/tasks/${deleteTask}`
       try{
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            throw new Error('Falha ao enviar os dados');
        }

       this.componentDidMount()

       }catch(e){
        console.log('Erro:', e)
       }
    }

    handleEdit = (e, index) => {
        const { tarefas } = this.state

        this.setState({
            index,
            novaTarefa : tarefas[index],
        })

    }

    render(){

        const { novaTarefa, tarefas} = this.state
        return (
            <div className="main">
                <h1>Lista de tarefas</h1>

                <Form 
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />

                <Tarefas 
                    tarefas={tarefas} 
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
               
            </div>
        )
    }
}