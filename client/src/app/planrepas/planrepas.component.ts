import { Component } from "@angular/core";
import { Planrepas } from "../../../../common/tables/Planrepas";
import { CommunicationService } from "../communication.service";
import {MatDialog} from '@angular/material/dialog';
import { AjouterComponent } from "../ajouter/ajouter.component";
import { ModifierComponent } from "../modifier/modifier.component";
import { SupprimerComponent } from "../supprimer/supprimer.component";
@Component({
  selector: "app-hotel",
  templateUrl: "./planrepas.component.html",
  styleUrls: ["./planrepas.component.css"],
})
export class PlanrepasComponent {
  public plans: Planrepas[] = [];

  public constructor(private communicationService: CommunicationService, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getPlans();

  }

  public getPlans(): void {
    this.communicationService.getPlans().subscribe((plans: Planrepas[]) => {
      this.plans = plans;
      this.plans.sort( (a, b) => { return a.number - b.number;});
    });
  }
  openDialogAjouter(){
    this.dialog.open(AjouterComponent, {
      width: '70%',
      height: '60%',
      disableClose: true,
    }).afterClosed().subscribe(() => {this.getPlans()});;
  }

  openDialogModifier(){
    this.dialog.open(ModifierComponent, {
      width: '70%',
      height: '60%',
      disableClose: true,
    }).afterClosed().subscribe(() => {this.getPlans()});
  }

  openDialogSupprimer(){
    this.dialog.open(SupprimerComponent, {
      width: '70%',
      height: '60%',
      disableClose: true,
    }).afterClosed().subscribe(() => {this.getPlans()});;
  }
}
