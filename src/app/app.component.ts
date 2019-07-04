import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Product Details',
      url: '/product-details',
      icon: 'list'
    },
    {
      title: 'BASF Jobwork Challan',
      children: [
        {
          title: 'Add Jobwork Challan',
          url: '/challan-details',
          icon: 'add'
        },
        {
          title: 'Jobwork Challan Details',
          url: '/view-challan-details',
          icon: 'list'
        },
      ]
    },
    {
      title: 'Vibrant Challan',
      children: [
        {
          title: 'Add Vibrant Challan',
          url: '/create-vendor-challan',
          icon: 'add'
        },
        {
          title: 'Vibrant Challan Details',
          url: '/view-vendor-challan',
          icon: 'list'
        },
      ]
    }    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
