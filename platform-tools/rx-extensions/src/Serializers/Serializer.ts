import {DefaultSerializer} from 'platform-tools/rx-extensions/src/Serializers/DefaultSerializer';
import {MultipartFormSerializer} from 'platform-tools/rx-extensions/src/Serializers/MultipartFormSerializer';
import {Helpers} from 'platform-tools/rx-extensions/src/Utils/Helpers';
import {SerializerResult, FilesList, HeadersList} from 'platform-tools/rx-extensions/src/interfaces';

export class Serializer {
  
  public static parseData(method: string, url: string, data: any, files: FilesList,
                          cb: (data: SerializerResult) => void): void {
    if (Object.keys(files).length) {
      let boundary = '---------------------------' + Date.now().toString(16);
      
      MultipartFormSerializer.serialize(boundary, data, files, (data) => {
        cb({
          headers: {
            'Content-Type': 'multipart/form-data; boundary=' + boundary,
          },
          url: url,
          data: data,
        });
      });
      
    } else if (data !== null) {
      let headers: HeadersList = {};
      
      // @TODO Fix serializer
      // data = DefaultSerializer.serialize(data);
      
      if (method === 'POST') {
        // headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        url = Helpers.appendUrlParameters(url, data);
        data = null;
      }
      
      cb({
        headers: headers,
        url: url,
        data: data,
      });
      
    } else {
      cb({
        headers: {},
        url: url,
        data: null,
      });
    }
  }
  
}
