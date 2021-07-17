import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {BookService} from './book.service';
import {Book} from './book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
// softBooks:Book[]; // use for subscribe
// softBooks:Observable<Book[]>;  // use for async pipe
softBooks:Observable<Book>;  //// use for async pipe ngif
// softBooks:Observable<string>;  // map wrong
datasaved=false;
bookForm:FormGroup;
allbooks:Observable<Book[]>;

constructor(private formbuilder:FormBuilder,private bookservice:BookService){}

ngOnInit(){
  this.bookForm=this.formbuilder.group({
    name:['',[Validators.required]],
    category:['',[Validators.required]],
    writer:['',[Validators.required]]
  });
  this.getsoftBooks();
}

onFormSubmit(){
  this.datasaved=false;
  let book=this.bookForm.value;
  this.createbook(book);
  this.bookForm.reset();}




getsoftBooks(){
 // this.bookservice.getBookFromStore().subscribe(books=>this.softBooks=books); // use for subscribe
 // this.softBooks=this.bookservice.getBookFromStore();   // // use for async pipe data aa gya
 //this.softBooks=this.bookservice.getBookFromStore(100);   // use for one id async pipe ngIf
 //this.softBooks=this.bookservice.getBookFromStore(100).map(book=>'Name:'+book.name);  //map wrong
this.allbooks=this.bookservice.getBookFromStore();

}


bookidToUpdate=null;
booktoEdit(bookid:string){
  this.bookservice.getbookbyid(bookid).subscribe(book=>{
    this.bookidToUpdate=bookid;
    this.bookForm.controls['name'].setValue(book.name);
    this.bookForm.controls['category'].setValue(book.category);
    this.bookForm.controls['writer'].setValue(book.writer);
   
  })
}

createbook(book:Book){
if(this.bookidToUpdate==null){
  this.bookservice.createbook(book).subscribe(
    book=>{
      this.datasaved=true;
      this.getsoftBooks();
      this.bookidToUpdate=null;
    })
}
else
{
  book.id=this.bookidToUpdate;
  this.bookservice.updatebook(book)
  .subscribe(book=>{
    this.datasaved=true;
    this.getsoftBooks();
    this.bookidToUpdate=null;
  })
}
  }
 
  BookDelete(bookid:string){
    this.bookservice.Deletebook(bookid)
    .subscribe(book=>{
      this.getsoftBooks();
    })
  }


}
