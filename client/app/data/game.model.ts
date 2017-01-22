import {City} from "./city.model";
/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 12:51
 */

export class Game {
    _id: string;
    name: string;
    host: string;
    city: City;
    users: any[];
}