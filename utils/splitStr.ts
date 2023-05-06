import { capitalize } from 'lodash';

export const splitStr=(str:string,regex:any)=>{
    return str.split(regex).map((item: string) => capitalize(item.trim()));
  }