import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';
@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.scss']
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restObject: RestaurantData = new RestaurantData;
  allRespData: any;
  showAdd!:boolean;
  showBtn!:boolean;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {

  }
  ngOnInit() {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      services: [''],
      address: [''],
    });
    this.getAllData();
  }

  // add's a new restaurant
  addRestaurant() {
    this.restObject.name = this.formValue.value.name;
    this.restObject.email = this.formValue.value.email;
    this.restObject.mobile = this.formValue.value.mobile;
    this.restObject.address = this.formValue.value.address;
    this.restObject.services = this.formValue.value.services;

    this.apiService.postRestaurant(this.restObject).subscribe(d => {
      console.log(d);
      alert("Restaurant record added successfully :)");
      this.formValue.reset();
      this.getAllData();
    },
      err => {
        console.log(err);
      })
  }

  // closeModal() {
  //   this.formValue.reset();
  // }

  // displays all restaurants
  getAllData() {
    this.apiService.getRestaurant().subscribe({
      next: (v) => {
        this.allRespData = v;
        console.log(this.allRespData)
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  //delete's a restaurant
  deleteRest(id: number) {
    this.apiService.deleteRestaurant(id).subscribe({
      next: (d) => {
        console.log(`deleted data ${d}`);
        alert("Restaurant record deleted successfully :)");
        this.getAllData();
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  updateRest() {

    this.restObject.name = this.formValue.value.name;
    this.restObject.email = this.formValue.value.email;
    this.restObject.mobile = this.formValue.value.mobile;
    this.restObject.address = this.formValue.value.address;
    this.restObject.services = this.formValue.value.services;
    this.apiService.updateRestaurant(this.restObject.id, this.restObject).subscribe({
      next: (d) => {
        alert("Restaurant record updated successfully :)");
        this.getAllData();
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  onEdit(data: RestaurantData) {
    this.showAdd = false;
    this.showBtn = true;
    this.restObject.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['services'].setValue(data.services);
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
}
