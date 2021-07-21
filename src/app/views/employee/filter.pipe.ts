import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // use of custom pipe to filter data from table using firstName of user
  transform(value: any, filterString: string, props: string): any {
    if(value.length === 0 || filterString.toLowerCase() === ''){
      return value;
    }

    const filterArr = [];
    for(const eachValue of value){
      if(eachValue[props].toLowerCase() === filterString.toLowerCase()){
        filterArr.push(eachValue);
      }
    }
    return filterArr;
  }

}
