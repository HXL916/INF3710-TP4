import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

import { Planrepas } from "../../../common/tables/Planrepas";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getPlans(): Observable<Planrepas[]> {
    return this.http
      .get<Planrepas[]>(this.BASE_URL + "/plans")
      .pipe(catchError(this.handleError<Planrepas[]>("getPlans")));
  }

  public insertPlan(plan: Planrepas): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/planrepas", plan)
      .pipe(catchError(this.handleError<number>("insertPlan")));
  }

  public updatePlan(plan: Planrepas, oldPK: string): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + `/planrepas/${oldPK}`, plan)
      .pipe(catchError(this.handleError<number>("updatePlan")));
  }

  public deletePlan(numeroPlan: number): Observable<number> {
    return this.http
      .delete<number>(this.BASE_URL + `/planrepas/${numeroPlan}`)
      .pipe(catchError(this.handleError<number>("deletePlan")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
