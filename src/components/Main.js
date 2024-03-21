import React, { Component} from "react";
import dotenv from 'dotenv';


import './Main.css'

import Form from "./Form";
import Tarefas from "./Tarefas";
dotenv.config();


export default class Main extends Component {
        state = {
            novaTarefa: '',
            tarefas: [],
        }

         async componentDidMount(){
            try{
                const apiUrl = process.env.API_URL
                const response = await fetch(`${apiUrl}/tasks`)
                
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
        const apiUrl = process.env.API_URL
        const url = `${apiUrl}/tasks`
        const dados = { tarefas: novaTarefa};

        if(!novaTarefa){
            return
        }

       try{
        const apiUrl = process.env.API_URL
        const task = await fetch(`${apiUrl}/tasks/${novaTarefa}`, {
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
       const apiUrl = process.env.API_URL
       const url = `${apiUrl}/${deleteTask}`
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