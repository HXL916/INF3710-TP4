import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Planrepas} from "../../../common/tables/Planrepas";


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

  public async createPlan(plan: Planrepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM public.$};`);
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
