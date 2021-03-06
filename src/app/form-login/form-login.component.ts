import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder:FormBuilder, public authService:AuthService, public snackBar: MatSnackBar, private router: Router, private location: Location) { this.createFormLogin();
  }

  ngOnInit() {
  }
  
  createFormLogin() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  onLogin(){
    this.authService.login(this.formLogin.value.email, this.formLogin.value.password)
    .then(()=>{
    //Login exitoso, así que celebramos con el usuario (?)
      this.router.navigate(['/muro']);
    })
    .catch(()=>{
    //Algo salió mal, avisemos mejor para que reintente
    this.snackBar.open('Error al tratar de iniciar sesión, trata otra vez'
                        ,null/*No necesitamos botón en el aviso*/
                        ,{
                          duration : 3000
                        });
    });
  }

}
