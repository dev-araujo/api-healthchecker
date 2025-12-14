import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, map, retry, takeWhile } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private readonly healthUrl = `${environment.apiUrl}/health`;

  constructor(private http: HttpClient) {}

  waitForBackend(): Observable<boolean> {
    return timer(0, 2000).pipe(
      switchMap(() => this.http.get<{ status: string }>(this.healthUrl)),
      map((response) => response.status === 'ok'),
      retry(),
      takeWhile((isReady) => !isReady, true)
    );
  }
}
