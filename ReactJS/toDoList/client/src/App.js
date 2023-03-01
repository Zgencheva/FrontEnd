import { Footer } from "./components/Footer.js";
import { Header } from "./components/Header.js";
import { ToDoList } from "./components/ToDoList.js";
import { AddTodo } from "./components/AddTodo.js";

function App() {
  return (
    <div>
      <Header/>
  <main className="main">

  <section className="todo-list-container">
        <h1>Todo List</h1>
  
      <AddTodo/>
      <ToDoList/>

      </section>
  </main>

    <Footer/>
    </div>
  );
}

export default App;
