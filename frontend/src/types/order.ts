export interface OrderItem {
  name: string;
  description?: string;
  quantity: number;
  price: number;
}

export interface OrderComment {
  authorId: string;
  text: string;
  createdAt: string;
}

export interface OrderTailor {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    patronymic?: string;
  };
  email: string;
}

export type OrderStatus =
  | 'created'
  | 'accepted'
  | 'in_progress'
  | 'done'
  | 'cancelled';

export interface Order {
  _id: string;
  customerId: string;
  tailorId: string | OrderTailor | null;
  items: OrderItem[];
  status: OrderStatus;
  comments: OrderComment[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  created: 'Новый',
  accepted: 'Подтвержден',
  in_progress: 'В процессе',
  done: 'Готов',
  cancelled: 'Отменен',
};
