import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';

import { XrmService, XrmContext } from './xrm.service';

export * from './xrm.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class XrmServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: XrmServiceModule,
            providers: [XrmService]
        };
    }
}