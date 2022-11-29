import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  async register(email:string,password:string){
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email,password);
      return user;
    } catch (error) {
      return null;
    }
  }

  async login(email:string,password:string){
    try {
      const user = await signInWithEmailAndPassword(this.auth, email,password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
  async getUid(){
   const user = await this.auth.currentUser;
   if(user){
    return user.uid;
   }
   else{
    return null;
   }
   
  }
}
