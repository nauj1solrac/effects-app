import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface User{
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'https://reqres.in/api';

  constructor(
    private http: HttpClient
  ){}

  getUsers(){
    return this.http.get<User>(`${this.url}/users?per_page=6&&delay=3`)
    .pipe(
      map(resp => resp['data'])
    );
  }

  getUsersById(id: string){
    return this.http.get<User>(`${this.url}/users/${id}`)
    .pipe(
      map(resp => resp['data'])
    );
  }
}
