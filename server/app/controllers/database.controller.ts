import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {PlanrepasDB} from "../../../common/tables/DataBaseClasses";
import {PlanPK} from "../../../common/tables/PlanPK";

import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Planrepas } from "../../../common/tables/Planrepas";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= HOTEL ROUTES =======
    // ex http://localhost:3000/database/hotel?hotelNb=3&name=LeGrandHotel&city=laval
    router.get("/hotels", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getPlans()
        .then((result: pg.QueryResult) => {
          const Plans: Planrepas[] = [];
          result.rows.forEach((plan: PlanrepasDB) => {
            Plans.push({
              number: plan.numéroplan,
              category: plan.catégorie,
              frequency: plan.fréquence,
              persons: plan.nbrpersonnes,
              calories: plan.nbrcalories,
              price: plan.prix,
              numberF: plan.numérofournisseur,
            });
            
          });
          res.json(Plans);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get(
      "/hotels/hotelNb",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows.map((hotel: PlanPK) => ({

            }));
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    router.post(
      "/hotels/delete/:hotelNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        this.databaseService
          .deleteHotel(hotelNb)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.put(
      "/hotels/update",
      (req: Request, res: Response, _: NextFunction) => {
      }
    );

    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
