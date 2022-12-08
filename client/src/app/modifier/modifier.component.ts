import { Component, OnInit } from "@angular/core";

import { Planrepas } from "../../../../common/tables/Planrepas";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./modifier.component.html",
  styleUrls: ["./modifier.component.css"],
})

export class ModifierComponent implements OnInit {
  public plans: Planrepas[] = [];
  public selectedPlan: Planrepas;
  public constructor(private communicationService: CommunicationService) {}

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
  public updateSelectedPlan(planID: any) {
    this.selectedPlan = this.plans[planID];
  }
}

