import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  salir(){
    this.auth.cerrarSesion();
    this.router.navigateByUrl('login');
  }
}
