import './App.css';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import { useUser } from './Components/Utils/UserContext';

function App() {  
  const { currentUser } = useUser();

  return (
    <div className="App">
      {currentUser ? (        
          <Layout />                            
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
