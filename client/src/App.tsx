import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Auth from "./utils/auth";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
});

type AuthContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
     
      <div className="p-2">
        <Outlet context={[loggedIn, setLoggedIn] satisfies AuthContextType} />
      </div>
    </ApolloProvider>
  );
}

export function useLoggedIn() {
  return useOutletContext<AuthContextType>();
}

export default App;
