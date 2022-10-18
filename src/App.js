import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:3001/todos", {
      description,
      isCompleted: false,
    });
    alert(data.description + "이 추가되었습니다.");
    window.location.reload();
    setDescription("");
  };
  const readList = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodoList(data);
  };
  useEffect(() => {
    (async () => {
      await readList();
    })();
  }, []);
  const toggleCompleteBtn = async (id, isCompleted) => {
    await axios.patch(`http://localhost:3001/todos/${id}`, {
      isCompleted: !isCompleted,
    });
    await readList();
  };
  const deleteTodoBtn = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    await readList();
  };
  return (
    <div className="homepage__container">
      <div className="NavContain">
        <div className="left__Contain">
          <div className="todoListNav"> Todo List </div>
          <div className="todoListNavSub">What's up for today</div>
        </div>
      </div>
      <div>
        <form className="todoapp__inputbox">
          <input
            className="todoapp__inputbox-inp"
            name="todoItem"
            placeholder="할 일을 입력해주세요"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="todoapp__inputbox-add-btn"
            onClick={handleSubmit}
          >
            Add
          </button>
        </form>
        <br />
        <h2>할 일 목록</h2>
        <ul>
          {todoList?.map((todo) => (
            <div key={todo.id} className="todoapp__item">
              <li
                key={todo.id}
                className={todo.isCompleted ? "setFin" : "setIng"}
              >
                {todo.description}
              </li>
              <div className="todoBtn">
                <button
                  className="todoapp__item-edit-btn"
                  onClick={() => toggleCompleteBtn(todo.id, todo.isCompleted)}
                >
                  {todo.isCompleted ? "Fin" : "Ing"}
                </button>
                <button
                  className="todoapp__item-delete-btn"
                  onClick={() => deleteTodoBtn(todo.id)}
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
