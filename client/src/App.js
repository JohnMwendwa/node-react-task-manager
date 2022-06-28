import Signup from "./components/Signup";
import Login from "./components/Login";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
