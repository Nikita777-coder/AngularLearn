import { Injectable } from '@angular/core';
import {DataLoaderService} from './data-loader.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dataLoader: DataLoaderService) { }

  public getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public setValue(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }
}

