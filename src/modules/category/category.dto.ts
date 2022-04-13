import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CategoryDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '类别' })
    readonly name?: string
}
