import Navbar from './nav/Navbar' 
import './App.css'
import {createBrowserRouter, Outlet, RouterProvider, useParams} from 'react-router-dom';
import Home from './homepage/home';
import Format from './formatpage/Format';
import FormatVersion from './formatpage/FormatVerson';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Home />
      ),
    },
    {
      path: '/format',
      element: 
       <div>
         <Navbar />
         <Format />
       </div>,
    },
    {
      path: '/format/:id',
      element: 
       <div>
         <Navbar />
         <FormatVersion />
       </div>,
    },
    {
      path: '/about',
      element: 
       <div>
         <Navbar />
         <h1>About Us</h1>
       </div>,
    },
    

  ]);


  return (
    <>
      <RouterProvider router={router}/>
      
    </>
  )
}

export default App
