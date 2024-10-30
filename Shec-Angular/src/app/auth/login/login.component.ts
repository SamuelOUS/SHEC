import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../const/shared.modules';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Declaración correcta

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      Swal.fire({
        title: 'Ingreso',
        text: 'Debe diligenciar todos los campos',
        icon: 'error'
      });
      return;
    }
    
    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: error => {
        Swal.fire({
          title: 'Ingreso',
          text: error.error.message,
          icon: 'error'
        });
      }
    });
  }
}
