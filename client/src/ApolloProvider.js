import React from "react";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";


const httpLink = createHttpLink({ uri: "http://localhost:5001" });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)