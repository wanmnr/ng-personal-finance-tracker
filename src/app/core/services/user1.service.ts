// core/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { UserPermissions } from '@core/models/user-role.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly firestore = inject(Firestore);

  getUserPermissions(userId: string): Observable<string[]> {
    const userDoc = doc(this.firestore, `users/${userId}`);

    return from(getDoc(userDoc)).pipe(
      map((docSnap) => {
        if (!docSnap.exists()) {
          return [];
        }

        const userData = docSnap.data() as UserPermissions;
        return userData.permissions || [];
      })
    );
  }
}
