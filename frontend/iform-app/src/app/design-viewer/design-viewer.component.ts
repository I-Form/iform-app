import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { VirtualTwinsService } from '../virtual-twins.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-design-viewer',
  templateUrl: './design-viewer.component.html',
  styleUrls: ['./design-viewer.component.css']
})
export class DesignViewerComponent implements OnInit {

  numeric_validator = Validators.pattern("^[0-9]*(\\.[0-9]*)?$");

  melting_controls = new FormGroup({
    scanning_speed: new FormControl(1.5, [this.numeric_validator, Validators.required]),
    laser_power: new FormControl(175, [this.numeric_validator, Validators.required]),
    layer_thickness: new FormControl(75, [this.numeric_validator, Validators.required])
  });

  microstructure_controls = new FormGroup({
    grain_size: new FormControl(100)
  })


  results = {
    layer_width: ''
  };

  constructor(private route: ActivatedRoute, public virtualTwinsService: VirtualTwinsService, private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.submitSimulation();

  }


  submitSimulation() {
    if (this.virtualTwinsService.isLoggedIn()) {
      if (this.melting_controls.valid) {
        console.log('Submitting simulation')
        let form_data = new FormData();

        form_data.append('scanning_speed', this.melting_controls.get("scanning_speed")?.value);
        form_data.append('layer_thickness', this.melting_controls.get("layer_thickness")?.value);
        form_data.append('laser_power', this.melting_controls.get("laser_power")?.value);


        this.http.post(
          this.virtualTwinsService.api_addr + '/meltingEmulator', form_data
        ).subscribe((data: any) => {
          console.log('Retrieved data from melt emulator:');
          console.log(data);
          this.results = data;
          this.results.layer_width = parseFloat(this.results.layer_width).toFixed(2);

        }, error => alert('An error occured with running the emulator.'))
      }
      else {
        alert('Parameter input not valid');
      }
    }

  }

  microstructure_answer = 0

  submitMicrostructureCalculation() {
    console.log('Doing microstrcuture calculation')
    let form_data = new FormData();

    form_data.append('grain_size', this.microstructure_controls.get("grain_size")?.value)
    
    this.http.post(this.virtualTwinsService.api_addr + '/microstructureCalculator', form_data).subscribe((answer: any)=>{
      console.log('Microstrucutre calculator answered back')
      console.log(answer)
      this.microstructure_answer = answer.value 
    })

  }


}
