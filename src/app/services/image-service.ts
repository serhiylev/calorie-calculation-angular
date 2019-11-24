import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;charset=UTF-8'
  });

@Injectable()
export class ImageService {
  constructor(private httpClient: HttpClient) {
  }

  getImage(image: string) {
    return this.httpClient.get('http://localhost:8080/products/image/' + image);
  }
}
