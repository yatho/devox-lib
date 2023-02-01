import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'fwk';
import { Consumer } from '../models/Consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService extends CrudService<number, Consumer> {
  constructor(protected override http: HttpClient) { 
    super('/api/consumers', http);
  }
}
