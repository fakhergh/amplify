import React from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import { QueryClientProvider, QueryClient } from 'react-query';

import { TodoScreen } from './src/screens';

const client = new QueryClient();

const App: () => Node = () => {
  return (
    <QueryClientProvider client={client}>
      <TodoScreen />
    </QueryClientProvider>
  );
};

export default withAuthenticator(App);
