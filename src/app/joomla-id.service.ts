import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoomlaIDService {

	readonly ENV = environment;
	readonly idAPI = this.ENV.API.ID;
	readonly nameAPI = this.ENV.API.CHARACTER;
	readonly tokenAPI = this.ENV.API.TOKEN;
  constructor(private http: HttpClient) { }

	resolveJoomlaID(): Observable<any> {
		return this.http.get(this.idAPI).pipe(
			map((result: any) => {
				return result;
			}),
			catchError((error) => {
				return "service unavailable";
				})
		)
	}
}