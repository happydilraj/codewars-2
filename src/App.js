import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './Components/Main';
import Leaderboard from './Components/Leaderboard';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/Main" element={<Main/>}/>
          <Route exact path='/Leaderboard' element={<Leaderboard/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
