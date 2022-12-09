import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from "../communication.service";
import { Planrepas } from "../../../../common/tables/Planrepas";

@Component({
  selector: "app-room",
  templateUrl: "./supprimer.component.html",
  styleUrls: ["./supprimer.component.css"],
})
export class SupprimerComponent implements OnInit {
  public plans: Planrepas[] = [];
  public selectedPlan: Planrepas;
  public constructor(private communicationService: CommunicationService, private matDialogRefSupprimer: MatDialogRef<SupprimerComponent>) {}

  public ngOnInit(): void {
    this.getPlans();
  }

  public getPlans(): void {
    this.communicationService.getPlans().subscribe((plans: Planrepas[]) => {
      this.plans = plans;
      this.selectedPlan = plans[0];
      console.log(plans);
    });
  }

  public updateSelected(planID: any) {
    this.selectedPlan = this.plans[planID];
  }
  public deletePlan(planID: number) {
    this.communicationService.deletePlan(planID).subscribe((res: number) => {
      this.refresh();
    });
  }
  private refresh() {
    this.getPlans();
  }

  public closeModale() {
    this.matDialogRefSupprimer.close();
  }

}
