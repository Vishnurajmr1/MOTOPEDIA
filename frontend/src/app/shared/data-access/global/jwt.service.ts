import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  exp: number;
  payload: {
    Id: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getUserRole(token: string): string {
    if (token) {
      const decodeToken: JwtPayload = jwtDecode(token.substring(7));
      return decodeToken.payload.role;
    }
    return '';
  }
  private getDecodedToken(token: string): JwtPayload | undefined {
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token.substring(7));
      return decodedToken;
    }
    return undefined;
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.getDecodedToken(token);
    const expirationTime = decodedToken?.exp;
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    if (expirationTime !== undefined) {
      return expirationTime < currentTimeStamp;
    }
    return false;
  }

  isAdmin(token: string): boolean {
    return this.getUserRole(token) === 'admin';
  }
  isUser(token: string): boolean {
    return this.getUserRole(token) === 'user';
  }
}
