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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  profilecredentials!:FormGroup;
  

  constructor(private authService:AuthService, 
    private avatarService: AvatarService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private formbuilder: FormBuilder,
    private usuarioService:UsuariosService, private modalCtrl:ModalController,
    private toastCtrl:ToastController) {
      this.cargarAvatar();
      this.getUserProfile();
    }
    
    ngOnInit(): void {
      this.createForm();
      
    }
    
    
  
    getUserProfile(){
      this.avatarService.getUserProfile().subscribe((respuesta: any) => {
        this.profile = respuesta;
        console.log(respuesta)
        this.fillForm();
      })
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
    get email(){
      return this.profilecredentials?.get('email');
    }
  
    get name(){
      return this.profilecredentials?.get('name');
    }
  
    get lastname(){
      return this.profilecredentials?.get('lastname');
    }
  
    get address(){
      return this.profilecredentials?.get('address');
    }
  
    get commune(){
      return this.profilecredentials?.get('commune');
    }
  
    get region(){
      return this.profilecredentials?.get('region');
    }
    createForm(){
 
        this.profilecredentials = this.formbuilder.group({
          email: [{value: '',  disabled: true}, [Validators.required,Validators.email]],
          name: [ {value: ''}, [Validators.required]],
          lastname: [ {value: ''}, [Validators.required]],
          gender: ['', Validators.required],
          address: ['', Validators.required],
          commune: ['', Validators.required],
          region: ['', Validators.required],
          campus: ['', Validators.required],
        });
      }
    
      async alertPresent(header:string, message: string) {
        const alert = await this.alertCtrl.create({
          header: header,
          message: message,
          buttons: ['OK']
        })
      }

    fillForm() {
      this.profilecredentials.patchValue({
        email: this.profile?.email,
        name: this.profile?.name,
        lastname: this.profile?.lastname,
        gender: this.profile?.gender,
        address: this.profile?.address,
        commune: this.profile?.commune,
        region: this.profile?.region,
        campus: this.profile?.campus,
        car: this.profile?.car,
        tripCost: this.profile?.tripCost
      })
    }

    updateProfile() {
      console.log(this.profilecredentials.value)
      this.authService.updateUsuario(this.profilecredentials.value);
    }

    
}
