import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BdayListService {

  constructor(private http:HttpClient) { }

  getBdays(){
    return this.http.get('/api/bdays')
  }

  addBday(name: string, date: string, note: string) {
    return this.http.post('/api/bday/add',{name: name, date: date, note: note})
  }

  editBday(_id: string, name: string, date: string, note: string) {
    return this.http.put('/api/bday/'+_id,{name: name, date: date, note: note})
  }

  delBday(id:string){
    return this.http.delete('/api/bday/'+id)
  }
}
