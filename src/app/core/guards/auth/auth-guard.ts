import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(LoginService);
  const router = inject(Router)
  if(auth.userData.getValue() !== null){
    return true;
  } else {
    // router.navigate(['/login']);
    // return false;
    return router.parseUrl('/login')
  }
};
