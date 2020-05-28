import { Component, OnInit } from '@angular/core';
import {BdayListService} from '../bday-list.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private bdayListService: BdayListService, private router: Router, private toastr: ToastrService ) { }

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
    if(this.birthdate.name && this.birthdate.date){
      this.bdayListService.addBday(this.birthdate.name, this.birthdate.date, this.birthdate.note).subscribe((data:{error, doc})=>{
        if(data.error){
          this.toastr.error("Error in adding new Bday")
        }else{
          this.birthdate = {
            _id: "",
            name: "",
            date: "",
            note: ""
          }
          this.toastr.success('Added Successfully!!')
          this.loadBdays();
        }
      })
    }else{
      this.toastr.error("Name and Date field cannot be empty")
    }
    this.cancel();
  }

  searchBday(): void {
    if(this.birthdate.name){
      this.bdayListService.searchBday(this.birthdate.name).subscribe((data:{error,docs})=>{
        if(data.error){
          this.toastr.error("Error in searching Bday")
        }else{
          this.bdays = data.docs as BirthDay[]
          this.adding=false
        }
      })
    }else{
      this.adding=true
      this.loadBdays()
    }
  }

  editBday(): void {
    if(this.birthdate.name && this.birthdate.date){
      this.bdayListService.editBday(this.birthdate._id, this.birthdate.name, this.birthdate.date, this.birthdate.note).subscribe((data:{error, doc})=>{
        if(data.error){
          this.toastr.error("Error in editing Bday")
        }else{
          this.toastr.success("Edited Successfully!!")
          this.loadBdays();
        }
      }) 
    }else{
      this.toastr.error("Name and Date field cannot be empty")
    }
    this.cancel();
  }

  deleteBday(id: string): void {
    if(window.confirm("Are you sure you want to delete this birthday?")){
      this.bdayListService.delBday(id).subscribe((data: {err, doc})=>{
        if(!data.err){
          this.loadBdays();
          this.toastr.success("Deleted Successfully")
        }else{
          this.toastr.error("Error in deleting birthday!")
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
