/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 12:50
 */

import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
	moduleId: module.id,
	selector: 'cities',
	templateUrl: 'cities.component.html'
})

export class CitiesComponent {

	constructor(private router: Router) {}
	
}