import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { PlanrepasComponent } from "./planrepas/planrepas.component";
import { ModifierComponent } from "./modifier/modifier.component";
import { SupprimerComponent } from "./supprimer/supprimer.component";
import { AjouterComponent } from "./ajouter/ajouter.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "plans", component: PlanrepasComponent },
  { path: "modifier", component: ModifierComponent },
  { path: "supprimer", component: SupprimerComponent },
  { path: "ajouter", component: AjouterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }