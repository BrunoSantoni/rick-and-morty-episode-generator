import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client/react';
import { client } from './services/apolloClient';

import './styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
