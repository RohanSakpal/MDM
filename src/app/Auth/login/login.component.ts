import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService,
    private apiService: ApiService,private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required]]
    });
    if (!localStorage.getItem('appInstanceCode')) {
      const GUID = Guid.create();
       localStorage.setItem('appInstanceCode', GUID.toString());
       this.apiService.appInstanceCode.next(GUID.toString());
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      const body: any = {
        'mobile_number': this.loginForm.value.phoneNumber,
        'password': this.loginForm.value.password
      };
      this.authService.verifyAccount(body).subscribe((resp:any)=>{
        if (resp.status === 'success') {
          localStorage.setItem('__USER', JSON.stringify(resp.data));
          localStorage.setItem('TOKEN', resp.token);
          if(resp.data.employee.role_code=='1001') {
            this.router.navigateByUrl('dashboard/master/base-master/city');
          }
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
