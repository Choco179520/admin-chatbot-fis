import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { AuthService } from "../services/rest/auth.service";

@Directive({
  selector: "[appDisableForRoles]",
})
export class DisableForRolesDirective {
  @Input("appDisableForRoles") roles!: string[] | any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userRole = this.authService.getRole();
    if (this.roles && this.roles.includes(userRole)) {
      this.renderer.setAttribute(this.el.nativeElement, "disabled", "true");
    }
  }
}
