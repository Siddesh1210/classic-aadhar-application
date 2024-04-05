import React from 'react'
import ReactDOM from 'react-dom/client'
import appLayout from './App'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appLayout}/>
)
