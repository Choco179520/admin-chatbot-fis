// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // host: 'https://192.168.100.12:3001', // casa
  host: 'https://localhost:3001', // casa
  // host: 'https://172.29.80.63:3000', // universidad
  pathApi: 'api-backoffice-chatbot',
  permisosAzure: ['user.read','openid', 'profile'],
  urlInformacionUsuarioAzure: 'https://graph.microsoft.com/v1.0/me',
  clientId: '2c490376-e431-46ea-82e0-0403c3589245',
  tenantId: '682a4e6a-a77f-4958-a3ac-9e266d18aa37',
  urlMicrosoft: 'https://login.microsoftonline.com/',
  redirectUri: 'http://localhost:4200/inicio-sesion',
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
