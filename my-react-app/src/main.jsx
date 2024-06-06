import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './Landing.jsx'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import Profile from './Profile.jsx';
import Analytics from './Analytics.jsx';
import Tasks from './Tasks.jsx';
import TaskModal from './TaskModal.jsx';
import ModalPage from './Modal.jsx';
import { useNavigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/taskmodal",
    element: <TaskModal />,
  },
  {
    path: "/fakemodal",
    element: <ModalPage />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
