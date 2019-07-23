import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { WindowRefService } from './services/common/common.service';
import { EditdeleteComponent } from './pages/editdelete/editdelete.component';
import { EditdeleteModule } from './pages/editdelete/editdelete.module';
import { EditdeletemapComponent } from './pages/editdeletemap/editdeletemap.component';
import { EditdeletemapModule } from './pages/editdeletemap/editdeletemap.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [EditdeleteComponent, EditdeletemapComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    EditdeleteModule,
    EditdeletemapModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WindowRefService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
