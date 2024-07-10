import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "../rest/auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot | any,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data.data.expectedRoles as string[];
    
    for (const role of expectedRoles) {
      if (this.authService.hasRole(role)) {
        return true;
      }
    }

    // Redirigir a una página de acceso denegado o a la página de inicio de sesión
    // this.router.navigate(["access-denied"]);
    return false;
  }
}
