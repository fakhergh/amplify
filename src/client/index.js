import { Auth } from 'aws-amplify';
import AwsAppSyncClient from 'aws-appsync';

import amplifyConfig from '../aws-exports';

export const appSyncClient = new AwsAppSyncClient({
  url: amplifyConfig.aws_appsync_graphqlEndpoint,
  region: amplifyConfig.aws_appsync_region,
  auth: {
    type: amplifyConfig.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  disableOffline: true,
});
