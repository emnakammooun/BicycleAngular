import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  user!:any // bech ye5o valeur mte3ha wala null feyda tet3aba bi haja
  constructor(private AS:AuthService,private router:Router) {}
  signout():void
  {
    this.AS.doLogout().then(()=>{
      this.router.navigate(['/login'])
    })
  }

  ngOnInit(): void { 
  
    this.AS.getUserClaims().then((u)=>{
      this.user = u;
      if(!!this.user) console.log(this.user.displayName);
    })
  
  }
}


