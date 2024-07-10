import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { fadeInOut, INavbarData } from "./helper";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { navbarData } from "./nav-data";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { CookiesService } from "src/app/core/services/cookies/cookies.service";
import { AuthService } from "src/app/core/services/rest/auth.service";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  animations: [
    fadeInOut,
    trigger("rotate", [
      transition(":enter", [
        animate(
          "1000ms",
          keyframes([
            style({ transform: "rotate(0deg)", offset: "0" }),
            style({ transform: "rotate(2turn)", offset: "1" }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Input() navDatas: any;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData: any = [];
  multiple: boolean = false;

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(
    public router: Router,
    private readonly _cookiesService: CookiesService,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
    for (let nav of navbarData) {      
      if (nav.roles?.includes(this._authService.getRole())) {        
        this.navData.push(nav); 
      }
    }
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? "active" : "";
  }

  shrinkItems(item: INavbarData): void {
    if (item.label == "CERRAR SESIÓN") {
      this._cookiesService.eliminarCookieCierreFlujo();
    }

    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
