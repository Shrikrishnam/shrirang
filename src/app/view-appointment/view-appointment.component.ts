import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { Router, NavigationExtras } from "@angular/router";


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
  userData=[];
  
  constructor(private userService: UserService, private http:HttpClient, private router: Router) {}

  ngOnInit():void {
   this.getfitness();   
  }
  
  getfitness() {
    if(this.userData.length>0)
    {
      this.userData=[]
    }
    this.userService.getfitnessdata().subscribe(res=>{
      for(let key in res){
if(res.hasOwnProperty(key))
        {
          this.userData.push(res[key]);
        }
      }
    });
  }
  deleteUser(data){
    let choice=confirm("Are you sure you want to delete this record?")
    if(choice==true)
    {
      this.userService.deletefitnessdata(data).subscribe(()=>{
        this.ngOnInit()
       });     
    }
  }
  editUser(data){
    this.router.navigate([
      "/place-fitness-trainer-appointment",
      {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        streetaddress: data.streetaddress,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
        phonenumber: data.phonenumber,
        email: data.email,
        age: data.age,
        trainerpreference: data.trainerpreference,
        physiotherapist: data.physiotherapist,
        packages: data.packages,
        inr: data.inr,
        paisa: data.paisa
      },
    ]);
  }
}

