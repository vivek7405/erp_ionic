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
      children: [
        {
          title: 'Add New Product',
          url: '/product-details',
          icon: 'add'
        },
        {
          title: 'View Product Details',
          url: '/view-product-details',
          icon: 'list'
        },
      ]
    },
    {
      title: 'BASF Challan/PO',
      children: [
        {
          title: 'Add BASF Challan/PO',
          url: '/challan-details',
          icon: 'add'
        },
        {
          title: 'BASF Challan/PO Details',
          url: '/view-challan-details',
          icon: 'list'
        },
      ]
    },
    {
      title: 'Vibrant NG/FG Challan',
      children: [
        {
          title: 'Add Vibrant NG/FG Challan',
          url: '/create-vendor-challan',
          icon: 'add'
        },
        {
          title: 'Vibrant NG/FG Challan Details',
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
