import { Component, OnInit } from '@angular/core';
import {VirtualTwinsService} from '../virtual-twins.service';

@Component({
  selector: 'app-mechanical',
  templateUrl: './mechanical.component.html',
  styleUrls: ['./mechanical.component.css']
})
export class MechanicalComponent implements OnInit {

  constructor(public virtualTwinsService: VirtualTwinsService) { }

  ngOnInit(): void {
  }

}
