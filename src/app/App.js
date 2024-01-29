import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './page';
import Login from '@/app/auth/login/page';
import ViewLibretto from '@/app/GestioneLibretto/VisualizzaLibretto/page';
import ViewAppelli from '@/app/GestioneAppelli/VisualizzaAppelli/page';
//import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      {/*<Routes>
        <Route path='/' element ={<Home />}>
          <Route path = 'login' element={<Login />} />
          <Route path = 'GestioneLibretto/VisualizzaLibretto' element={ViewLibretto}/>
          <Route path = 'GestioneAppelli/VisualizzaAppelli' element = {ViewAppelli} />
        </Route>
  </Routes>*/}
      <Switch>
        <Route path ="/" component = {Home} element = {Home}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App />);