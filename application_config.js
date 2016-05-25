let environment = 'development';

if (process.env.NODE_ENV) {
  environment = process.env.NODE_ENV;
}

let config = {
  environment,
  awsKey: '',
  awsSecret: ''
};

switch (environment) {
  // extend the config object based on the environment
  case 'development':
    Object.assign(config, {
      awsBucket: '',
      postgresHost: 'localhost',
      postgresUser: '',
      postgresPassword: '',
      postgresDb: '',
      fbClientId: '',
      fbSecret: '',
      fbCallbackUrl: ''
    });
    break;
  case 'test':
    Object.assign(config, {
      awsBucket: '',
      postgresHost: '',
      postgresUser: '',
      postgresPassword: '',
      postgresDb: '',
      fbClientId: '',
      fbSecret: '',
      fbCallbackUrl: ''
    });
    break;
  case 'ci':
    Object.assign(config, {
      awsBucket: '',
      postgresHost: 'localhost',
      postgresUser: 'ubuntu',
      postgresPassword: '',
      postgresDb: 'circle_test',
      fbClientId: '',
      fbSecret: '',
      fbCallbackUrl: ''
    });
    break;
  case 'production':
    Object.assign(config, {
      awsBucket: '',
      postgresHost: '',
      postgresUser: '',
      postgresPassword: '',
      postgresDb: '',
      fbClientId: '',
      fbSecret: '',
      fbCallbackUrl: ''
    });
    break;
  default:
    throw new Error(`unknown environment: ${JSON.stringify({environment, NODE_ENV: process.env.NODE_ENV || ''})}`);
}

export default config;
