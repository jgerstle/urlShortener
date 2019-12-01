import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UrlShortenerService {
	readonly serverUrl = environment.url;
	constructor(private http: HttpClient) { }

	getShortenedUrl(url) {
		return this.http.post<{id: string}>(`${this.serverUrl}/shorten-url`, {url}).pipe(map(ret => `${this.serverUrl}/${ret.id}`));
	}

	getOriginalUrl(url) {
		const id = url.replace(`${this.serverUrl}/`, '');
		return this.http.get<{url: string}>(`${this.serverUrl}/original-url/${id}`).pipe(map(ret => ret.url));
	}
}
