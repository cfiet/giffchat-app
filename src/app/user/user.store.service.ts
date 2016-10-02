import { Observable } from 'rxjs';
import { IUser } from './user';

export abstract class UserStore {
  public abstract setCurrent(user: IUser): void;
  public abstract getCurrent(): Observable<IUser>;
}

export class MemoryUserStore extends UserStore {
  private currentUser: IUser = null;

  public setCurrent(user: IUser): void {
    if (!user || typeof user !== 'object') {
      throw new Error('Argument \'user\' must an object');
    }

    this.currentUser = user;
  }

  public getCurrent(): Observable<IUser> {
    if (!this.currentUser) {
      return Observable.throw('User is not logged in yet');
    }
    return Observable.of(this.currentUser);
  }
}