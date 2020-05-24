import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root'
})
export class BdayListService {

  constructor(private http:HttpClient, private auth: AuthenticationService) { }

  getBdays(){
    return this.http.get('/api/bdays',{
    headers: {
      Authorization: `${this.auth.getToken()}`
    }
  })
}

  addBday(name: string, date: string, note: string) {
    return this.http.post('/api/bday/add',{name: name, date: date, note: note},{
      headers: {
        Authorization: `${this.auth.getToken()}`
      }
    })
  }

  editBday(_id: string, name: string, date: string, note: string) {
    return this.http.put('/api/bday/'+_id,{name: name, date: date, note: note},{
      headers:{
        Authorization: `${this.auth.getToken()}`
      }
    })
  }

  delBday(id:string){
    return this.http.delete('/api/bday/'+id,{
      headers:{
        Authorization: `${this.auth.getToken()}`
      }
    })
  }
}
