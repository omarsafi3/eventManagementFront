import { Component } from '@angular/core';
import { RegisterService } from './services/register.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  participant = {
    fullName: '',
    email: '',
    password: '',
    roles: "USER",
    totalPaid: 0,
  }
  registerForm : FormGroup;
  constructor(private registerService: RegisterService, private fb: FormBuilder, private router: Router) { 
    this.registerForm = this.fb.group({
      fullName: [''],
      email: [''],
      password: [''],
    });
  }
  
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.participant.fullName = this.registerForm.value.fullName;
    this.participant.email = this.registerForm.value.email;
    this.participant.password = this.registerForm.value.password;
    this.registerService.registerUser(this.participant).subscribe((response) => {
      delete this.participant.totalPaid;
      this.registerService.registerAdmin(this.participant).subscribe((response) => {
        this.router.navigate(['/login']);
      });
    });

  }
  

}
