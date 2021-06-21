import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';

import Header from 'components/shared/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
