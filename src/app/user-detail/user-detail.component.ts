import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { User, UserService } from '../core/services/user.service';


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
  }

  goBack() {
    this.router.navigate(['/users'])
  }

}
