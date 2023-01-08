import {FaTrashAlt} from "react-icons/fa"
import styles from "./index.module.css"

export function Task({id, name, completed, onRemove, onChangeCompleted}) {
  return (
    <li className={`${styles.task} ${completed ? styles.completed : ""}`}> 
        <input 
          className={styles.task__checkbox} 
          type="checkbox"
          checked={completed}
          onChange={(event) => onChangeCompleted(id)}
        />
        
        <span className={styles.task__name}>
          {name}
        </span>

        <button 
          type="button" 
          className={styles.task__button} 
          onClick={() => onRemove(id)}> 
          <FaTrashAlt size={18}/> 
        </button>
    </li>
  )
}
