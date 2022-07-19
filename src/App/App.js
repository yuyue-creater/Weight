// import React, { useState, useRef, useEffect, useInsertionEffect } from 'react';
// import TodoList from './TodoList'
// import { v4 as uuidv4 } from 'uuid';
// import ReactDOM from 'react-dom';
// import Category from './Category';
// import useLocalStorage from './useLocalStorage';
// import Form1 from './Form1';
// import Datetime from './Datetime';
// import Card from './Card';
// import BasicTable from './BasicTable';
// import SortingTable from './SortingTable';
// import SortedTable from './SortingTable';
// import Modal from "./component/Modal";
// import SideMenu from "./components/SideMenu";
// import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
// import Header from "./components/Header";
// import PageHeader from './components/PageHeader';
// import "./App.css"

// import Employees from "./Employees/Employees";
// import { ProductListMember } from './component/productListMember/ProductListMember';
// import AddMember from './AddMember';


// const LOCAL_STORAGE_KEY = 'todoApp.todos'
// const welcome = { greeting: 'Hey', title: 'World' };
// const title = 'React';

// function App() {
//   // UseState returns an array
//   let [value, setValue] = useLocalStorage('name', '');


//   const [todos, setTodos] = useState([])
//   const todoNameRef = useRef()
//   useEffect(() => {
//     const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
//     if (storedTodos) setTodos(storedTodos)
//   }, [])

//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
//   }, [todos])

//   function toggleTodo(id) {
//     const newTodos = [...todos]
//     const todo = newTodos.find(todo => todo.id === id)
//     todo.complete = !todo.complete
//     setTodos(newTodos)
//   }

//   function handleAddTodo(e) {
//     const name = todoNameRef.current.value

//     if (name === 'run' || name === 'eaten' || name === 'push ups' || name === "biking") {
//       setTodos(prevTodos => {
//         return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
//       })

//     }
//     todoNameRef.current.value = null
//   }

//   function handleClearTodos() {
//     const newTodos = todos.filter(todo => !todo.complete)
//     setTodos(newTodos)
//   }

//   function Button() {
//     const [counter, setCounter] = useState(5);
//     return <button onClick={() => setCounter(counter * 2)}>{counter}</button>;
//   }

//   function displayTime() {
//     const date = new Date();
//     const n = date.toDateString();
//     const time = date.toLocalTimeString();
//     console.log('Date: ' + n);
//     console.log('Time: ' + time);
//   }

//   function sumValues() {
//     const eaten = Number(document.getElementById('txtnum1').value);
//     const running = Number(document.getElementById('txtnum2').value);
//     const push_ups = Number(document.getElementById('txtnum3').value);
//     const biking = Number(document.getElementById('txtnum4').value);
//     const calories_lost = Number(100 * running + 0.5 * push_ups + 80 * biking);
//     const res = Number(eaten - calories_lost)
//     document.getElementById('txtres').value = res;
//   }



//   //  return (
//   //    <>
//   //     <input
//   //     type="text"
//   //     onChange={(event) => setValue(event.target.value)}
//   //     value = {value}
//   //     />

//   //     <Form1/>
//   //     <h1> Hello {title}</h1>
//   //     <h1>{welcome.greeting} {welcome.title}</h1>
//   //     <h1> Intro To Body Management Events</h1>
//   //     <h1>Today is <Datetime/></h1>

//   //     <Category/>
//   //     <div>Enter your activies: Run, Eaten, or Push Ups </div>
//   //      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
//   //      <input ref={todoNameRef} type="text" />
//   //      <button onClick = {handleAddTodo}> Add Event </button>
//   //      <button onClick = {handleClearTodos}> Clear Completed Event</button>
//   //      <div>{todos.filter(todo => !todo.complete).length} events listed</div>

//   //      Eaten <input type="text" id = "txtnum1"/>
//   //      <h1>How much eaten?</h1>
//   //      <br></br>
//   //      Running <input type="text" id = "txtnum2"/>
//   //      <h1>How many KM Ran?</h1>
//   //      <br></br>
//   //      Push Ups <input type="text" id = "txtnum3"/>
//   //      <h1>How Many Push Ups?</h1>
//   //      <br></br>
//   //      Biking <input type="text" id = "txtnum4"/>
//   //      <h1>How many miles Biked</h1>
//   //      <br></br>
//   //      Change in calories:<input type="text" id = "txtres"/>
//   //      <input type="button" value="Calculate" onClick={sumValues}/>
//   //    </>
//   //  );


//   const [users, setUsers] = useState([
//     { id: 1, Name: 'Michael', Weight: 72.85, Age: 21, Height: 1.73 },
//     { id: 2, Name: 'Fat Shark', Weight: 88.80, Age: 49, Height: 1.73 },
//     { id: 3, Name: 'ZQY', Weight: 50, Age: 49, Height: 1.65 },

//   ]);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Name",
//         accessor: "name" // accessor is the "key" in the data
//       },
//       {
//         Header: "Weight (kg)",
//         accessor: "weight"
//       },
//       {
//         Header: "Age",
//         accessor: "age"
//       },
//       {
//         Header: "Height (m)",
//         accessor: "height"
//       }
//     ],
//     []
//   );
//   const data = React.useMemo(
//     () => [
//       {
//         name: "Michael",
//         weight: 72.85,
//         age: 21,
//         height: 173
//       },
//       {
//         name: "Fat Shark",
//         weight: 88.80,
//         age: 49,
//         height: 173
//       },
//       {
//         name: "ZQY",
//         weight: 50,
//         age: 49,
//         height: 162
//       }
//     ],
//     []
//   );

//   const [products, setProducts] = useState([]);

//   const addProduct = member => {
//     setProducts([...products, member]);
//     alert("member added successfully")
//   }

//   const [modalOpen, setModalOpen] = useState(false);

 
//   return (
//     <div>
//       <SortedTable columns={columns} data={data} />


//       <h1>Click the button to add a new member</h1>
//       <button
//         className="openModalBtn"
//         onClick={() => {
//           setModalOpen(true);
//         }}
//       >
//         Add member
//       </button>

//       {modalOpen && <Modal setOpenModal={setModalOpen} />}
//     </div>


//     // <div className="container">
//     //         <h3 className="p-3 text-center">Current members in account</h3>
//     //         <table className="table table-striped table-bordered">
//     //             <thead>
//     //                 <tr>
//     //                     <th>Name</th>
//     //                     <th>Weight</th>
//     //                     <th>Age</th>
//     //                     <th>Height</th>
//     //                 </tr>
//     //             </thead>
//     //             <tbody>
//     //                 {users && users.map(user =>
//     //                     <tr key={user.id}>
//     //                         <td>{user.Name}</td>
//     //                         <td>{user.Weight}</td>
//     //                         <td>{user.Height}</td>
//     //                         <td>{user.Age}</td>
//     //                     </tr>
//     //                 )}
//     //             </tbody>
//     //         </table>
//     //         <input type="button" value="Add new Member" />
//     //     </div>

//   );

// }
// export default App;

import React from 'react';
import './App.css';
import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import Header from "../components/Header";
import Employees from "../Employees/Employees";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;