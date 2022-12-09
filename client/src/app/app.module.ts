import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { SupprimerComponent } from "./supprimer/supprimer.component";
import { PlanrepasComponent } from "./planrepas/planrepas.component";
import { AjouterComponent } from './ajouter/ajouter.component';
import { ModifierComponent } from "./modifier/modifier.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorMessageComponent } from './error-message/error-message.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanrepasComponent,
    ModifierComponent,
    SupprimerComponent,
    AjouterComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
