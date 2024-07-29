// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // host: 'https://192.168.100.12:3001', // casa
  host: 'https://localhost:3005', // casa
  // host: 'https://backend-chatbot-fis.hoptech.dev',
  pathApi: 'api-backoffice-chatbot',
  permisosAzure: ['user.read','openid', 'profile'],
  urlInformacionUsuarioAzure: 'https://graph.microsoft.com/v1.0/me',
  clientId: 'c8041c50-c2db-4333-bb8d-48d74dbd8aae',
  tenantId: 'f9366d2a-35c5-4e3c-834a-60d607325ecb',
  urlMicrosoft: 'https://login.microsoftonline.com/',
  redirectUri: 'http://localhost:4200/menu',
  // 172.29.80.63
};

// Valor: 9gm8Q~PTKzljM5Y5XXB5QO~zPM3qkaA7K4677bD0
// Id. de secreto: 6ce30f05-5377-422a-8d4e-2b00c704a30a

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
