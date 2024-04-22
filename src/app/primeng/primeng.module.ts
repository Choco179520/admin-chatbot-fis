import {AvatarModule} from 'primeng/avatar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {CommonModule} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {KnobModule} from 'primeng/knob';
import {NgModule} from '@angular/core';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TooltipModule} from 'primeng/tooltip';
import {CardModule} from "primeng/card";
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {ColorPickerModule} from 'primeng/colorpicker';
import {TreeTableModule} from "primeng/treetable";
import { PickListModule } from 'primeng/picklist';

@NgModule({
    imports: [
        CommonModule,
        TabViewModule,
        InputTextModule,
        InputSwitchModule,
        SelectButtonModule,
        CalendarModule,
        TableModule,
        KnobModule,
        AvatarModule,
        BreadcrumbModule,
        SidebarModule,
        DialogModule,
        CheckboxModule,
        ButtonModule,
        RadioButtonModule,
        DividerModule,
        TooltipModule,
        CardModule,
        DropdownModule,
        ProgressBarModule,
        ColorPickerModule,
        TreeTableModule,
        PickListModule
    ],
    exports: [
        TabViewModule,
        InputTextModule,
        InputSwitchModule,
        SelectButtonModule,
        CalendarModule,
        TableModule,
        KnobModule,
        AvatarModule,
        BreadcrumbModule,
        SidebarModule,
        DialogModule,
        CheckboxModule,
        ButtonModule,
        RadioButtonModule,
        DividerModule,
        TooltipModule,
        CardModule,
        DropdownModule,
        ProgressBarModule,
        ColorPickerModule,
        TreeTableModule,
        PickListModule
    ],
})
export class PrimengModule {
}
