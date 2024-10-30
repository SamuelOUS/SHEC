import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validación de email
      name: ['', Validators.required], // Validación de nombre
      password: ['', [Validators.required, Validators.minLength(6)]], // Validación de contraseña
      rePassword: ['', Validators.required] // Validación de confirmar contraseña
    });
  }

  onRegister() {
    
    if (!this.signUpForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const { name, email, password, rePassword } = this.signUpForm.value;

    // Verificar si las contraseñas coinciden
    if (rePassword !== password) {
      Swal.fire({
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      text: 'Registro exitoso. Redirigiendo a la página de inicio de sesión...',
      icon: 'success',
      confirmButtonText: 'OK'

    })

    this.router.navigateByUrl('/login'); 

    this.userService.register({ name, email, password }).subscribe({
      next: () => {
        
        Swal.fire({
          text: 'Registro exitoso. Redirigiendo a la página de inicio de sesión...',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigateByUrl('/login'); 
        });
      },
      error: error => {
        Swal.fire({
          text: error.error.message || 'Error en el registro', // Asegúrate de que este mensaje esté presente
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
