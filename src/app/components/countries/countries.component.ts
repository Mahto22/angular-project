import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
//import { GoogleChartInterface } from 'ng2-google-charts';
import {  map } from 'rxjs/operators'; 
import { observable , merge } from 'rxjs';
import { DateWiseData } from 'src/app/models/date-wise-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummery[];

countries : string[] = [];

totalConfirmed=0;
  totalActive=0;
  totalRecovered=0;
  totalDeaths=0;
  //loading = true;
  //date wise data
  selectedCountryData :DateWiseData[]; 
  dateWiseData ;
  // lineChart : GoogleChartInterface ={
  //   chartType : 'LineChart'
  // }
  chart = {
    LineChart :'LineChart',
    height :500,

  options :{
      animation: {
        duration: 1000,
        easing: 'out'
      },
      is3D : true
    }
  }
  constructor(private service:DataServiceService) { }

  ngOnInit(): void {

merge(
  this.service.getDateWiseData().pipe(
    map(result=>{
      this.dateWiseData = result;
    })
  ),

  this.service.getDateWiseData().pipe(
    map(result=>{
      //this.data = result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
   })
  )
        
).subscribe(
  {
  complete : ()=>{
    this.selectedCountryData = this.dateWiseData['india'];
    this.updateChart();
   // this.loading =false;
  }
  
})
    //datewise data service call
    

   
  }
//update chart for datewise data line chart
updateChart(){
  let dataTable = [];
  dataTable.push(['Date' , 'Cases'])
  this.selectedCountryData.forEach(cs=>{
    dataTable.push([cs.date ,cs.cases])
  })
  // this.lineChart ={
  //   chartType : 'LineChart',
  //   dataTable :dataTable,
  //   options :{
  //     height :500,

  //     // animation: {
  //     //   duration: 1000,
  //     //   easing: 'in'
  //     // },
  //   },
  // };
}
  updateValue(country : string){
    //console.log(country);
    
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
      }
    })
  



    this.selectedCountryData = this.dateWiseData[country]
  //console.log(this.selectedCountryData);
  this.updateChart();
  
  }
} 

