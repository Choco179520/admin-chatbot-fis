import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {EncriptadoService} from '../encriptacion/encriptacion-aes.service';

@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {
    constructor(
        private readonly _encriptadoService: EncriptadoService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.body) {
                    const decryptedData = this._encriptadoService.desencriptarInformacionResponse(event.body.d);
                    event = event.clone({body: JSON.parse(decryptedData)});
                }
                return event;
            }),
        );
    }
}
