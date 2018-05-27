import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public task: AngularFireUploadTask;
  public progress: any;
  public image: string;
  public uid: string;

  constructor(public navCtrl: NavController, private camera: Camera, private pickr: ImagePicker, private afs: AngularFireStorage) {
    this.uid = localStorage.uid;
    this.image = '../../assets/imgs/no-image.svg'
  }

  public async takePhoto() {
    const file = await this.getPicture();
    this.image = 'data:image/jpg;base64,' + file;
  }

  public async gallery() {
    const file = await this.getPictureFromGallery();
    this.image = 'data:image/jpg;base64,' + file;
  }

  public uploadImage(): void {
    const filePath = `${this.uid}.jpg`;
    this.task = this.afs.ref(filePath).putString(this.image, 'data_url');
  }

  private async getPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 300,
      targetHeight: 300,
    }
    return await this.camera.getPicture(options);
  }

  private async getPictureFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 300,
      targetHeight: 300,
    }
    return await this.camera.getPicture(options);
  }
}
