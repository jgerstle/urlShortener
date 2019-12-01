import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlShortenerService } from './services/url-shortener.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	urlShorteningForm: FormGroup;
	getOriginalUrlForm: FormGroup;
	shortenedUrl: string;
	originalUrl: string;

	constructor(fb: FormBuilder, private urlShortener: UrlShortenerService) {
		this.createUrlShorteningForm(fb);
		this.createGetOriginalUrlForm(fb);
	}

	createUrlShorteningForm(fb: FormBuilder) {
		this.urlShorteningForm = fb.group({
			url: ['', Validators.required]
		});
	}

	private createGetOriginalUrlForm(fb: FormBuilder) {
		this.getOriginalUrlForm = fb.group({
			url: ['', Validators.required]
		});
	}

	shortenUrl() {
		this.urlShortener.getShortenedUrl(this.urlShorteningForm.value.url).subscribe(url => {
			this.shortenedUrl = url;
		});
	}

	getOriginalUrl() {
		this.urlShortener.getOriginalUrl(this.getOriginalUrlForm.value.url).subscribe(url => {
			this.originalUrl = url;
		});
	}
}
