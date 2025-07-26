import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorites from './components/favorites';
import Recipe from './components/Recipe';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Home /></>
    },
    {
      path: '/recipes',
      element: <><Navbar /><Recipe /></>
    },

    {
      path: '/favorites',
      element: <><Navbar /><Favorites /></>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
