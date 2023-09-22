import { useRef, useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [todoList, setTodoList] = useState([]);

  const inputRef = useRef(null);

  const addNewTodo = (e) => {
    if(!e.target.value) return;
    if (e.code === "Enter") {
      setTodoList([...todoList, e.target.value]);
      e.target.value = "";
    }
  };

  const deleteTodo = (index) => {
    const temp = todoList;
    temp.splice(index, 1);
    setTodoList([...temp]);
  };

  const handleClick = () => {
    if(!inputRef.current.value) return;
    setTodoList([...todoList, inputRef.current.value]);
    inputRef.current.value="";
  }

  return (
    <div>
      <div className="page-container">
        <h1 className="title-text">🧾 Todo Webapp</h1>
        <div className="todo-card">
          <div className="todo-card-header">
            <input
              placeholder="Press Enter to Add Todo ..."
              type="text"
              className="todo-input"
              onKeyDown={addNewTodo}
              ref={inputRef}
            />
            <button className="send-btn" onClick={handleClick}>Add</button>
          </div>
          <div className="todo-card-body">
            <AnimatePresence mode="popLayout">
              {todoList.length ? (
                todoList.map((todo, index) => {
                  return (
                    <motion.div
                      key={todo}
                      className="todo-item"
                      layout
                      initial={{ opacity: 0, x: -400, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 200, scale: 1.2 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <h3>
                        {index + 1}. {todo}
                      </h3>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          deleteTodo(index);
                        }}
                      >
                        &times;
                      </button>
                    </motion.div>
                  );
                })
              ) : (
                <h1 className="empty-message"> 🙁 No Todos Here to Display</h1>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
