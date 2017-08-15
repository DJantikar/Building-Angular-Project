import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router/";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit , OnDestroy{
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  paramsSubscription : Subscription ;

  constructor(private route : ActivatedRoute){}
  
  ngOnInit(): void {
    this.user = {id : this.route.snapshot.params['id'],
                name : this.route.snapshot.params['name']};
    
    this.paramsSubscription=this.route.params
    .subscribe(
      (params : Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }

    );
  }



  user  : { name : String ,  id : number }
}
