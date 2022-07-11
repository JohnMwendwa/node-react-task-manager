import Signup from "./components/Signup";
import Login from "./components/Login";
import {Route, Routes} from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import { TaskContextProvider } from "./contexts/TaskContext";

function App() {
  return (
    <div className="App">
      
      <Routes>       
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <TaskContextProvider>
                <Dashboard />
          </TaskContextProvider>
        } />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
