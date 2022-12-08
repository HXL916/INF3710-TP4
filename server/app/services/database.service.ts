import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Client } from "../../../common/tables/Client";
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

  // ======= DEBUG =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM public.${tableName};`);
    client.release();
    return res;
  }

  // ======= HOTEL =======
  public async createHotel(plan: Planrepas): Promise<pg.QueryResult> {
    const client2 = await this.pool.connect();
    const res = await client2.query(`SELECT * FROM public.$};`);
    client2.release();
    return res;
  }

  public async getPlans(
  ): Promise<pg.QueryResult> {
    const Planrepas = await this.pool.connect();

    let queryText = "SELECT * FROM public.planrepas";


    const res = await Planrepas.query(queryText);
    Planrepas.release();
    return res;
  }

  // get the hotel names and numbers so so that the user can only select an existing hotel
  public async getHotelNamesByNos(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query("SELECT hotelNb, name FROM HOTELDB.Hotel;");
    client.release();
    return res;
  }

  // modify name or city of a hotel
  public async updateHotel(client: Client): Promise<pg.QueryResult> {
    const client2 = await this.pool.connect();
    const res = await client2.query(`SELECT * FROM public.$};`);
    client2.release();
    return res;
  }

  public async deleteHotel(hotelNb: string): Promise<pg.QueryResult> {
    if (hotelNb.length === 0) throw new Error("Invalid delete query");

    const client = await this.pool.connect();
    const query = `DELETE FROM HOTELDB.Hotel WHERE hotelNb = '${hotelNb}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }
}
