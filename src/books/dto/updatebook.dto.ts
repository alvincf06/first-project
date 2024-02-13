import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateBookDTO{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    year: string;
}