//Aquí se irán añadiendo los componentes de Angular Material a utilizar.
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatButtonModule
    ],
    exports: [
        MatButtonModule
    ]
})

export class MaterialModule {}