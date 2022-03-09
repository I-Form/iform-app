import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualTwinsService } from '../virtual-twins.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  logged_in = false;
  user_login = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  material_control = new FormControl('Ti64');

  constructor(private http: HttpClient, private virtualTwinsService: VirtualTwinsService, private router: Router) { }

  ngOnInit(): void {

    // this.virtualTwinsService.logout();
    this.logged_in = this.virtualTwinsService.isLoggedIn();

    console.log('login check:' + this.logged_in);

    this.http.get(this.virtualTwinsService.api_addr+'/verifyLogin').toPromise().then(
      (data)=>{
        console.log('Checking verify login status:');
        this.logged_in = true;
      },
      (error)=>{
        console.log('No token')
        this.virtualTwinsService.logout();
      }

    )


  }

  login() {
    console.log('Trying to login ' + this.user_login.get('username')!.value)
    this.virtualTwinsService.loginWithUsernameAndPassword(this.user_login.get('username')!.value, this.user_login.get('password')!.value).subscribe((user: any) => {
      if (user && user.token) {
        this.virtualTwinsService.cookieService.set('token', user.token);
        window.location.reload();
      }
    }, (error:any)=>{
      alert("Authorization failed.")
    });
  }

  logout() {

    this.virtualTwinsService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }

  showAbout(){
    alert(
      "This WebApp is developed for use with IForms emulators. " +
      "This WebApp interface is developed and maintained by Michael Clancy UCD (michael.clancy@ucdconnect.ie)"
    )
  }

}
