import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { Usuario } from 'src/app/services/usuario';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuario.service';
import { ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  })

export class PerfilPage implements OnInit {
  pageTitle = 'Perfil';
  isNotHome = true;
  //@Input() id:string;
  profile: any = null;
  usuario: Usuario[]=[];
  uid:string =null;
  

  constructor(private authService:AuthService, 
    private avatarService: AvatarService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private usuarioService:UsuariosService, private modalCtrl:ModalController,
    private toastCtrl:ToastController) {
      this.cargarAvatar();
    }

    async logout(){
      await this.authService.logout();
      this.router.navigateByUrl('/',{replaceUrl:true});
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
    async ngOnInit() {
      this.getUsuario();
      const uid = await this.authService.getUid();
      if(uid){
        this.uid=uid;
        console.log('uid ->',this.uid);
      }
      else{
        console.log('usuario no encontrado o no existe');

      }
    }
  
    getUsuario(){
      this.usuarioService.getUsuarios().subscribe(respuesta => {
        this.usuario = respuesta;
      })
    }
  
 
    async toastPresent(message:string){
      const toast = await this.toastCtrl.create({
        message:message,
        duration:1000,
      });
      toast.present();
    }
    getUsuarios(){
      this.usuarioService.getUsuarios().subscribe(respuesta => {
        console.log(respuesta);
        this.usuario = respuesta;
      })
    }
  
    async addUsuario(){
      const alert = await this.alertCtrl.create({
        header:'Añadir Datos',
        inputs:[
          {
            name:'name',
            type:'text',
            placeholder:'nombre'
          },
          {
            name:'lastname',
            type:'text',
            placeholder:'Apellido'
          },
          {
            name:'gender',
            type:'text',
            placeholder:'genero'
          },
          {
            name:'age',
            type:'number',
            placeholder:'Edad'
          },
          {
            name:'email',
            type:'email',
            placeholder:'correo Electronico'
          },
          {
            name:'phone',
            type:'number',
            placeholder:'Telefono'
          },
          {
            name:'university',
            type:'text',
            placeholder:'Universidad'
          },
          {
            name:'city',
            type:'text',
            placeholder:'Ciudad'
          }
        ],
        buttons:[
          {
            text:'Cancelar',
            role:'cancel'
          },
          {
            text:'Confirmar',
            role:'confirm',
            handler:(data) =>{
              this.usuarioService.addUsuario(data);
              this.toastPresent('informacion agregada');
            }
          }
        ]
      });
      await alert.present();
    }
  
    async openDetailUsuario(usuario:Usuario){
      const modal= await this.modalCtrl.create({
        component:UsuariosService,
        componentProps: {id: usuario.id},
        breakpoints:[0,0.5,0.8],
        initialBreakpoint:1,
      })
      modal.present();
    }
  
    
}
