import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  user : User = {
    Username: '',
    Password: ''
  };

  constructor(private userService : UserService){}

  ngOnInit(){
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(from != null){
      form?.reset();
    }
  }

  OnSubmit(form: NgForm){
    this.userService.registerUser(form.value)
    .subscribe({
      next(data){
        console.log(data);
        alert("Register Successfully!");
      },
      error(msg){
        console.log('Error Message: ', msg);
      }
    });
    this.resetForm(form);
  }
}
