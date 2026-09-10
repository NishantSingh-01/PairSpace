import './App.css'
import Login from './pages/auth/login'
import Register from './pages/auth/Register'
import NotFound from './pages/NotFound'


const App = () => {
  return (
    //  <div className="bg-gray-600">App</div>
    <>
    <NotFound/>
    <Login/>
    <Register/>
    </>
    
  )
}

export default App