import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';

import Header from 'components/shared/Header';

import  { Provider } from 'react-redux';
import { initStore } from './store';

const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
