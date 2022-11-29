import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from './services/avatar.service';
//import { AvatarService } from 'src/app/services/avatar.service';
import { Usuario } from './services/usuario';
import { UsuariosService } from 'src/app/services/usuario.service';
import { ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent 
{
  usuario: Usuario[]=[];
  profile=null
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Viajar', url: '/viajar', icon: 'car' },
    { title: 'Perfil', url: '/perfil/', icon: 'person-circle' },
    { title: 'Conversor', url: '/conversor', icon: 'cash' },
    { title: 'About', url: '/about', icon: 'help-buoy' },
    
  ];
  
  public labels = ['DuocUC','Correo'];
  constructor(
    
    private authService:AuthService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private avatarService:AvatarService,
    private modalCtrl: ModalController
    
   ) 
    {
      this.avatarService.getUserProfile().subscribe((data)=>{
        this.profile=data;
      });
    }
    cargarAvatar(){
      this.avatarService.getUserProfile().subscribe(respuesta => {
        this.profile = respuesta;
      })
    }
  
    async uploadAvatar(){
      const avatar = await Camera.getPhoto({
        quality:90,
        allowEditing:false,
        resultType:CameraResultType.Base64,
        source:CameraSource.Camera //Photo o prompt
      });
      console.log(avatar);
  
      if(avatar){
        const loading = await this.loadingCtrl.create();
        await loading.present();
        const result = await this.avatarService.uploadAvatar(avatar);
        loading.dismiss();
  
        if(!result){
          this.alertPresent('Carga avatar fallida','Se ha producido un error, inténtelo más rato.');
        }
      }
    }
    async alertPresent(header:string,message:string){
      const alert = await this.alertCtrl.create({
        header:header,
        message:message,
        buttons: ['OK']
      });
      await alert.present();
    }
    
}

