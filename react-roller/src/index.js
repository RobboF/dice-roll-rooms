import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#01579B"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const httpLink = new HttpLink({
  uri: "http://graphql-engine:8080/v1alpha1/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://graphql-engine:8080/v1alpha1/graphql",
  options: {
    reconnect: true
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
    // uri: "http://robbo.xyz:8080/v1alpha1/graphql",
    link,
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: 'cors',
      headers: {
        "content-type": "application/json",
      }
    }
});
  

  ReactDOM.render(
    (<MuiThemeProvider  theme={theme}>
        <CssBaseline/>
      <ApolloProvider client={client}>
        <App style={{height: "100vh"}} />
      </ApolloProvider>
    </MuiThemeProvider>),
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
