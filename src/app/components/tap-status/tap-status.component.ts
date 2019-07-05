import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TapService } from 'src/app/services/tap.service';
import { Events, AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'tap-status',
  templateUrl: './tap-status.component.html',
  styleUrls: ['./tap-status.component.scss'],
})
export class TapStatusComponent implements OnInit {

    appName: string = '';
    userName: string = '';

  constructor(public tapService: TapService,
    public events: Events,
    public alertCtrl: AlertController,
    public changeDetector: ChangeDetectorRef,
    public loadingCtrl: LoadingController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.events.subscribe('connected',() => {
      console.log('binding tap status');
      this.makeBinds()
    });

    this.events.subscribe('disconnected', () => {
      this.changeDetector.detectChanges(); //force view update
    })
  }

  async makeBinds() {
    this.appName = (await this.tapService.tap.service.interface.getAppName()).body();
    this.tapService.tap.sessionState.subscribe(_ => {
      this.userName = _.name;
      this.changeDetector.detectChanges();
    });
    this.tapService.sessionStateForceUpdate();
  }

  async openLoginAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Ok',
          handler: async (data) => {
            alert.dismiss();
            await this.login(data['username'], data['password']);
            this.changeDetector.detectChanges();
          }
        }
      ]
    });
    alert.present();
  }

  async login(username: string, password: string) {
    const loader = await this.loadingCtrl.create({ message: 'Logging in' });
    loader.present();

    try {
      const logSuccess = await this.tapService.login(username, password);
      loader.dismiss();
      if (logSuccess) {
        this.showToast(`Logged in as ${username}`);
      } else {
        this.showToast(`Wrong username or password`);
      }

    } catch (error) {
      loader.dismiss();
      console.error(error);
      this.showClosingToast(`Login error : ${error.message? error.message: error}`);
    }

  }

  async openLogoutAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            alert.dismiss();
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }

  async logout() {
    const loader = await this.loadingCtrl.create({ message: 'Logging out' });
    loader.present();

    try {
      const logSuccess = await this.tapService.logout();
      loader.dismiss();
      if (logSuccess) {
        this.showToast(`Logged out`);
      } else {
        this.showToast(`Could not log out`);
      }

    } catch (error) {
      loader.dismiss();
      console.error(error);
      this.showClosingToast(`Logout error : ${error}`);
    }
  }

  async showToast(message: string, duration: number = 3000): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });

    toast.present();
  }

  async showClosingToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
    });

    toast.present();
  }

}
