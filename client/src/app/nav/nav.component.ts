import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable,  of } from 'rxjs';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model:any={};
 

    constructor(public accountService:AccountService, private router:Router,
      private toastr:ToastrService){}

    ngOnInit():void{
     
    }
  
    
  login(){
    this.accountService.login(this.model).subscribe({
      next:()=>{
        this.router.navigateByUrl('/members');  //ow you can write next:_=>this.router.navigateByUrl('/members');
       
      },
      //using toastr
      error:error=>this.toastr.error(error.error) //error:error=>console.log(error)
    })
  }
  
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
   
  }

}
