import { Component, ElementRef, ViewChild } from "@angular/core";
import { Planrepas } from "../../../../common/tables/Planrepas";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-hotel",
  templateUrl: "./planrepas.component.html",
  styleUrls: ["./planrepas.component.css"],
})
export class PlanrepasComponent {
  @ViewChild("newHotelNb") newHotelNb: ElementRef;
  @ViewChild("newHotelName") newHotelName: ElementRef;
  @ViewChild("newHotelCity") newHotelCity: ElementRef;

  public plans: Planrepas[] = [];

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.getHotels();
  }

  public getHotels(): void {
    this.communicationService.getPlans().subscribe((plans: Planrepas[]) => {
      this.plans = plans;
      console.log(plans);
    });
  }


  private refresh() {
    this.getHotels();
    this.newHotelNb.nativeElement.innerText = "";
    this.newHotelName.nativeElement.innerText = "";
    this.newHotelCity.nativeElement.innerText = "";
  }

  public updateHotel(i: number) {
    this.communicationService.updatePlan(this.plans[i]).subscribe((res: any) => {
      this.refresh();
    });
  }
}
