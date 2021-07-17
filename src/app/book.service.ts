import { Injectable, Type } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from './book';
import { Content } from '@angular/compiler/src/render3/r3_ast';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  bookUrl="api/books";

  constructor(private http:HttpClient)  { }

  // getBookFromStore():Observable<Book[]>{
  //  return this.http.get<Book[]>(this.bookUrl);

  // }

   
  // getBookFromStore(id:number):Observable<Book>{
  //   return this.http.get<Book>(this.bookUrl+"/"+id);
 
  //  }   // // use for one id async pipe ngIf

   getBookFromStore():Observable<Book[]>{
   return this.http.get<Book[]>(this.bookUrl);

  }
 
  createbook(book:Book):Observable<Book>{
  //   let httpheaders=new HttpHeaders()
  //  .set('Content-Type','application/json');
  //  let options={
  //    headers:httpheaders
  //  };
   //return this.http.post<Book>(this.bookUrl,book, options);
   return this.http.post<Book>(this.bookUrl,book);
   }


   getbookbyid(bookid:string){
      return this.http.get<Book>(this.bookUrl+"/"+bookid);
   }
 
   updatebook(book:Book):Observable<number>{
     return this.http.put<number>(this.bookUrl+"/"+book.id,book);
     }

     Deletebook(bookid:string):Observable<number>{
       return this.http.delete<number>(this.bookUrl+"/"+bookid);
       }



}
