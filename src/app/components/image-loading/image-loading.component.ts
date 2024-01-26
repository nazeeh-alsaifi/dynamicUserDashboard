import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-image-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './image-loading.component.html',
  styleUrl: './image-loading.component.css'
})
export class ImageLoadingComponent {
  isLoading: boolean = true;
  @Input()
  src:string;

  onLoad() {
    this.isLoading = false;
  }
}
