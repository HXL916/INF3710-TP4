import { Component, OnInit } from '@angular/core';
import { Planrepas } from '../../../../common/tables/Planrepas';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {

  constructor() { }
  public plans: Planrepas[] = [];
  ngOnInit(): void {
  }

}
