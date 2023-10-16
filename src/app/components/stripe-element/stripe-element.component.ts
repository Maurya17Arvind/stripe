import { Component, OnInit } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stripe-element',
  templateUrl: './stripe-element.component.html',
  styleUrls: ['./stripe-element.component.scss']
})
export class StripeElementComponent implements OnInit {

  public stripe!: Stripe;
  public stripePublickey:string;
  public elements:any;
  public origin!:string;
  public clienId:string = "pi_3O0jjtDt9lvEtvsk2rAHfKSj_secret_VcB03wDyjtoz1JzhoQCSHkojk";
  public themeList:any = [
    {
      label:'Stripe',
      value:'stripe'
    },
    {
      label:'Night',
      value:'night'
    },
    {
      label:'Flat',
      value:'flat'
    }
  ];
  public currentTheme:string = 'stripe';
  public currentActionType:string = 'tabs';
  constructor() { 
    this.stripePublickey = environment.stripePubicKey;
  }

  ngOnInit(): void {
    this.loadStripe();
    this.origin = window.location.origin;
  }

  async loadStripe() {
    this.stripe = (await loadStripe(this.stripePublickey)) as any;
    this.initialize(this.clienId,this.currentTheme,this.currentActionType);
  }

  public onChange(theme:string){
    this.currentTheme = theme;
    this.initialize(this.clienId,theme,this.currentActionType);
  }

  onTabChange(event:any){
    this.currentActionType = event.target.value;
    this.initialize(this.clienId,this.currentTheme,this.currentActionType);
  }
  initialize(clientSecretId:string,theme:string, actionType:string) {
    const clientSecret = clientSecretId;
    const appearance:any = {
      theme: theme,
      // labels: 'floating',
      variables: { colorPrimaryText: '#262626' }
    };
    this.elements = this.stripe.elements({ appearance, clientSecret });
  
    const paymentElementOptions = {
      layout: actionType,
    };
  
    const paymentElement = this.elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
    // paymentElement.on('loaderstart', (event:any)=> {
    //   this.isLoading = false;
    // });
  }

  handleSubmit(e:any) {
    e.preventDefault();
    const elements:any = this.elements;
    this.stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${this.origin}`,
      },
    }).then((resp: any) => {
      console.log('resp :>> ', resp);
    }).catch((err: any) => {
      console.log('err :>> ', err);
    });
  }

}
