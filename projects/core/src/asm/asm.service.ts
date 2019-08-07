import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/facade/auth.service';
import { UserToken } from '../auth/models/token-types.model';
import { UserAuthenticationTokenService } from '../auth/services/user-authentication/user-authentication-token.service';
@Injectable({
  providedIn: 'root',
})
export class AsmService {
  private agent: BehaviorSubject<UserToken>;
  private customer: BehaviorSubject<string>;

  constructor(
    private authService: UserAuthenticationTokenService,
    private authFacade: AuthService
  ) {
    this.agent = new BehaviorSubject<UserToken>(undefined);
    this.customer = new BehaviorSubject<string>(undefined);
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
    this.customer.next(customerId);
    this.agent
      .subscribe(agentToken => this.authFacade.authorizeWithToken(agentToken))
      .unsubscribe();
  }
  public endCustomerSession() {
    this.customer.next(undefined);
    this.authFacade.logout();
  }
  public getActiveCustomer() {
    return this.customer;
  }
  public getActiveAgent() {
    return this.agent;
  }
}
