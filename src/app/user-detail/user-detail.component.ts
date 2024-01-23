import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserService } from '../user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  user!: User;
  selectedId = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: UserService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => this.selectedId = parseInt(params.get('id')!))
    this.service.getUser(this.selectedId).subscribe(user => this.user = user.data);
    console.log(this.user, this.selectedId);
  }

  goBack() {
    this.router.navigate(['/users'])
  }

}
