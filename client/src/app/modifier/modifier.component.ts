import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Planrepas } from "../../../../common/tables/Planrepas";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./modifier.component.html",
  styleUrls: ["./modifier.component.css"],
})

export class ModifierComponent implements OnInit {
  @ViewChild("newNumber") newNumber: ElementRef;
  @ViewChild("newCategory") newCategory: ElementRef;
  @ViewChild("newFrequency") newFrequency: ElementRef;
  @ViewChild("newPersons") newPersons: ElementRef;
  @ViewChild("newCalories") newCalories: ElementRef;
  @ViewChild("newPrice") newPrice: ElementRef;
  @ViewChild("newVendorNumber") newVendorNumber: ElementRef;
  public plans: Planrepas[] = [];
  public selectedPlan: Planrepas;
  public oldNumeroPlan: string;
  public constructor(private communicationService: CommunicationService, public matDialogRefModifier: MatDialogRef<ModifierComponent>) {}

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
    this.oldNumeroPlan = this.plans[planID].number.toString();
  }
  public updatePlan() {
    const plan: Planrepas = {
      number: this.newNumber.nativeElement.innerText,
      category: this.newCategory.nativeElement.innerText,
      frequency: this.newFrequency.nativeElement.innerText,
      persons: this.newPersons.nativeElement.innerText,
      calories: this.newCalories.nativeElement.innerText,
      price: this.newPrice.nativeElement.innerText,
      numberF: this.newVendorNumber.nativeElement.innerText,
    };
    console.log(plan);
    this.communicationService.updatePlan(plan, this.oldNumeroPlan).subscribe((res: any) => {
      this.refresh();
    });
  }
  private refresh() {
    this.getPlans();
  }

  public closeModale() {
    this.matDialogRefModifier.close();
  }
}

