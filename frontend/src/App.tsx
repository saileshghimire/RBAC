// import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Login } from './components/Login';
import { Register } from './components/Register';
import { CreateRole } from './components/role/CreateRole';




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
