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
      .get<Planrepas[]>(this.BASE_URL + "/hotels")
      .pipe(catchError(this.handleError<Planrepas[]>("getHotels")));
  }

  public insertPlan(plan: Planrepas): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotels/insert", plan)
      .pipe(catchError(this.handleError<number>("insertHotel")));
  }

  public updatePlan(plan: Planrepas): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/hotels/update", plan)
      .pipe(catchError(this.handleError<number>("updateHotel")));
  }

  public deletePlan(planNB: number): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotels/delete/" + planNB, {})
      .pipe(catchError(this.handleError<number>("deleteHotel")));
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
