import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {fadeInOut, INavbarData} from './helper';

@Component({
    selector: 'app-sublevel-menu',
    template: `
        <ul *ngIf="collapsed && data.hijos && data.hijos.length > 0"
            [@submenu]="expanded
      ? {value: 'visible', 
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
      : {value: 'hidden', 
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}"
            class="sublevel-nav"
        >
            <li *ngFor="let item of data.hijos" class="sublevel-nav-item">
                <a class="sublevel-nav-link"
                   (click)="handleClick(item)"
                   *ngIf="item.hijos && item.hijos.length > 0"
                   [ngClass]="getActiveClass(item)"
                >
                    <i class="sublevel-link-icon fa fa-circle"></i>
                    <span class="sublevel-link-text" @fadeInOut
                          *ngIf="collapsed">{{item.nombre}}</span>
                    <i *ngIf="item.hijos && collapsed" class="menu-collapse-icon"
                       [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"
                    ></i>
                </a>
                <a class="sublevel-nav-link"
                   *ngIf="!item.hijos || (item.hijos && item.hijos.length === 0)"
                   [routerLink]="[item.routeLink]"
                   routerLinkActive="active-sublevel"
                   [routerLinkActiveOptions]="{exact: true}"
                   (click)="navegate(item)"
                >
                    <i class="sublevel-link-icon fa fa-circle"></i>
                    <span class="sublevel-link-text" @fadeInOut
                          *ngIf="collapsed">{{item.nombre}}</span>
                </a>
                <!--                <div *ngIf="item.items && item.items.length > 0">-->
                <!--                    <app-sublevel-menu-->
                <!--                            [data]="item"-->
                <!--                            [collapsed]="collapsed"-->
                <!--                            [multiple]="multiple"-->
                <!--                            [expanded]="item.expanded"-->
                <!--                    ></app-sublevel-menu>-->
                <!--                </div>-->
            </li>
        </ul>
    `,
    styleUrls: ['./sidenav.component.scss'],
    animations: [
        fadeInOut,
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({overflow: 'hidden'}),
                animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ]
})
export class SublevelMenuComponent implements OnInit {

    private _router = inject(Router);

    @Output() toggleEvent = new EventEmitter<boolean>;

    @Input() data: INavbarData | any = {
        routeLink: '',
        icon: '',
        label: '',
        items: []
    }
    @Input() collapsed = false;
    @Input() animating: boolean | undefined;
    @Input() expanded: boolean | undefined;
    @Input() multiple: boolean = false;

    constructor(public router: Router) {
    }

    ngOnInit(): void {
    }

    handleClick(item: any): void {
        if (!this.multiple) {
            if (this.data.items && this.data.items.length > 0) {
                for (let modelItem of this.data.items) {
                    if (item !== modelItem && modelItem.expanded) {
                        modelItem.expanded = false;
                    }
                }
            }
        }
        item.expanded = !item.expanded;
    }

    getActiveClass(item: INavbarData): string {
        return item.expanded && this.router.url.includes(item.routeLink)
            ? 'active-sublevel'
            : '';
    }

    navegate(item: INavbarData): void {
        const ruta = `./menu/${item.path}`;

        console.log(ruta, '===== rutaaaa =====');

        this._router
            .navigate([ruta])
            .then((resp) => {
                this.toggleEvent.emit(false)
            });
    }

}
