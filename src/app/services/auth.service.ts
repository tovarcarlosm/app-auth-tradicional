import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private api_key = "AIzaSyBfRszid_51IKHFHOMkV5_w1KHjvBEmlks";

  usuarioToken: string | null = "";

  constructor( private http : HttpClient ) {
    this.leerToken();
  }

  registrar( usuario: UsuarioModel ){
    const datos = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.api_key }`,
      datos
    ).pipe(
      map( resp => {
        console.log("Ejecutando el map...");
        // @ts-ignore
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  iniciarSesion( usuario: UsuarioModel ){
    const datos = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.api_key }`,
      datos
    ).pipe(
      map( resp => {
        console.log("Ejecutando el map...");
        // @ts-ignore
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }

  private guardarToken( idToken: string){
    this.usuarioToken = idToken;
    localStorage.setItem('token', this.usuarioToken);

    let horaInicio = new Date();
    horaInicio.setSeconds(60);
    localStorage.setItem('expira', horaInicio.getTime().toString())
  }

  private leerToken(){
    if ( localStorage.getItem('token') ){
      this.usuarioToken = localStorage.getItem('token');
    } else {
      this.usuarioToken = "";
    }
    return this.usuarioToken;
  }

  estaAuth(): boolean {
    // @ts-ignore
    if (this.usuarioToken?.length < 10){ return false; }

    const expira = Number(localStorage.getItem('expira'));
    const fechaExpira = new Date();
    fechaExpira.setTime(expira);

    return fechaExpira > new Date();

  }

}
