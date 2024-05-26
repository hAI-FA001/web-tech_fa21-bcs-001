import { useState } from "react";

const Todos = () => {
    // initial value passed to useState can be anything
    const [todos, setTodos] = useState(["Apple", "Mango", "Mango Juice", "Mango Shake", "Grape"]);
    const [todoAdd, setTodoAdd] = useState("");
    
    return (
        <div style={{margin: "10px auto", display: "flex", flexDirection: "column", width: "50%", justifyContent: "center"}}>
            <button onClick={(event) => {
                // always make copy/clone, good practice
                let todosCopy = [...todos];
                todosCopy.sort();
                setTodos(todosCopy);
            }}>Sort Todos</button>
            <ul style={{margin: "0 30px", marginTop: 10, padding: "0 10px", width: "100%"}}>
                {todos.map((t, idx) => 
                <li style={{width: "100%", marginBottom: 15, paddingBottom: 5, borderBottom: "1px solid black", display: "flex", justifyContent: "space-between"}}>{t}
                <button onClick={(event) => {
                    // much easier to do this than create a separate onDelete variable
                    let todosCopy = [...todos];
                    todosCopy.splice(idx, 1);
                    setTodos(todosCopy);
                }}>Delete</button>
                </li>)}
            </ul>
            <div style={{textAlign: "center"}}>
                <input type="text" value={todoAdd} onChange={(event) => {
                    // this is controlled input field (because we use state variables etc)
                    let text = document.getElementsByTagName("input")[0].value;
                    setTodoAdd(text);
                }} style={{display: "inline"}} />
                <button disabled={!Boolean(todoAdd)} style={{display: "inline"}} onClick={(event) => {
                    let todosCopy = [...todos];
                    let text = document.getElementsByTagName("input")[0].value;
                    todosCopy.push(text);
                    setTodos(todosCopy);
                }}>Add Todo</button>
            </div>
        </div>
    );
};

export default Todos;
