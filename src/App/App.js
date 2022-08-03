import React, { useState, useEffect } from 'react';
import './App.css';
import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import Header from "../components/Header";
import Employees from "../Employees/Employees";

import Axios from 'axios';

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
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
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

  const [memberId, setMemberID] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8000/api/get').then((response) => {
      console.log(response)
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:8000/api/insert", {
      memberID: memberId,
      name: name,
      weight: weight,
      height: height,
      age: age,
      gender: gender,
    }).then(() => {
      alert("Member inserted");
    });
  };

  return (

    <div className="App">
      <h1>APPLICATION</h1>
      <div className='form'>
      
        <label>ID</label>
        <input
          type="text"
          name="memberID"
          onChange={(e) => {
            setMemberID(e.target.value);
          }}
        />

        <label>NAME</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label>WEIGHT</label>
        <input
          type="text"
          name="weight"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />

        <label>HEIGHT</label>
        <input
          type="text"
          name="height"
          onChange={(e) => {
            setHeight(e.target.value);
          }}
        />

        <label>AGE</label>
        <input
          type="text"
          name="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />

        <label>GENDER</label>
        <input
          type="text"
          name="gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {memberList.map((val) => {
          return (
            <h1>
              MemberID: {val.memberID} | Name: {val.name}
            </h1>
          );
        })}

      </div>
    </div>
    // <ThemeProvider theme={theme}>
    //   <SideMenu />
    //   <div className={classes.appMain}>
    //     <Header />

    //     <Employees />
    //   </div>
    //   <CssBaseline />
    // </ThemeProvider>
  );
}

export default App;