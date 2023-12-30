/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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
  @ValidateNested({ each: true })
  @IsNotEmpty()
  public readonly orders: OrdersItem[];
}
