import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../data-access/user.service';
import { UserDoc } from 'src/app/shared/types/user.Interface';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';

@Component({
  selector: 'search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent {
  userService=inject(UserService);
  snackBarService=inject(SnackbarService)
  searchResult:UserDoc[]=[];
  @Input()
  openSearchBar!: boolean;
closeModal() {
  this.openSearchBar=!this.openSearchBar;
}
getSearchValue(search:string){
  this.userService.searchUserDetails(search).subscribe({
    next:(response) => {
      console.log(response);
      this.searchResult=response.data
    },
    error:(error)=> {
      this.snackBarService.showError(error.message);
    },
  })
}
}
