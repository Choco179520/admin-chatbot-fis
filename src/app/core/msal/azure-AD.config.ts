import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
  Configuration,
} from '@azure/msal-browser';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
const configuracioAzure: Configuration = {
  auth: {
    clientId: environment.clientId,
    redirectUri: environment.redirectUri,
    authority: `${environment.urlMicrosoft}${environment.tenantId}`, // 'https://login.microsoftonline.com/' + 'f8733e19-5615-4258-907e-cb8c982ffc34',
    postLogoutRedirectUri: environment.redirectUri,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE,
  },
  system: {
    loggerOptions: {
      // loggerCallback,
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(configuracioAzure);
}

function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    environment.urlInformacionUsuarioAzure,
    environment.permisosAzure
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: environment.permisosAzure,
    },
    loginFailedRoute: '/inicio-sesion',
  };
}

export const MODULOS_AZURE = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  },
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory,
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: MSALGuardConfigFactory,
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory,
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService,
];
