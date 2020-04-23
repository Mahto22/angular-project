import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
//import { GoogleChartInterface } from 'ng2-google-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed=0;
  totalActive=0;
  totalRecovered=0;
  totalDeaths=0;
  loading = true;
  globalData : GlobalDataSummery[];

   datatable =[];

chart = {
  PieChart : "PieChart",
  ColumnChart : "ColumnChart",
 height : 500,
  options: {
    
    animation: {
      duration: 1000,
      easing: 'out'
    },
    is3D :true
  }
}

//   pieChart: GoogleChartInterface ={
//  chartType : "PieChart"
//   }

//   columnChart : GoogleChartInterface = {
//     chartType  :'ColumnChart'
//   }

  constructor(private dataservice: DataServiceService) { }


initChart(caseType : String){

  this.datatable =[];
  //this.datatable.push(["Country", "Cases"])
  this.globalData.forEach(cs=>{

    let value : number;
    
    if(caseType == 'c')
    if(cs.confirmed > 2000)
    value = cs.confirmed

if(caseType == 'a')
if(cs.active > 2000)
 value = cs.active

 if(caseType == 'r')
if(cs.recovered > 2000)
 value = cs.recovered

 if(caseType == 'd')
if(cs.deaths > 1000)
 value = cs.deaths

    this.datatable.push([
      cs.country , value
    ])
  })
console.log(this.datatable);



// options: {
//   height : 500,
//   // animation: {
//   //   duration: 1000,
//   //   easing: 'in'
//   // },
// },
//   };


  // this.columnChart = {
  //   chartType : 'ColumnChart',
  //   dataTable: datatable,
  //   //firstRowIsData: true,
    
  //   options: {
  //     height : 500
  //   },
  //     };

}

  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe({
      next : (result)=>{
        //console.log(result);

this.globalData = result;

        result.forEach(cs=>{

          if(!Number.isNaN(cs.confirmed)){
          this.totalConfirmed +=cs.confirmed
          this.totalActive +=cs.active
          this.totalRecovered +=cs.recovered
          this.totalDeaths +=cs.deaths
          }
        })

this.initChart('c');


      },
      complete : ()=>{
        this.loading =false;
      }
      }
    )
  }

  updateChart(input : HTMLInputElement){
    //console.log(input.value);
    this.initChart(input.value);
  }
}
