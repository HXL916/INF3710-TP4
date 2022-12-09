import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Fournisseur, Planrepas } from '../../../../common/tables/Planrepas';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  @ViewChild("newNumber") newNumber: ElementRef;
  @ViewChild("newCategory") newCategory: ElementRef;
  @ViewChild("newFrequency") newFrequency: ElementRef;
  @ViewChild("newPersons") newPersons: ElementRef;
  @ViewChild("newCalories") newCalories: ElementRef;
  @ViewChild("newPrice") newPrice: ElementRef;
  @ViewChild("newVendorNumber") newVendorNumber: ElementRef;
  public vendors: Fournisseur[] = [];
  public selectedVendor:Fournisseur;
  public plans: Planrepas[] = [];

  public constructor(
    private communicationService: CommunicationService,
    private matDialogRefAjouter: MatDialogRef<AjouterComponent>,
    )
  {}

  ngOnInit(): void {
    this.getVendors();
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
  public insertPlan(): void {
    const plan: Planrepas = {
      number: this.newNumber.nativeElement.innerText,
      category: this.newCategory.nativeElement.innerText,
      frequency: this.newFrequency.nativeElement.innerText,
      persons: this.newPersons.nativeElement.innerText,
      calories: this.newCalories.nativeElement.innerText,
      price: this.newPrice.nativeElement.innerText,
      numberF: this.selectedVendor.number
    };
    if(this.newNumber.nativeElement.innerText == "")
      plan.number = 211;
    if(this.newCategory.nativeElement.innerText == "")
      plan.category = "categorie 1";
    if(this.newFrequency.nativeElement.innerText == "")
      plan.frequency = 1;
    if(this.newPersons.nativeElement.innerText == "")
      plan.persons = 1;
    if(this.newCalories.nativeElement.innerText == "")
      plan.calories = 200;
    if(this.newPrice.nativeElement.innerText == "")
      plan.price = 20;
    if(this.newVendorNumber.nativeElement.innerText == "")
      plan.numberF = 111111;
    this.communicationService.insertPlan(plan).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("insert");
      }
      this.refresh();
    });
  }

  private refresh() {
    this.newNumber.nativeElement.innerText = "";
    this.newCategory.nativeElement.innerText = "";
    this.newFrequency.nativeElement.innerText = "";
    this.newPersons.nativeElement.innerText = "";
    this.newCalories.nativeElement.innerText = "";
    this.newPrice.nativeElement.innerText = "";
    this.newVendorNumber.nativeElement.innerText = "";
  }

  public closeModale() {
    this.matDialogRefAjouter.close();
  }
}
