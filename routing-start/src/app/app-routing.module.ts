
import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { HomeComponent } from "app/home/home.component";
import { UsersComponent } from "app/users/users.component";
import { UserComponent } from "app/users/user/user.component";
import { ServersComponent } from "app/servers/servers.component";
import { EditServerComponent } from "app/servers/edit-server/edit-server.component";
import { ServerComponent } from "app/servers/server/server.component";
import { PageNotFoundComponent } from "app/page-not-found/page-not-found.component";
import { AuthGuard } from "app/auth-guard.service";
import { ErrorComponent } from "app/error/error.component";

const appRoutes : Routes = [
{ path : '' , component : HomeComponent },
{ path : 'users' , component : UsersComponent ,
  children : [{ path : ':id/:name' , component : UserComponent } ] } ,
{ path : 'servers',canActivateChild :[AuthGuard],component : ServersComponent ,
  children : [
    { path : ':id/edit' , component : EditServerComponent },
    { path : ':id' , component : ServerComponent }]
},
{ path : 'not-found' , component : ErrorComponent , data:{message : 'Error Page'} },
{ path : '**' , redirectTo : '/not-found' },
]

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{

}