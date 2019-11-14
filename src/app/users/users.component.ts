import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  columns = [];
  users: User[];

  constructor(private userService: UsersService) { }

  ngOnInit() {

     this.columns = ['id', 'firstname', 'lastname', 'email', 'age', 'actions'];

     this.userService.getAllUsers().subscribe( (users) => {
          this.users = users;
     });

  }

  onEdit(id: number) {
      
  }

}
