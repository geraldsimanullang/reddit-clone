import { ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginProvider } from "./contexts/LoginContext";

import client from "./config/apollo-client-config";
import StackHolder from "./stacks/StackHolder";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <LoginProvider>
          <StackHolder />
        </LoginProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
