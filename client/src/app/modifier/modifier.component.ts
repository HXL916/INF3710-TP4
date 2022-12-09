import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Fournisseur, Planrepas } from "../../../../common/tables/Planrepas";
import { CommunicationService } from "../communication.service";
import { ErrorMessageComponent } from '../error-message/error-message.component';

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
  public vendors: Fournisseur[] = [];
  public selectedVendor:Fournisseur;
  public constructor(private communicationService: CommunicationService, public matDialogRefModifier: MatDialogRef<ModifierComponent>,public dialog: MatDialog,) {}

  public ngOnInit(): void {
    this.getPlans();
    this.getVendors();
  }

  public getPlans(): void {
    this.communicationService.getPlans().subscribe((plans: Planrepas[]) => {
      this.plans = plans;
      this.selectedPlan = plans[0];
    });
  }
  public updateSelected(planID: any) {
    this.selectedPlan = this.plans[planID];
    this.selectedVendor.number = this.selectedPlan.numberF;
    this.oldNumeroPlan = this.plans[planID].number.toString();
  }
  public getVendors(): void {
    this.communicationService.getVendors().subscribe((vendors: Fournisseur[]) => {
      this.selectedVendor = vendors[0];
      this.vendors = vendors;
    });
  }
  public updateSelectedVendor(ID: any) {
    this.selectedVendor = this.vendors[ID];
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
    let request :boolean = true;
    request = !this.verifyInput(plan);

    if(request){
      this.communicationService.updatePlan(plan, this.oldNumeroPlan).subscribe((res: any) => {
        this.refresh();
      });
  }

  }
  private refresh() {
    this.getPlans();
  }

  public closeModale() {
    this.matDialogRefModifier.close();
  }
  private containsOnlyNumbers(value: any) {
    return /^[0-9]+$/.test(value);
  }
  private verifyInput(plan: Planrepas) :boolean{
    let errorMessage : string = "Impossible de modifier le plan: \n";
    let errorHappen: boolean = false;
    if(this.verifyDuplicateID(plan))
    errorMessage += "Numéro de plan déjà exister \n"

    if(!this.containsOnlyNumbers(plan.number))
    errorMessage += "Numéro du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.frequency))
    errorMessage += "Fréquence du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.persons))
    errorMessage += "nombre de personnes du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.calories))
    errorMessage += "Calories du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.price))
    errorMessage += "Prix du plan fourni ne s'agit pas d'un type number \n"

    if(errorMessage != "Impossible d'ajouter le plan, les types d'entrées sont erronés: \n")
      errorHappen = true;
    if(errorHappen)
      this.openErrorMessage(errorMessage);
    return errorHappen;
  }
  private verifyDuplicateID(planToTest: Planrepas) :boolean{
    for(const plan of this.plans){
      if(plan.number == planToTest.number)
        return true;
    }

    return false;
  }
  private openErrorMessage(errorMessage: string){
    this.dialog.open(ErrorMessageComponent, {
      hasBackdrop :true,
      data: errorMessage,
      width: '30%',
      height: '30%',
    });
  }
}

