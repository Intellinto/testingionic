import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { TabsPage } from '../tabs/tabs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
        this.afAuth.authState.subscribe((e) => {
            if(e) {

                localStorage.setItem('uid', e.uid);
                this.afs.collection('users').doc(e.uid).valueChanges().subscribe((s: any) => {
                    localStorage.setItem('userName', s.name);
                    this.navCtrl.push(TabsPage);
                });            
            }
        });
    }

    public signIn(): void {
        this.afAuth.auth.signInWithEmailAndPassword('ll@kc.dk', '111111')
            .then((s) => {
                this.serUser(s)
                this.navCtrl.push(TabsPage);
            })
            .catch((e) =>
                console.log(e)
            );
    }


    private serUser(s: any): void {
        localStorage.setItem('uid', s.user.uid);
        this.afs.collection('users').doc(s.user.uid).valueChanges().subscribe((s: any) => {
            localStorage.setItem('userName', s.name);
        });
    }
}
