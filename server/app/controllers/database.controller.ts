import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import {PlanrepasDB} from "../../../common/tables/DataBaseClasses";
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

    // ======= PLANREPAS ROUTES =======
    router.get("/plans", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getPlans()
        .then((result: pg.QueryResult) => {
          const plans: Planrepas[] = [];
          result.rows.forEach((plan: PlanrepasDB) => {
            plans.push({
              number: plan.numéroplan,
              category: plan.catégorie,
              frequency: plan.fréquence,
              persons: plan.nbrpersonnes,
              calories: plan.nbrcalories,
              price: plan.prix,
              numberF: plan.numérofournisseur,
            });
            
          });
          res.json(plans);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    // router.get(
    //   "/hotels/hotelNb",
    //   (req: Request, res: Response, _: NextFunction) => {
    //     this.databaseService
    //       .getHotelNamesByNos()
    //       .then((result: pg.QueryResult) => {
    //         const hotelsNbsNames = result.rows.map((hotel: PlanPK) => ({

    //         }));
    //         res.json(hotelsNbsNames);
    //       })

    //       .catch((e: Error) => {
    //         console.error(e.stack);
    //       });
    //   }
    // );


    // router.post("/hotels/delete/:hotelNb",(req: Request, res: Response, _: NextFunction) => {
    //     const hotelNb: string = req.params.hotelNb;
    //     this.databaseService
    //       .deleteHotel(hotelNb)
    //       .then((result: pg.QueryResult) => {
    //         res.json(result.rowCount);
    //       })
    //       .catch((e: Error) => {
    //         console.error(e.stack);
    //       });
    //   }
    // );

    return router;
  }
}
