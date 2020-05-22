import { Component, OnInit } from '@angular/core';
import {BdayListService} from '../bday-list.service';
import { Router } from '@angular/router';

interface BirthDay {
  _id: string,
  name: string,
  date:  string,
  note: string
}

@Component({
  selector: 'app-bday-list',
  templateUrl: './bday-list.component.html',
  styleUrls: ['./bday-list.component.css'],
})
export class BdayListComponent implements OnInit {

  bdays: BirthDay[] = []
  adding: boolean = true
  editing: boolean = false
  birthdate: BirthDay = {
    _id: "",
    name: "",
    date: "",
    note: ""
  }

  constructor(private bdayListService: BdayListService, private router: Router ) { }

  ngOnInit(): void {
    this.loadBdays();
  }

  loadBdays(): void {
    this.bdayListService.getBdays().subscribe((data: {docs,err})=>{
      if(data.err){
        console.log("Error in fetching tasks")
      }else{
        this.bdays = data.docs as BirthDay[]
      }
    })
  }

  addBday(): void {
    if(this.birthdate.name){
      this.bdayListService.addBday(this.birthdate.name, this.birthdate.date, this.birthdate.note).subscribe((data:{error, doc})=>{
        if(data.error){
          console.log("Error in adding new Task")
        }else{
          this.birthdate = {
            _id: "",
            name: "",
            date: "",
            note: ""
          }
          console.log("Added Successfully")
          this.loadBdays();
        }
      })
    }else{
      console.log("Name field can not be empty")
    }
  }

  editBday(): void {
    if(this.birthdate.name){
      this.bdayListService.editBday(this.birthdate._id, this.birthdate.name, this.birthdate.date, this.birthdate.note).subscribe((data:{error, doc})=>{
        if(data.error){
          console.log("Error in adding new Task")
        }else{
          console.log("Edited Successfully")
          this.loadBdays();
        }
      }) 
    }else{
      console.log("Name field can not be empty")
    }
    this.cancel();
  }

  deleteBday(id: string): void {
    if(window.confirm("Are you sure you want to delete this birthday?")){
      this.bdayListService.delBday(id).subscribe((data: {err, doc})=>{
        if(!data.err){
          this.loadBdays();
        }else{
          console.log("Error in deleting birthday!")
        }
      })
    }
  }

  edit(index: number): void {
    this.birthdate = this.bdays[index]
    this.adding = false
    this.editing = true
  }

  cancel(): void {
    this.birthdate = {
      _id: "",
      name: "",
      date: "",
      note: ""
    }
    this.adding = true
    this.editing = false
    this.loadBdays();
  }
}
