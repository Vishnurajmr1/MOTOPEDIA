import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/data-access/global/local-storage.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNavbarComponent {
  private localStoreService = inject(LocalStorageService);
  private router = inject(Router);

  logOut() {
    this.localStoreService.clear();
    this.router.navigateByUrl('/home');
  }
}
