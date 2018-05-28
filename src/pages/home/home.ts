import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  public userName: string;
  public imageSource: Observable<string>;
  public uid: string;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private afs: AngularFireStorage) {
    this.uid = localStorage.uid;
  }
  public ngAfterViewInit(): void {
    this.userName = localStorage.userName;
  }

  public ionViewWillEnter(): void {
    const filePath = `${this.uid}.jpg`;
    this.imageSource = undefined;
    this.afs.ref(filePath).getDownloadURL().subscribe((l => {
      if (l !== undefined) {
        this.imageSource = l;
      }
    }));
  }

  public signOut(): void {
    this.afAuth.auth.signOut()
      .then((s) => {
        console.log(s)        
        this.navCtrl.insert(0, LoginPage).then(() => {
          this.navCtrl.popToRoot();
        });
      })
      .catch((e) => console.log(e));
  }
}
