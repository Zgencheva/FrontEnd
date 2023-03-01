import { useEffect, useState } from "react";
import { ToDoItem } from "./TodoItem.js";

export const ToDoList = () => {

  const [todolist, setTodoList] = useState([]);

  useEffect(() =>{
      fetch('http://localhost:3030/jsonstore/tododo')
      .then(res=> res.json())
      .then(result=> {
          setTodoList(Object.values(result))
      })
  },[]);

  const onTodoClickHandler = (todo)=> {
      fetch(`http://localhost:3030/jsonstore/tododo/${todo._id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({...todo, isCompleted: !todo.isCompleted})
      })
      .then(res=> res.json())
      .then(modifiedTodo => {
        setTodoList(oldTodos=> oldTodos.map(todo => todo._id == modifiedTodo._id ? modifiedTodo : todo));
      })
    // setTodoList(oldTodos=> oldTodos.map(x=> x._id == todoId ? {...x, isCompleted: !x.isCompleted}: x))
  }

    return (
      <div className="table-wrapper">
       <table className="table">
        <thead>
          <tr>
            <th className="table-header-task">Task</th>
            <th className="table-header-status">Status</th>
            <th className="table-header-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {todolist.map(todo=> <ToDoItem key={todo._id} {...todo} onClick={onTodoClickHandler}/>)}
        </tbody>
      </table>
      </div>
    );
}