import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Storage,ref,getDownloadURL,uploadString} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage:Storage) { }

  getUserProfile()
  {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    return docData(userDocRef);
  }

  getUsuarios(): Observable<Usuario[]> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    return collectionData(usuariosRef, {idField:'id'}) as Observable<Usuario[]>;
  }

  getUsuarioById(id:string): Observable<Usuario> {
    const usuarioRef = doc(this.firestore,`usuarios/${id}`);
    return docData(usuarioRef,{idField:'id'}) as Observable<Usuario>;
  }
  
  updateUsuario(usuario: Usuario){
    const usuarioRef = doc(this.firestore,`user/${usuario.id}`);
    return updateDoc(usuarioRef,
      {
        name:usuario.name,
        lastname:usuario.lastname,
        gender:usuario.gender,
        age:usuario.age,
        email:usuario.email,
        phone:usuario.phone,
        university:usuario.university,
        city:usuario.city
      });
  }

  deleteUsuario(usuario:Usuario){
    const usuarioRef = doc(this.firestore,`usuarios/${usuario.id}`);
    return deleteDoc(usuarioRef) ;
  }
}

