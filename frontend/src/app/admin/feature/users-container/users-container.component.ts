import { ChangeDetectionStrategy, Component } from '@angular/core';
import { inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
import { UserDoc } from 'src/app/shared/interfaces/Interface';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css'],
})
export class UsersContainerComponent {
  protected users!: UserDoc[];
  private adminService = inject(AdminService);
  private snackbarService = inject(SnackbarService);
  constructor() {}
  ngOnInit() {
    this.adminService.getUsers().subscribe((res: any) => {
      this.users = res.data;
    });
  }
  confirmUnblock(userId: string) {
    this.adminService.unblockUser(userId).subscribe((res: Object) => {
      if (res.hasOwnProperty('status')) {
        const userIndex = this.users.findIndex((user) => user._id == userId);
        if (userIndex !== -1) {
          this.users[userIndex].isBlocked = false;
        }
        this.snackbarService.showSuccess('Unblocked the user');
      }
    });
  }
  confirmBlock(userId: string) {
    const reason = 'heleo';
    console.log(userId);
    this.adminService.blockUser(userId, reason).subscribe((res: Object) => {
      if (res.hasOwnProperty('status')) {
        const userIndex = this.users.findIndex((user) => user._id == userId);
        if (userIndex !== -1) {
          this.users[userIndex].isBlocked = true;
        }
        this.snackbarService.showSuccess('Blocked the user');
      }
    });
  }
}
