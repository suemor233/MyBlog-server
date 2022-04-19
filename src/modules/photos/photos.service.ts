import {Injectable, InternalServerErrorException} from '@nestjs/common';
import * as url from 'url';
import * as qiniu from 'qiniu';

@Injectable()
export class PhotosService {


  uploadPhoto(file: Express.Multer.File) {
    const mac = new qiniu.auth.digest.Mac(process.env.qn_ak, process.env.qn_sk);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: process.env.qn_scope,
    });
    const uploadToken = putPolicy.uploadToken(mac);

    // uoload
    const formUploader = new qiniu.form_up.FormUploader(
        new qiniu.conf.Config({
          zone: qiniu.zone.Zone_as0,
        }),
    );
    return new Promise((_res, _rej) => {
      formUploader.put(
          uploadToken,
          `${Date.now()}-${file.originalname}`,
          file.buffer,
          new qiniu.form_up.PutExtra(),
          function (respErr, respBody, respInfo) {
            if (respErr) {
              console.error(respErr);
              throw new InternalServerErrorException(respErr.message);
            }

            if (respInfo.statusCode == 200) {
              _res({
                url: new url.URL(respBody.key, process.env.qn_host).href,
              });

            } else {
              console.error(respInfo.statusCode, respBody);
              throw new InternalServerErrorException(respInfo);
            }
          },
      );
    });
  }
}
