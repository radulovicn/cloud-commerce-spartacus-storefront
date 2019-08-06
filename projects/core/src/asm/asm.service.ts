import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserToken } from '../auth/models/token-types.model';
import { UserAuthenticationTokenService } from '../auth/services/user-authentication/user-authentication-token.service';
@Injectable({
  providedIn: 'root',
})
export class AsmService {
  private agent: BehaviorSubject<UserToken>;
  //private customer: any;

  constructor(private authService: UserAuthenticationTokenService) {
    this.agent = new BehaviorSubject<UserToken>(undefined);
  }

  public loginAgent(userName: string, password: string) {
    console.log('AsmService.loginAgent', userName, password);
    this.authService
      .loadToken(userName, password)
      .subscribe(token => this.agent.next(token));
  }
  public logoutAgent() {
    this.agent.next(undefined);
  }
  public startCustomerSession(customerId: string) {
    console.log('AsmService.startCustomerSession', customerId);
  }
  public endCustomerSession() {}
  public getAsmCustomer() {}
  public getActiveCustomer() {}
  public getActiveAgent() {
    return this.agent;
  }
}
