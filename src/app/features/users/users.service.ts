import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { EndPoints } from '../../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends HttpService {


  public refreshUsersList$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(http: HttpClient) {
    super(http);
    this.url = EndPoints.users;
  }

}
