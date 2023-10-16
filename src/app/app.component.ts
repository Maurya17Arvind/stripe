import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import stripe from 'stripe';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stripe';
  public planType!:string;
  public planList = [
    {
      label :'Monthly Plan',
      value: 'month'
    },
    {
      label :'Yearly Plan',
      value: 'year'
    },
  ];

  // formGroup: FormGroup;

  // constructor(private formBuilder: FormBuilder) {
  //   this.formGroup = this.formBuilder.group({
  //     expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
  //   });
  // }
  ngOnInit() {
   
  }

  onPay(){
    const popupWindow = window.open(`${this.planType}`, "_blank", "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left=50 top=100" );
    if(popupWindow){
      popupWindow.addEventListener('beforeunload', (event) => {
        console.log('event :>> ', event);
      });
    }
  }

  onPlanChange(event: any) {
    let popupWindow: any;
    switch (event.target.value) {
      case 'month':
        this.planType = "https://buy.stripe.com/test_3cs2c3ggD57pc3S4gg";
        // this.planType = "https://billing.stripe.com/p/login/test_9AQaEX1Jf9F5640fYY";
        // popupWindow = window.open("https://buy.stripe.com/test_3cs2c3ggD57pc3S4gg", "_blank", "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left=50 top=100");
        break;
      case 'year':
        this.planType = "https://buy.stripe.com/test_bIY9EvaWj9nFfg48wx";

        // popupWindow = window.open("https://buy.stripe.com/test_bIY9EvaWj9nFfg48wx", "_blank", "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left=50 top=100");
        break;
    }
  }
}
