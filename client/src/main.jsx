if (typeof global === "undefined") {
  window.global = window;
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.scss'

import { BrowserRouter } from 'react-router-dom'

import { StoreProvider } from './store'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'graphql',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
