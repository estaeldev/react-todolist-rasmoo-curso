import {FaPlus} from "react-icons/fa"
import { useState } from "react";
import {v4 as uuid} from "uuid"
import { Input } from "../input";

import styles from "./index.module.css"

export function Form({onSubmit}) {
    const [taskName, setTaskName] = useState("");  

    const handlerSubmit = (event) => {
        event.preventDefault();
        if(!!taskName){
            const newTask = {
                id: uuid(),
                name: taskName,
                completed: false
            }
            onSubmit(newTask);
            setTaskName("");
        }
    }
    
    return (
        <form className={styles.form} onSubmit={handlerSubmit}>
           <Input 
                type="text" 
                value={taskName} 
                placeholder="Nome da tarefa" 
                onChange={event => setTaskName(event.target.value)}
            />

          <button 
            className={styles.form__button} 
            type="submit" 
            disabled={taskName == ""}>
            <FaPlus size={11}/>
            Adicionar
          </button>

        </form>
    )

}

