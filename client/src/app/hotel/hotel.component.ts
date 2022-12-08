import { Component, ElementRef, ViewChild } from "@angular/core";
import { Client } from "../../../../common/tables/Hotel";
import { CommunicationService } from "./../communication.service";

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel.component.html",
  styleUrls: ["./hotel.component.css"],
})
export class HotelComponent {
  @ViewChild("newHotelNb") newHotelNb: ElementRef;
  @ViewChild("newHotelName") newHotelName: ElementRef;
  @ViewChild("newHotelCity") newHotelCity: ElementRef;

  public clients: Client[] = [];
  public duplicateError: boolean = false;

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.getHotels();
  }

  public getHotels(): void {
    this.communicationService.getHotels().subscribe((clients: Client[]) => {
      this.clients = clients;
      console.log(clients[0])
    });
  }

  public insertHotel(): void {
    const hotel: any = {
      hotelnb: this.newHotelNb.nativeElement.innerText,
      name: this.newHotelName.nativeElement.innerText,
      city: this.newHotelCity.nativeElement.innerText,
    };

    this.communicationService.insertHotel(hotel).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
      }
      this.refresh();
      this.duplicateError = res === -1;
    });
  }

  private refresh() {
    this.getHotels();
    this.newHotelNb.nativeElement.innerText = "";
    this.newHotelName.nativeElement.innerText = "";
    this.newHotelCity.nativeElement.innerText = "";
  }

  public deleteHotel(hotelNb: string) {
    this.communicationService.deleteHotel(hotelNb).subscribe((res: any) => {
      this.refresh();
    });
  }

  public changeHotelName(event: any, i:number){
    const editField = event.target.textContent;
    this.clients[i].name = editField;
  }

  public changeHotelCity(event: any, i:number){
    const editField = event.target.textContent;
    this.clients[i].city = editField;
  }

  public updateHotel(i: number) {
    this.communicationService.updateHotel(this.clients[i]).subscribe((res: any) => {
      this.refresh();
    });
  }
}
