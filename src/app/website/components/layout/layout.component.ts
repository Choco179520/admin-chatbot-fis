import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
} from "@angular/core";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;
  navData: any;

  constructor() {}

  ngOnInit() {}

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
