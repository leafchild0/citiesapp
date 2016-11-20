/**
 * Created by: leaf
 * Date: 09/11/16
 * Time: 08:38
 */

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";

@Component({
	moduleId: module.id,
	selector: 'addcity',
	templateUrl: 'addcity.component.html'
})

export class AddCityComponent implements OnInit{

	private URL:string = 'http://192.168.1.104:3000/api/upload';
	private city: string;

	public uploader:FileUploader = new FileUploader({url: this.URL});
	public hasBaseDropZoneOver:boolean = false;

	constructor() {}

	ngOnInit(): void {
		this.uploader.onBuildItemForm = (fileItem: any, form: FormData) => {
			form.append('city', this.city);
		};
	}

	uploadAll() {
		if(this.city) this.uploader.uploadAll();
	}

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

}