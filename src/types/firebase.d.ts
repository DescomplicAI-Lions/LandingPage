declare module '../src/services/firebase' {
  import { Auth } from 'firebase/auth';
  export const auth: Auth;
  export const googleProvider: any;
}

declare module './services/firebase' {
  import { Auth } from 'firebase/auth';
  export const auth: Auth;
  export const googleProvider: any;
}
