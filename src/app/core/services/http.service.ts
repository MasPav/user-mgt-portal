import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorConfig, ERROR_CONFIG_TOKEN } from '../interceptors/error.interceptor';
import { paginationDataTypes, Paginator } from '../types';
import { EndPoints } from '../endpoints';

export interface Loader {
  loading: boolean;
  error?: string;
}

interface PageLinks {
  previousPage?: any;
  firstPage: string;
  currentPage: string;
  nextPage?: any;
  lastPage: string;
}

interface PageInfo {
  pages: number;
  total: number;
  currentPage: number;
  pageSize: number;
  perPage: number;
  from: number;
  to: number;
}

export interface Metadata {
  pageLinks: PageLinks;
  pageInfo: PageInfo;
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected BASEURL = EndPoints.baseUrl;
  protected _url: string;
  constructor(private http: HttpClient) { }

  get(url: string, params?: any, errorConfig?: ErrorConfig, headers?: HttpHeaders): Observable<any> {
    url = this.ifFullUrl(url) ? url : this.url.concat(url);
    return this.http.get<any>(url, {
      context: new HttpContext().set(ERROR_CONFIG_TOKEN, errorConfig),
      params: this.sanitizeParams(params),
      headers
    });
  }

  post(url: string, postBody: object, errorConfig?: ErrorConfig, headers?: HttpHeaders): Observable<any> {
    url = this.ifFullUrl(url) ? url : this.url.concat(url);
    return this.http.post<any>(url, postBody, {
      context: new HttpContext().set(ERROR_CONFIG_TOKEN, errorConfig),
      headers
    });
  }

  put(url: string, postBody: object, errorConfig?: ErrorConfig, headers?: HttpHeaders): Observable<any> {
    url = this.ifFullUrl(url) ? url : this.url.concat(url);
    return this.http.put<any>(url, postBody, {
      context: new HttpContext().set(ERROR_CONFIG_TOKEN, errorConfig),
      headers
    });
  }

  delete(url: string, params?: any, errorConfig?: ErrorConfig): Observable<any> {
    url = this.ifFullUrl(url) ? url : this.url.concat(url);
    return this.http.delete<any>(url, {
      context: new HttpContext().set(ERROR_CONFIG_TOKEN, errorConfig),
      params: this.sanitizeParams(params),
    });
  }

  sanitizeParams(params: any): {} {
    const newParams: any = {};
    if (typeof params === 'object') {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
          newParams[key] = params[key];
        }
      });
    }
    return newParams
  }
  set url(str: string) {
    this._url = this.BASEURL + str;
  }

  get url() {
    return this._url;
  }
  setLoader(loader: Loader, loading = true, error: string = '') {
    loader.loading = loading;
    loader.error = error;
  }
  setPaginator(paginator: Paginator, data: any, disabled = false, type: paginationDataTypes = 'laravel') {
    paginator.total = data?.total;
    paginator.from = data?.from || 1;
    paginator.to = data?.to || 1;
    paginator.disabled = disabled;

    if (type === 'vagoApi') {
      paginator.total = data?.total_records;
      paginator.collectionSize = data?.pages;
      paginator.page = data?.currentPage || data?.page;
      paginator.perPage = data?.per_page || 1;
    } else {
      paginator.collectionSize = data?.last_page;
      paginator.page = data?.current_page;
      paginator.perPage = data?.per_page || 1;
    }
  }

  private ifFullUrl(url: string): boolean {
    return url.includes('http');
  }


}
