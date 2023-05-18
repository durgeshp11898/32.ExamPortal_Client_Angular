import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = null;
  firstName="";
  lastName="";
  username="";
  id="";
  phone="";
  enabled="";
  auth:any;
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );

    this.enabled= this.login.getUser().enabled;
    this.firstName=this.login.getUser().firstName;
    this.id=this.login.getUser().id;
    this.lastName=this.login.getUser().lastName;
    this.phone=this.login.getUser().phone;
    this.username=this.login.getUser().username;
    this.auth=this.login.getUser().authorities[0].authority 
  }
}
