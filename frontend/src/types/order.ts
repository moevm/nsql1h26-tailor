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

export interface OrderCustomer {
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

export interface Worker {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    patronymic?: string;
  };
  email: string;
}

export interface Order {
  _id: string;
  customerId: string | OrderCustomer;
  tailorId: string | OrderTailor | null;
  items: OrderItem[];
  status: OrderStatus;
  comments: OrderComment[];
  totalPrice: number;
  preferredDate?: string;
  contactNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export function statusTag(
  status: OrderStatus,
): 'default' | 'info' | 'warning' | 'success' | 'error' {
  const map: Record<OrderStatus, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
    created: 'default',
    accepted: 'info',
    in_progress: 'warning',
    done: 'success',
    cancelled: 'error',
  };
  return map[status];
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  created: 'Новый',
  accepted: 'Подтвержден',
  in_progress: 'В процессе',
  done: 'Готов',
  cancelled: 'Отменен',
};

export interface OrderFilters {
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: OrderStatus;
}
