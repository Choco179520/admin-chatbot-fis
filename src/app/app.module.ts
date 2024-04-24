import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared/shared.module';
import { MSAL_INSTANCE, MsalModule } from '@azure/msal-angular';
import { MODULOS_AZURE } from './core/msal/azure-AD.config';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: environment.redirectUri,
      authority: `${environment.urlMicrosoft}${environment.tenantId}`, // 'https://login.microsoftonline.com/' + 'f8733e19-5615-4258-907e-cb8c982ffc34',
    },
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModule,
    MsalModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    ...MODULOS_AZURE,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
