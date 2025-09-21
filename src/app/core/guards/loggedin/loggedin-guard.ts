import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login-service';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const auth = inject(LoginService);
  const router = inject(Router)
  if(auth.userData.getValue() !== null){
    return router.parseUrl('/home');
  } else {
    return true;
  }
};
