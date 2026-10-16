export type BookingStatus = 'new' | 'confirmed' | 'cancelled';

export interface BookingServiceLine {
  categoryId: string;
  category: string;
  name: string;
  price: string;
  fromPrice: boolean;
}

export interface BookingRequest {
  id?: string;
  branch_id: string;
  services: BookingServiceLine[];
  estimated_total: number;
  preferred_date: string;
  time_window: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  status?: BookingStatus;
  created_at?: string;
}

export interface BookingRequestRow extends BookingRequest {
  id: string;
  status: BookingStatus;
  created_at: string;
}

export interface BookingTarget {
  token: number;
  kind: 'branch' | 'mobile';
  branchId?: string;
  categoryId?: string;
  serviceName?: string;
}
