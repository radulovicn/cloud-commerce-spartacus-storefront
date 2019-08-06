import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsmService, UserToken } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm-component.component.html',
  styleUrls: ['./asm-component.component.css'],
})
export class AsmComponentComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loginForm: FormGroup;
  sessionForm: FormGroup;
  agent$: Observable<UserToken>;
  constructor(private fb: FormBuilder, private asmService: AsmService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.sessionForm = this.fb.group({
      customerId: ['', [Validators.required]],
    });
    this.agent$ = this.asmService.getActiveAgent();
  }

  loginAgent(): void {
    console.log(
      'Login asm agent:',
      this.loginForm.controls.userId.value,
      this.loginForm.controls.password.value
    );
    console.log(this.sessionForm.controls.customerId.value);
    this.asmService.loginAgent(
      this.loginForm.controls.userId.value,
      this.loginForm.controls.password.value
    );
  }

  logoutAgent(): void {
    console.log('Logout asm agent:');
    console.log(this.sessionForm.controls.customerId.value);
    this.asmService.logoutAgent();
  }

  startCustomerSession(): void {
    console.log(
      'startCustomerSession',
      this.sessionForm.controls.customerId.value
    );
    this.asmService.startCustomerSession(
      this.sessionForm.controls.customerId.value
    );
  }

  endCustomerSession(): void {
    console.log('endCustomerSession');
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
