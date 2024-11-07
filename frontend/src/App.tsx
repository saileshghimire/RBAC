// import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Login } from './components/Login';
import { Register } from './components/Register';
import { CreateRole } from './components/role/CreateRole';
import { UpdateRole } from './components/role/UpdateRole';
import RoleList from './components/role/RoleList';
import { Log } from './components/log/Log';
import { SocketLog } from './components/log/SocketLog';





const router = createBrowserRouter([
  {
    path:'/',
    element:<Login></Login>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path:'/createrole',
    element:<CreateRole></CreateRole>
  },
  {
    path:'/updaterole/:id',
    element:<UpdateRole></UpdateRole>
  },
  {
    path:'/rolelist',
    element:<RoleList></RoleList>
  },
  {
    path:'/logs',
    element:<Log></Log>
  },
  {
    path:'/socketlog',
    element:<SocketLog></SocketLog>
  }
])


function App() {

  return (
    <main>
    <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
