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
      this.plans.sort( (a, b) => { return a.number - b.number;});
      this.selectedPlan = plans[0];
      this.oldNumeroPlan = this.plans[0].number.toString();
      this.updateVendorList();
    });
  }
  public updateSelected(planID: any) {
    this.selectedPlan = this.plans[planID];
    
    this.oldNumeroPlan = this.plans[planID].number.toString();
    this.updateVendorList();
  }
  public updateVendorList(): void{
    this.vendors.forEach((vendor,index)=>{
      if(vendor.number==this.selectedPlan.numberF){
        var select = document.getElementById("mySelect");
        // @ts-ignore
        select.options[index].selected = true;
        this.selectedVendor = this.vendors[index];
      }

    })
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
      numberF: this.selectedVendor.number
    };
    console.log(plan);
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
    errorMessage += "Num??ro de plan d??j?? exister \n"

    if(!this.containsOnlyNumbers(plan.number))
    errorMessage += "Num??ro du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.frequency))
    errorMessage += "Fr??quence du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.persons))
    errorMessage += "nombre de personnes du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.calories))
    errorMessage += "Calories du plan fourni ne s'agit pas d'un type number \n"
    if(!this.containsOnlyNumbers(plan.price))
    errorMessage += "Prix du plan fourni ne s'agit pas d'un type number \n"

    if(errorMessage != "Impossible de modifier le plan: \n")
      errorHappen = true;
    if(errorHappen)
      this.openErrorMessage(errorMessage);
    return errorHappen;
  }
  private verifyDuplicateID(planToTest: Planrepas) :boolean{
    for(const plan of this.plans){
      if(plan.number == planToTest.number && plan.number != this.selectedPlan.number)
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

