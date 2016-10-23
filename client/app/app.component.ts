/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 11:19
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: []
})

export class AppComponent implements OnInit {
	public isCollapsed:boolean = true;
	private viewContainerRef: ViewContainerRef;

	constructor(viewContainerRef:ViewContainerRef){}

	ngOnInit() {
	}

}
