import {ChangeDetectorRef, Component, HostListener, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../../core/services/storages/storage.service";
import {CookiesService} from "../../../core/services/cookies/cookies.service";
import {ModalGeneralService} from "../../../core/services/loadings/modal-general.service";
import {SocketService} from "../../../core/services/sockets/socket.service";
import {environment} from "../../../../environments/environment";

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    isSideNavCollapsed = false;
    screenWidth = 0;
    navData: any;

    constructor() {}

    ngOnInit() {
        console.log('Layaout compnent')
    }

    onToggleSideNav(data: SideNavToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }
}
