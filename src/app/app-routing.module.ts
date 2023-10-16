import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripeElementComponent } from './components/stripe-element/stripe-element.component';

const routes: Routes = [
  {
    path:'',
    component: StripeElementComponent
  },
  {
    path:'**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
