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
      title: 'BASF Challan',
      children: [
        {
          title: 'Add BASF Challan',
          url: '/challan-details',
          icon: 'add'
        },
        {
          title: 'BASF Challan Details',
          url: '/view-challan-details',
          icon: 'list'
        },
      ]
    },
    {
      title: 'Vendor Challan',
      children: [
        {
          title: 'Add Vendor Challan',
          url: '/create-vendor-challan',
          icon: 'add'
        },
        {
          title: 'Vendor Challan Details',
          url: '/view-vendor-challan',
          icon: 'list'
        },
      ]
    }
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    // {
    //   title: 'Part Types',
    //   url: '/part-types',
    //   icon: 'list'
    // },
    // {
    //   title: 'Stock Inflow',
    //   children: [
    //     {
    //       title: 'Purchase Order',
    //       url: '/purchase-order',
    //       icon: 'add'
    //     },
    //     {
    //       title: 'Purchase Details',
    //       url: '/purchase-details',
    //       icon: 'list'
    //     },
    //   ]
    // }
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
