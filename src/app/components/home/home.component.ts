import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BodeService } from 'src/app/services/bode/bode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = '';

  private destroy = new Subject<any>();
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {


    this.authService.isAdmin.pipe(
      takeUntil(this.destroy)
    ).subscribe((res) => (this.isAdmin = res));

  }



}
