import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile, InternalServerErrorException
} from '@nestjs/common';
import { PhotosService } from './photos.service';

import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('photos')
@ApiTags('图片上传')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {
     return  this.photosService.uploadPhoto(file)

    }
}
