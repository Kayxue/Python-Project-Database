/* eslint-disable prettier/prettier */
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class ItemData{
    @IsInt()
    @IsNotEmpty()
    public readonly big:number

    @IsInt()
    @IsNotEmpty()
    public readonly medium:number
}

export class OrdersItem {
    @IsString()
    @IsNotEmpty()
    public readonly name:string
    
    @ValidateNested()
    @IsNotEmpty()
    public readonly data:ItemData
}

export class PostOrderBody {
    @IsNotEmpty()
    @IsArray()
    public readonly orders: OrdersItem[];
}
