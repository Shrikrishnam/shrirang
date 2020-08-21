import { Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";


export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  styleUrls: ['./place-fitness-trainer-appointment.component.css']
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  constructor(private fb: FormBuilder, private sd: UserService, private router: Router,
    private route: ActivatedRoute) { }
  fitnessForm: FormGroup;
  submitted: boolean =false;
  id: String;
  addForm:boolean= true;
  editForm: boolean=false;
  detailsObject;
  datajson;
  ngOnInit() {
    this.buildForm();
    console.log(this.route.snapshot.paramMap.get("trainerpreference"))
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != null) {
      let firstname = this.route.snapshot.paramMap.get("firstname");
      let lastname = this.route.snapshot.paramMap.get("lastname");
      let streetaddress = this.route.snapshot.paramMap.get("streetaddress");
      let city = this.route.snapshot.paramMap.get("city");
      let state = this.route.snapshot.paramMap.get("state");
      let country = this.route.snapshot.paramMap.get("country");
      let pincode = this.route.snapshot.paramMap.get("pincode");
      let phonenumber = this.route.snapshot.paramMap.get("phonenumber");
      let email = this.route.snapshot.paramMap.get("email");
      let age = this.route.snapshot.paramMap.get("age");
      let trainerpreference = this.route.snapshot.paramMap.get("trainerpreference");
      let physiotherapist = this.route.snapshot.paramMap.get("physiotherapist");
      let packages = this.route.snapshot.paramMap.get("packages");
      let inr = this.route.snapshot.paramMap.get("inr");
      let paisa = this.route.snapshot.paramMap.get("paisa");
     
      this.fitnessForm.patchValue({
        firstname: firstname,
        lastname: lastname,
        streetaddress: streetaddress,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
        phonenumber: phonenumber,
        email: email,
        age: age,
        trainerpreference: trainerpreference,
        physiotherapist: physiotherapist,
        packages: packages,
        inr: inr,
        paisa: paisa
      });
      this.addForm = false;
      this.editForm = true;
    }
    
  }
  buildForm():any{
    this.fitnessForm= this.fb.group({
      firstname: ['', [ Validators.required, Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]],
      lastname: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      phonenumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]], 
      age: ['', [Validators.required, Validators.maxLength(2), this.ageValidator]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      streetaddress:['',Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country:['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      trainerpreference:['',[Validators.required]],
      physiotherapist: ['', [Validators.required]],
      packages: ['', [Validators.required]],
      inr:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      paisa:['',[Validators.required, Validators.pattern('^[0-9]*$')]]
    });

  }
  changePreference(e) {
    this.trainerpreference.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changePackages(e) {
    this.fitnessForm.get('inr').setValue(e.target.value);
    this.fitnessForm.get('paisa').setValue(10);
    this.packages.setValue(e.target.value, {
      onlySelf: true
    })
   
  }

ageValidator(control: AbstractControl){
  const elementValue = control.value;
  if(elementValue<18 || elementValue>60)
  {
    return {'age_error':'The age must be between 18 and 60.'}
  }
}
get paisa(){
  return this.fitnessForm.get('paisa')
 
}
get inr(){
  return this.fitnessForm.get('inr')

}
get packages(){
  return this.fitnessForm.get('packages')
}

get physiotherapist(){
  return this.fitnessForm.get('physiotherapist')
}
  get trainerpreference(){
    return this.fitnessForm.get('trainerpreference')
  }
  get pincode() {
    return this.fitnessForm.get('pincode');
}

get country(){
  return this.fitnessForm.get('country');
  
}
  get state() {
    return this.fitnessForm.get('state');
  }

  get city() {
    return this.fitnessForm.get('city');
  }

  get streetaddress() {
    return this.fitnessForm.get('streetaddress');
  }

  get email(){
    return this.fitnessForm.get('email');

  }
  get age(){
    return this.fitnessForm.get('age');

  }
  get phonenumber(){
    return this.fitnessForm.get('phonenumber');

  }
  get firstname() {
    return this.fitnessForm.get('firstname');
  }

  get lastname() {
    return this.fitnessForm.get('lastname');
  }


  onSubmit() {
    this.submitted = true;

    if (this.fitnessForm.invalid) {
      return;
    }

    this.detailsObject= {
      fn: this.firstname,
      ln : this.lastname,
      phn : this.phonenumber,
      age : this.age,
      eml : this.email,
      stAddr: this.streetaddress,
      ct: this.city,
      st: this.state,
      country:this.country,
      zp: this.pincode,
      pref: this.trainerpreference,
      ch: this.physiotherapist,
      pkg: this.packages,
      inr: this.inr,
      paisa: this.paisa
    }

    if (this.addForm) {
      this.sd.postfitnessdata(this.fitnessForm.value).subscribe((resp) => {
        console.log(resp);
      });
    } else {
      this.sd
        .updatefitnessdata(this.id, this.fitnessForm.value)
        .subscribe((resp) => {
          console.log(resp);
        });
    }

    this.router.navigateByUrl("view-appointment");
  }


  }

  
    

