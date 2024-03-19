import React from "react";
import propTypes from 'prop-types'

import { FaPlus } from 'react-icons/fa'
import './Form.css'


export default function Form({ handleChange, handleSubmit, novaTarefa })
{
    return(
        <form onSubmit={handleSubmit}  action="#" className="form">
        <input onChange={handleChange} 
               type="text"
               value={novaTarefa}/>
        <button type="submit">
            <FaPlus />
        </button>
    </form>
    )
}

Form.propTypes = {
    handleChange: propTypes.func.isRequired,
    handleSubmit: propTypes.func.isRequired,
    novaTarefa: propTypes.string.isRequired
}