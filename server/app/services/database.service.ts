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

  public async getVendors(): Promise<pg.QueryResult> {
    const vendor = await this.pool.connect();
    let queryText = "SELECT * FROM public.fournisseur";
    const res = await vendor.query(queryText);
    vendor.release();
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
  public async updatePlan(planrepas: PlanrepasDB, oldPK: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const values: string[] = [
      planrepas.numéroplan.toString(),
      planrepas.catégorie,
      planrepas.fréquence.toString(), 
      planrepas.nbrpersonnes.toString(),
      planrepas.nbrcalories.toString(),
      planrepas.prix.toString(),
      planrepas.numérofournisseur.toString(),
      oldPK
    ];

    const queryText = `UPDATE public.planrepas SET numéroplan = $1, catégorie = $2,fréquence = $3,nbrpersonnes = $4,nbrcalories = $5,prix = $6, numérofournisseur = $7 WHERE numéroplan = $8;`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async deletePlan(numeroplan: string): Promise<pg.QueryResult> {
    if (!numeroplan) throw new Error("La clé primaire est invalide !");

    const client = await this.pool.connect();
    const query = `DELETE FROM public.planrepas WHERE numéroplan = '${numeroplan}' CASCADE;`;

    const res = await client.query(query);
    client.release();
    return res;
  }
}
