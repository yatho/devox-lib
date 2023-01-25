import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class CrudService<ID, T> {
  constructor(private url: string, protected http: HttpClient) { }

  public get(id: ID): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  public getList(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.url);
  }

  public create(item: T): Observable<T> {
    return this.http.post<T>(this.url, item);
  }

  public update(id: ID, item: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, item);
  }

  public delete(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
