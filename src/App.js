import React, { useState , useRef , useEffect, useInsertionEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import Category from './Category';
import useLocalStorage from './useLocalStorage';
import Form1 from './Form1';
import Datetime from './Datetime';
import Card from './Card';


const LOCAL_STORAGE_KEY = 'todoApp.todos'
const welcome = {greeting: 'Hey', title:'World'};
const title = 'React';
 
function App() {
 // UseState returns an array
 let [value, setValue] = useLocalStorage('name', '');

 
 const [todos, setTodos] = useState([])
 const todoNameRef = useRef()
  useEffect(() => {
   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
   if (storedTodos) setTodos(storedTodos)
 }, [])
 
 useEffect(() => {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
 }, [todos])
 
 function toggleTodo(id) {
   const newTodos = [...todos]
   const todo = newTodos.find(todo => todo.id === id)
   todo.complete = !todo.complete
   setTodos(newTodos)
 }
 
 function handleAddTodo(e) {
   const name = todoNameRef.current.value
   
   if (name === 'run' || name === 'eaten' || name === 'push ups' || name === "biking") {
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })

   }
   todoNameRef.current.value = null
 }
 
 function handleClearTodos() {
   const newTodos = todos.filter(todo => !todo.complete)
   setTodos(newTodos)
 }

 function Button() {
	const [counter, setCounter] = useState(5);
	return <button onClick={() => setCounter(counter*2)}>{counter}</button>;
}

function displayTime() {
  const date = new Date();
  const n = date.toDateString();
  const time = date.toLocalTimeString();
  console.log('Date: ' + n);
  console.log('Time: ' + time);
}

function sumValues(){
  const eaten = Number(document.getElementById('txtnum1').value);
  const running = Number(document.getElementById('txtnum2').value);
  const push_ups = Number(document.getElementById('txtnum3').value);
  const biking = Number(document.getElementById('txtnum4').value);
  const calories_lost = Number(100*running + 0.5*push_ups + 80*biking);
  const res = Number(eaten - calories_lost)
  document.getElementById('txtres').value = res;
}

return (
  <div className="App">
    <Card/>
  </div>
);
//  return (
//    <>
//     <input
//     type="text"
//     onChange={(event) => setValue(event.target.value)}
//     value = {value}
//     />

//     <Form1/>
//     <h1> Hello {title}</h1>
//     <h1>{welcome.greeting} {welcome.title}</h1>
//     <h1> Intro To Body Management Events</h1>
//     <h1>Today is <Datetime/></h1>
    
//     <Category/>
//     <div>Enter your activies: Run, Eaten, or Push Ups </div>
//      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
//      <input ref={todoNameRef} type="text" />
//      <button onClick = {handleAddTodo}> Add Event </button>
//      <button onClick = {handleClearTodos}> Clear Completed Event</button>
//      <div>{todos.filter(todo => !todo.complete).length} events listed</div>

//      Eaten <input type="text" id = "txtnum1"/>
//      <h1>How much eaten?</h1>
//      <br></br>
//      Running <input type="text" id = "txtnum2"/>
//      <h1>How many KM Ran?</h1>
//      <br></br>
//      Push Ups <input type="text" id = "txtnum3"/>
//      <h1>How Many Push Ups?</h1>
//      <br></br>
//      Biking <input type="text" id = "txtnum4"/>
//      <h1>How many miles Biked</h1>
//      <br></br>
//      Change in calories:<input type="text" id = "txtres"/>
//      <input type="button" value="Calculate" onClick={sumValues}/>
//    </>
//  );
}
export default App;
