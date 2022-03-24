import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private api_key = "AIzaSyBfRszid_51IKHFHOMkV5_w1KHjvBEmlks";

  constructor( private http : HttpClient ) { }

  registrar( usuario: UsuarioModel ){
    const datos = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.api_key }`,
      datos
    );

  }

  iniciarSesion( usuario: UsuarioModel ){

  }

  cerrarSesion(){

  }
}
