import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { PlanrepasDB } from "../../../common/tables/DataBaseClasses";


@injectable()
export class DatabaseService {
  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4_Livraison",
    password: "d2Xvq5-f*L3V",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= PLANREPAS =======

  public async getPlans(): Promise<pg.QueryResult> {
    const Planrepas = await this.pool.connect();
    let queryText = "SELECT * FROM public.planrepas";
    const res = await Planrepas.query(queryText);
    Planrepas.release();
    return res;
  }

  public async createPlan(plan: PlanrepasDB): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!plan.numéroplan || !plan.numérofournisseur) {
      throw new Error("Impossible d'ajouter le planrepas désiré.");
    }

    const values: string[] = [
      plan.numéroplan.toString(),
      plan.catégorie,
      plan.fréquence.toString(), 
      plan.nbrpersonnes.toString(),
      plan.nbrcalories.toString(),
      plan.prix.toString(),
      plan.numérofournisseur.toString()
    ];
    const queryText: string = `INSERT INTO public.planrepas VALUES($1,$2,$3,$4,$5,$6,$7);`;

    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  // modify any or all fields of a planrepas
  public async updatePlan(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM public.$};`);
    client.release();
    return res;
  }

  public async deletePlan(hotelNb: string): Promise<pg.QueryResult> {
    if (hotelNb.length === 0) throw new Error("Invalid delete query");

    const client = await this.pool.connect();
    const query = `DELETE FROM HOTELDB.Hotel WHERE hotelNb = '${hotelNb}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }
}
