import { ApolloProvider } from "@apollo/client";
import { LoginProvider } from "./contexts/LoginContext";

import client from "./config/apollo-client-config";
import StackHolder from "./stacks/StackHolder";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <StackHolder />
      </LoginProvider>
    </ApolloProvider>
  );
}
