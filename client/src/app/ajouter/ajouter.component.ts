import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Planrepas } from '../../../../common/tables/Planrepas';
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

  public constructor(
    private communicationService: CommunicationService,
    private matDialogRefAjouter: MatDialogRef<AjouterComponent>,
    )
    {}

  public plans: Planrepas[] = [];

  ngOnInit(): void {
  }

  public insertPlan(): void {
    const plan: Planrepas = {
      number: this.newNumber.nativeElement.innerText,
      category: this.newCategory.nativeElement.innerText,
      frequency: this.newFrequency.nativeElement.innerText,
      persons: this.newPersons.nativeElement.innerText,
      calories: this.newCalories.nativeElement.innerText,
      price: this.newPrice.nativeElement.innerText,
      numberF: this.newVendorNumber.nativeElement.innerText,
    };

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
