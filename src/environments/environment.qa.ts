// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'https://localhost:3001', // casa
  pathApi: 'api-backoffice-chatbot',
  permisosAzure: ['user.read','openid', 'profile'],
  urlInformacionUsuarioAzure: 'https://graph.microsoft.com/v1.0/me',
  clientId: '2c490376-e431-46ea-82e0-0403c3589245',
  tenantId: '682a4e6a-a77f-4958-a3ac-9e266d18aa37',
  urlMicrosoft: 'https://login.microsoftonline.com/',
  redirectUri: 'http://localhost:4200/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
