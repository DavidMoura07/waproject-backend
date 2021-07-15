import { OrderItem } from '../models/orderItem';
import { User } from '../models/user';

export interface IOrder {
  id?: number;
  status?: enOrderStatus;
  items: OrderItem[];
  user: User;

  createdDate?: Date;
  updatedDate?: Date
}

export enum enOrderStatus {
  waitingPayment = 'Agaurdando Pagamento',
  preparing = 'Em preparação',
  sent = 'Enviado',
  delivered = 'Entregue'
}

export function listOrderStatus(): enOrderStatus[] {
  return [
    enOrderStatus.waitingPayment, 
    enOrderStatus.preparing,
    enOrderStatus.sent,
    enOrderStatus.delivered,
  ];
}