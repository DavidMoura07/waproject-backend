export interface IProduct {
  id?: number;
  name: string;
  salesPrice?: number;
  stockQuantity?: number;

  createdDate?: Date;
  updatedDate?: Date
}