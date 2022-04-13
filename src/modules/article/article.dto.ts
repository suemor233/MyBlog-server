import { Transform } from 'class-transformer'
import {IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf} from 'class-validator'
import {ApiProperty} from "@nestjs/swagger";
import {IsAllowedUrl} from "~/utils/validator/isAllowedUrl";



export class CategoryDto{
    @ApiProperty({ required: false ,example: '类别' })
    @IsOptional()
    readonly name?: string
}


export class ArticleInfoDto extends CategoryDto{

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '文章标题' })
    readonly title?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '文章内容' })
    readonly content?: string


    @ApiProperty({ required: false ,example: 'http://example.com' })
    @IsAllowedUrl()
    @IsOptional()
    readonly cover?: string

    @ApiProperty({ required: false ,example: '学习,前端' })
    @IsOptional()
    readonly tags?:string

    @ApiProperty({ required: false ,example: '类别' })
    @IsOptional()
    readonly category?: string



    readonly categoriesId?: []
}


