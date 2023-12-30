/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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
    @ValidateNested()
    @IsNotEmpty()
    public readonly data:ItemData
}

export class PostOrderBody {
    @ApiProperty({type:[OrdersItem]})
    @IsNotEmpty()
    @IsArray()
    public readonly orders: OrdersItem[];
}
