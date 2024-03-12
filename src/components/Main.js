import React, { Component } from "react";

import { FaPlus } from 'react-icons/fa'

import { FaEdit, FaWindowClose } from 'react-icons/fa'

import './Main.css'

export default class Main extends Component {
        state = {
            novaTarefa: '',
            tarefas: [],
        }

        componentDidMount(){
            const tarefas = JSON.parse(localStorage.getItem('tarefas'));

            if(!tarefas) return;

            this.setState({
                tarefas : [...tarefas]
            })

        }

        componentDidUpdate(PrevProps, prevState){
            const { tarefas } = this.state;

            if(tarefas === prevState.tarefas) return;

            localStorage.setItem('tarefas', JSON.stringify(tarefas))
        }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value
        })
    }

    handleSubmit = (e) => {
       e.preventDefault()
      const { tarefas, index } = this.state
      let { novaTarefa } = this.state
      novaTarefa = novaTarefa.trim()

      if(tarefas.indexOf(novaTarefa) !== -1) return

      const novasTarefas = [...tarefas];
        console.log(index)
      if(index === -1){
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: ''
            })
        }else{
            novasTarefas[index] = novaTarefa

            this.setState({
                tarefas : [...novasTarefas],
                index: -1,
            })
        }   

    }

    handleDelete = (e, index) => {
        e.preventDefault();
        const { tarefas } = this.state
        const novasTarefas = [...tarefas]
        novasTarefas.splice(index, 1)
        
        this.setState({
           tarefas: [...novasTarefas]
        })
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

                <form onSubmit={this.handleSubmit}  action="#" className="form">
                    <input onChange={this.handleChange} 
                           type="text"
                           value={novaTarefa}/>
                    <button type="submit">
                        <FaPlus />
                    </button>
                </form>

                <ul className="tarefas">
                    { tarefas.map((tarefa, index, tarefas) => (
                        <li key={tarefa}>
                            {tarefa}
                        <span>
                            <FaEdit onClick={(e) => this.handleEdit(e,index, tarefas)} className="edit"/>
                            <FaWindowClose onClick={(e) =>this.handleDelete(e,index)}  className="delete" />
                        </span>
                        </li>
                    )) 
                    }
                </ul>
            </div>
        )
    }
}