import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:47
 */

@Injectable()
export class CitiesService {
	cities_url = '/api/cities/';
	games_url = '/api/games/';

	constructor(private _http: Http) {}

	getCities() {
		return this._http.get(this.cities_url)
			.map(res => res.json());
	}

	getGames() {
		return this._http.get(this.games_url)
			.map(res => res.json());
	}

	addCity(city) {
		let headers = CitiesService.getJsonHeaders();
		return this._http.post(this.cities_url, JSON.stringify(city), { headers: headers })
			.map(res => res.json());
	}

	getCity(id) {
		let headers = CitiesService.getJsonHeaders();
		return this._http.get(this.cities_url + id, { headers: headers })
			.map(res => res.json());
	}

	private static getJsonHeaders() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return headers;
	}
}
