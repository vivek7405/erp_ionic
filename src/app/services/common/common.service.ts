import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public loader: any;

  public async presentLoading(loadingCtrl: LoadingController) {
    this.dismissLoading();
    this.loader = await loadingCtrl.create({
      message: 'loading',
      backdropDismiss: false,
      showBackdrop: true
    });
    this.loader.present();
    return this.loader;
  }

  public async dismissLoading() {
    if (this.loader != null) {
      this.loader.dismiss();
      this.loader = null;
    }
  }


  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public async presentAlertWithCallBack(alertCtrl, header, msg, selfObj) {
    const alert = await alertCtrl.create({
      header: header,
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          selfObj.handlerForAlert();
        }
      }
      ]
    });
    await alert.present();
  }

  public async presentAlert(alertCtrl, header, msg) {
    const alert = await alertCtrl.create({
      header: header,
      message: msg,
      buttons: [{
        text: 'Ok',
      }
      ]
    });
    await alert.present();
  }

  public async toast(toastCtrl, message: string) {
    const toast = await toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }

  public downLoadFile(result, fileName) {
    const link = document.createElement('a');
    const file = new Blob([result], { type: 'application/pdf' });
    link.href = window.URL.createObjectURL(file);
    link.download = fileName + '.pdf';
    link.click();
  }
}
