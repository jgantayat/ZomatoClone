import { Component, inject, OnInit, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
@Component({
  selector: 'app-root',
  imports: [ NzLayoutModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ZomatoClone');

  private store = inject(Store)
  ngOnInit(): void {
    console.log('Initial State Snapshot: ', this.store.snapshot())
  }
}
 