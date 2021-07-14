export interface IOrder {
  id?: number;
  status: enOrderStatus;

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