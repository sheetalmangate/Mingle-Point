import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import {App} from './App';
import './index.css';

// Mock function to get token, replace with actual implementation
const getToken = async () => {
  // Simulate an async token fetch
  return localStorage.getItem('token');
};

// Create an HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext(async (_, { headers = {} }: { headers?: Record<string, string> }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// Create a WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3001/graphql',
  connectionParams: async () => {
    const token = await getToken(); 
    return {
      Authorization: `Bearer ${token}`,
    };
  },
}));

// Split links based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

// Apollo Client setup
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);