import React,{useState} from 'react';
import { Router } from '@reach/router'
import './App.css';
import Dashboard from './component/Dashboard';
import List from './component/List';
import Wrapper from './component/Wrapper';
import Add from './component/Add';
import AddBig from './component/AddBig';
import BigContext from './component/BigContext';

function App() {
  const [state, setState] = useState({})
  const [board, setBoard] = useState(0)
  const [refresh, setRefresh] = useState(false)
  return (
    <div>
      <Router>
        <Wrapper path="/" />
   
        </Router>
        <BigContext.Provider value={{ state, setState, refresh, setRefresh, board, setBoard }}>
        <Router>
        <Dashboard path="/dashboard" />
        <List path="/list" />
        <Add path ="/addtask"/>
        <AddBig path ="/addboard"/>
        </Router>
        </BigContext.Provider>
    

    </div>
  );
}

export default App;
