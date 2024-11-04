import { Injectable } from '@angular/core';
import {DataLoaderService} from './data-loader.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dataLoader: DataLoaderService) { }

  public getData(key: string, args?: Array<any>): any {
    if (localStorage.getItem(key) === "") {
      this.dataLoader.getData(key, args).subscribe(data => {
        this.setValue(key, data);
        return JSON.parse(localStorage.getItem(key));
      })
    }

    return JSON.parse(localStorage.getItem(key));
  }

  public setValue(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }
}
