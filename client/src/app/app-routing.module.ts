import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { PlanrepasComponent } from "./planrepas/planrepas.component";
import { RoomComponent } from "./room/room.component";
import { GuestComponent } from "./guest/guest.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "rooms", component: RoomComponent },
  { path: "hotels", component: PlanrepasComponent },
  { path: "guests", component: GuestComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }