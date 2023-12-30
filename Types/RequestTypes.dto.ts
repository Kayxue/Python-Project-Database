/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from "class-transformer"

export class ItemData{
    @ApiProperty({type:Number})
    @IsInt()
    @IsNotEmpty()
    public readonly big:number

    @ApiProperty({type:Number})
    @IsInt()
    @IsNotEmpty()
    public readonly medium:number
}

export class OrdersItem {
    @ApiProperty({type:String})
    @IsString()
    @IsNotEmpty()
    public readonly name:string
    
    @ApiProperty({type:ItemData})
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ItemData)
    public readonly data:ItemData
}

export class PostOrderBody {
    @ApiProperty({type:[OrdersItem]})
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => OrdersItem)
    public readonly orders: OrdersItem[];
}
