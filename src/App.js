import React,{useState} from 'react';
import './assets/css/app.scss';
import 'antd/dist/antd.css';


// import {fetchUsers} from '@/utils/api';
import {Layout,Login} from '@/components';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@/store';

function App() {
  let [token,setToken] = useState(localStorage.getItem('token'));
  function onLogin(){
    setToken(localStorage.getItem('token'));
  }
  return (
    <HashRouter>
      <Provider store={store}>
        {token?<Layout />:<Login onLogin={onLogin}/>}  
      </Provider>
    </HashRouter>
  );
}

export default App;
