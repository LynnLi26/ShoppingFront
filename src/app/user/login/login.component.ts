import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user : User = {
    Username: '',
    Password: ''
  };
  
  constructor(private userService: UserService, private router: Router){}


  ngOnInit(){
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(from != null){
      form?.reset();
    }
  }
  OnSubmit(form: NgForm){
    this.userService.userLogin(form.value).subscribe({
      next:(dta: any)=>{
        if(dta == true){
          this.router.navigate(['/home']);
          sessionStorage.setItem('isAuthenticated', 'true');
        }
        else{
          alert("Password or Username is not correct!");
          sessionStorage.setItem('isAuthenticated', 'false');
        }
      },
      error:(msg)=>{
        console.log('Error Message: ', msg);
      }
    });
  }
}
