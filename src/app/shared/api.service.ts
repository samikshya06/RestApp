import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl ="http://localhost:3000";
  constructor(private _http:HttpClient) { }

  // create Restaurant using post
  postRestaurant(data:any){
    return this._http.post<any>(`${this.serverUrl}/posts`,data).pipe(map((res:any)=>{
      return res;
    }));
  }

  //Get Restaurant
  getRestaurant(){
    return this._http.get<any>(`${this.serverUrl}/posts`).pipe(map((res:any)=>{
      return res;
    }));
  }

    //Update Restaurant using PUT
    updateRestaurant(id: number,data: any){
      return this._http.put<any>(`${this.serverUrl}/posts/${id}`,data).pipe(map((res:any)=>{
        return res;
      }));
    }
 //delete Restaurant using delete
    deleteRestaurant(id: number){
      return this._http.delete<any>(`${this.serverUrl}/posts/${id}`).pipe(map((res:any)=>{
        return res;
      }));
    }
}
