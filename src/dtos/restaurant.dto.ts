import { IsBase64, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString } from 'class-validator';

export class CategoryQueryDto {
  @IsNotEmpty()
  public restaurantId: string;

  @IsNotEmpty()
  public category: string;
}

export class IdParamDto {
  @IsNotEmpty()
  public id: string;
}

export class FoodItemDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  public price: number;

  @IsNotEmpty()
  @IsBase64()
  public imageUrl: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public ingredients: string;

  @IsNotEmpty()
  @IsString()
  public nutritions: string;
}

export class UpdateFoodItemDto {
  @IsNotEmpty()
  @IsString()
  public restaurantId: string;

  @IsNotEmpty()
  @IsString()
  public categoryId: string;

  @IsNotEmptyObject()
  @IsObject()
  public item: FoodItemDto;
}

export class CategoryRestaurantIdDto {
  @IsNotEmpty()
  @IsString()
  public restaurantId: string;

  @IsNotEmpty()
  @IsString()
  public categoryId: string;
}

export class RestaurantDto {
  @IsNotEmpty()
  @IsString()
  public _id?: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsBase64()
  public imageUrl: string;

  @IsNotEmpty()
  @IsString()
  public deliveryDuration: string;

  @IsNotEmpty()
  @IsNumber()
  minOrderVal: number;
}
