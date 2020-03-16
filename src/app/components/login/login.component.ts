import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form) {
    let data = form.value
    this.as.login(data.email, data.password).then(result => console.log(result)).catch(err => console.log(err))
    this.router.navigate(['/'])
  }

}
