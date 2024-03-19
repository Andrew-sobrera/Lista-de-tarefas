import React from "react";

import { FaEdit, FaWindowClose } from 'react-icons/fa'
import './Tarefas.css'


export default function Tarefas({ tarefas, handleEdit, handleDelete })
{
    return(
        <ul className="tarefas">
        { tarefas.map((tarefa, index, tarefas) => (
            <li key={tarefa}>
                {tarefa}
            <span>
                <FaEdit onClick={(e) => handleEdit(e,index, tarefas)} className="edit"/>
                <FaWindowClose onClick={(e) =>handleDelete(e,index)}  className="delete" />
            </span>
            </li>
        )) 
        }
    </ul>
    )
}