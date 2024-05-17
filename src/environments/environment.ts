// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'https://192.168.100.12:3001', // casa
  // host: 'https://172.29.80.63:3000', // universidad
  pathApi: 'api-backoffice-chatbot',
  // permisosAzure: ['user.read','openid', 'profile'],
  permisosAzure: ['user.read','openid', 'profile'],
  urlInformacionUsuarioAzure: 'https://graph.microsoft.com/v1.0/me',
  clientId: 'f9460765-2e51-4f7a-97a0-a81164fb1aeb',
  tenantId: '682a4e6a-a77f-4958-a3ac-9e266d18aa37',
  urlMicrosoft: 'https://login.microsoftonline.com/',
  redirectUri: 'http://localhost:4200/inicio-sesion',
  // 172.29.80.63
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
