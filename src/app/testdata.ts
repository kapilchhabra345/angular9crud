import {InMemoryDbService} from 'angular-in-memory-web-api';

export class Testdata implements InMemoryDbService{
createDb(){
    let bookDetails=[
  {id:100,name:'Angular by kapil',category:'chhabra',writer:'kapil'},
  // {id:101,name:'Angular by sohan',category:'gupta'},
  // {id:102,name:'Angular by mohan',category:'kumar'}
    ];
    return {books:bookDetails};
}
}