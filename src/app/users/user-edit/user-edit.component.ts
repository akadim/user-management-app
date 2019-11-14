import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userId: number;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute, private router: Router, private userService: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
      this.route.params.subscribe( params => {

            
          this.userForm = this.formBuilder.group({
              firstname: ['', Validators.required],
              lastname: ['', Validators.required],
              email: ['', [Validators.required, Validators.email]],
              age: ['', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]]
          });

          if(params['id']) {
            this.userId = parseInt(params['id']);

            this.userService.getUser(this.userId).subscribe( (user) => {

              this.userForm = this.formBuilder.group({
                  firstname: [user.firstname, Validators.required],
                  lastname: [user.lastname, Validators.required],
                  email: [user.email, [Validators.required, Validators.email]],
                  age: [user.age, [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]]
              });

            });
          }

      });
  }

  onSubmit() {

     if(this.userId !== null && this.userId !== undefined) {
      this.userService.updateUser(this.userForm.value, this.userId).subscribe((response) => {
            this.router.navigate(['/users']).then( () => {
                this.toastr.success("User successfully updated!", "Success!");
            });
      });
     } else {
       this.userService.addUser(this.userForm.value).subscribe( (response) => {
        this.router.navigate(['/users']).then( () => {
            this.toastr.success("User successfully added!", "Success!");
        });
       });
     }
     
  }

  onCancel() {
     this.router.navigate(['/users']);
  }

}
