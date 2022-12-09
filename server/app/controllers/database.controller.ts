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

    router.post('/planrepas', (req: Request, res: Response, next: NextFunction) => {
      const planDB: PlanrepasDB = {
        numéroplan: req.body.number,
        catégorie: req.body.category,
        fréquence: req.body.frequency,
        nbrpersonnes: req.body.persons,
        nbrcalories: req.body.calories,
        prix: req.body.price,
        numérofournisseur: req.body.numberF
      };

      this.databaseService
        .createPlan(planDB)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });
    });

    router.put('/planrepas/:numeroplan', (req: Request, res: Response, next: NextFunction) => {
      const numeroPlan: string = req.params.numeroplan;

      const planDB: PlanrepasDB = {
        numéroplan: req.body.number,
        catégorie: req.body.category,
        fréquence: req.body.frequency,
        nbrpersonnes: req.body.persons,
        nbrcalories: req.body.calories,
        prix: req.body.price,
        numérofournisseur: req.body.numberF
      };

      this.databaseService
        .updatePlan(planDB, numeroPlan)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });
    });
    

    router.delete('/planrepas/:numeroplan', (req: Request, res: Response, next: NextFunction) => {
      const numeroPlan: string = req.params.numeroplan;

      this.databaseService
        .deletePlan(numeroPlan)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });    
    });

    return router;
  }
}
