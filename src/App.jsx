import { useState, useEffect} from "react";

import { Tasks } from "./components/tasks";
import { Form } from "./components/form"
import { Input } from "./components/input";

import styles from "./styles/App.module.css"
import { useMemo } from "react";

const LOCALSTORAGE_TASKS_KEY = "todolist-tasks";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [searchTaskName, setSearchTaskName] = useState("");

  const onAddTask = (newTask) => {
    setTasks((state) => [...state, newTask]);
    setSearchTaskName("");
  }

  const onRemoveTask = (taskId) => {
    setTasks(state => state.filter(task => task.id != taskId));
    setSearchTaskName("");
  }

  const onChangeCompletedTask = (taskId) => {
    const indexTask = tasks.findIndex((task) => task.id == taskId);
    const updatedTask = [...tasks];
    updatedTask[indexTask].completed = !updatedTask[indexTask].completed;
    setTasks(updatedTask)
  }

  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const tasksLocal = localStorage.getItem(LOCALSTORAGE_TASKS_KEY);
    tasksLocal && setTasks(JSON.parse(tasksLocal));
    setIsLoading(false);
  }, [])
  
  const handlerTermSearch = (event) => {
    const termSearch = event.target.value.toLowerCase();
    setSearchTaskName(termSearch);
  }

  const totalTasks = useMemo(() => {
    return tasks.length;
  }, [tasks]);


  const totalCompletedTasks = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>TODOLIST</h1>
        
        <Form onSubmit={onAddTask}/>

        <hr />

        <Input 
          type="text"  
          value={searchTaskName}
          placeholder="Pesquisar tarefa" 
          onChange={handlerTermSearch} 
        />
        
        <Tasks 
          tasks={tasks} 
          searchTaskName={searchTaskName}
          onRemoveTaks={onRemoveTask}
          onChangeCompletedTask={onChangeCompletedTask}
        />
        
        <footer className={styles.footer}>
          <h6>
            Total de Tarefas: 
            <span>{totalTasks}</span>
          </h6>

          <h6>
            Total de Tarefas Concluidas: 
            <span>{totalCompletedTasks}</span>
          </h6>
        </footer>

      </div>
    </div>
  )
}
