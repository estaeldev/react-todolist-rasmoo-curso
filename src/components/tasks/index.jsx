import { useMemo } from "react";

import { BoxAlert } from "../boxalert";
import { Task } from "../terefa"

import styles from "./index.module.css"

export function Tasks({tasks, searchTaskName, onRemoveTaks, onChangeCompletedTask}) {

  const isVisibleTask = (task) => {
    const taskName = task.name.toLowerCase();
    return taskName.includes(searchTaskName);
  }

  const stateTasks = useMemo(() => {
    if(tasks.length == 0) {
      return "empty";
    } else if(!tasks.some(task => isVisibleTask(task))) {
      return "search-empty";
    }
    return "default";
    
  }, [tasks, searchTaskName])

  if(stateTasks == "empty") {
    return <BoxAlert type={stateTasks} />
  }

  if(stateTasks == "search-empty") {
    return <BoxAlert type={"warning"} />
  }

  return (
    <ul className={styles.tasks}> 
      {tasks.map(taks => isVisibleTask(taks) && (
        <Task 
          {...taks}
          key={taks.id} 
          onRemove={onRemoveTaks}
          onChangeCompleted={onChangeCompletedTask}
        />
      ))}
    </ul>
  )
}
