import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { GlobalDataSummery } from '../models/globalData';
import { DateWiseData } from '../models/date-wise-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  //country wise data api
  private GlobalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/72a8e3aa629041abf9d80341d49dd0f24aaefd6d/csse_covid_19_data/csse_covid_19_daily_reports/04-15-2020.csv';
  //date wise data api
  private datewiseDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/72a8e3aa629041abf9d80341d49dd0f24aaefd6d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

  constructor(private http: HttpClient) { }

// date wise data service
getDateWiseData(){
  return this.http.get(this.datewiseDataUrl, {responseType : 'text'})
  .pipe(map(result=>{
    let rows = result.split('\n');
    //console.log(rows);
    
let mainData = {};

    let header =rows[0];
    let dates = header.split(',');
    dates.splice(0 , 4);

    //console.log(dates);
rows.splice(0 , 1);

rows.forEach(row=>{
  let cols = row.split(',');
  let con = cols [1];
  cols.splice(0 , 4);
  //console.log(con ,cols);

  mainData[con] = [];
  cols.forEach((value , index)=>{

    let dw : DateWiseData ={
      cases : +value ,
      country : con,
      date : new Date(Date.parse(dates[index]))
    }
    mainData[con].push(dw)
  })
})


//console.log(mainData);

    return mainData;
  })
  )
}

// country wise data service
getGlobalData(){
  return this.http.get(this.GlobalDataUrl,{responseType:'text'}).pipe(
    map(result=>{
      //console.log(result);
      //return result;
      let data: GlobalDataSummery[]=[];
         let raw = {}

      let rows=result.split('\n');
      rows.splice(0 , 1);
      console.log(rows);
      rows.forEach(row=>{
        let cols=row.split(',')
       // console.log(cols);

       let cs = {
        
          country :cols[3],
          confirmed :+ cols[7],
          deaths :+ cols[8],
          recovered : + cols[9],
          active : + cols[10],
         
        };

        let temp :GlobalDataSummery = raw[cs.country];
        if(temp){
          temp.active = cs.active + temp.active
          temp.confirmed = cs.confirmed + temp.confirmed
          temp.deaths = cs.deaths + temp.deaths
          temp.recovered = cs.recovered + temp.recovered
          
          raw[cs.country]=temp;
        
        }
        else{
          raw[cs.country] = cs;
        }
        
      })
      //console.log(raw);
      
      return <GlobalDataSummery[]>Object.values(raw);
    })
  )
}
}
