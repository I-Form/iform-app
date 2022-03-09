import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VirtualTwinsService } from '../virtual-twins.service';


@Component({
  selector: 'app-solidification-models',
  templateUrl: './solidification-models.component.html',
  styleUrls: ['./solidification-models.component.css']
})
export class SolidificationModelsComponent implements OnInit {

  numeric_validator = Validators.pattern("^[0-9]*(\\.[0-9]*)?$");

  melting_controls = new FormGroup({
    scanning_speed: new FormControl(1.5, [this.numeric_validator, Validators.required]),
    laser_power: new FormControl(175, [this.numeric_validator, Validators.required]),
    layer_thickness: new FormControl(75, [this.numeric_validator, Validators.required])
  });

  results = {
    layer_width: ''
  };

  constructor(public virtualTwinsService: VirtualTwinsService) { }

  ngOnInit(): void {
  }



  submitSimulation() {

  }

}
