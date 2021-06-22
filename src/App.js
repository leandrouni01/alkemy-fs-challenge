import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';

import Header from 'components/shared/Header';

import  { Provider } from 'react-redux';
import { initStore } from './redux/store';
import { AuthProvider } from "providers/AuthProvider";

const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
