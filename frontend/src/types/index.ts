import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  pagination?: PaginationData;
  statusCode?: number;
}

export interface AuthUser {
  user: User | null;
  tokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
  isAuthenticated: boolean;
}

type SearchItemCategory =
  | 'recently_searched'
  | 'products'
  | 'quick_links'
  | 'suggestion_files'
  | 'members'
  | 'related_search';

export type SearchResult = {
  url: string;
  label: string;
  category: SearchItemCategory;
  image?: string;
  details?: string;
  format?: string;
  avatar?: string;
  status?: string;
  icon?: IconProp;
};

export interface CartItem {
  type: string;
  itemId: string;
  quantity?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  notes?: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  role: 'user' | 'staff' | 'admin';
  loyaltyProfile?: {
    totalBookings: number;
    totalSpent: number;
    preferredFacilities: Facility[];
    lastBookingDate?: Date;
    loyaltyTier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  };
  cart: CartItem[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  pagination?: PaginationData;
  statusCode?: number;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface Facility {
  _id: string;
  name: string;
  description?: string;
  images: {
    path: string;
    originalName: string;
    mimetype: string;
    size: number;
  }[];
  terms?: string;
  availability: {
    day:
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday'
      | 'sunday';
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  blockedDates: {
    startDate: Date;
    endDate: Date;
    reason?: string;
    createdBy: User;
    createdAt: Date;
  }[];
  pricing: {
    unit: 'hour' | 'day' | 'week' | 'month';
    amount: number;
    isDefault: boolean;
  }[];
  rating: {
    average: number;
    totalReviews: number;
  };
  reviews: {
    user: User;
    booking: Booking;
    rating: number;
    comment: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  capacity: {
    maximum: number;
    recommended: number;
  };
  amenities: string[];
  location: {
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  operationalHours: {
    opening: string;
    closing: string;
  };
  isActive: boolean;
  isTaxable: boolean;
  isDeleted: boolean;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  _id: string;
  name: string;
  description?: string;
  sku?: string;
  quantity: number;
  images: {
    path: string;
    originalName: string;
    mimetype: string;
    size: number;
  }[];
  status: 'in_stock' | 'rented' | 'unavailable' | 'maintenance' | 'retired';
  pricing: {
    unit: 'hour' | 'day' | 'week' | 'month';
    amount: number;
    isDefault: boolean;
  }[];
  associatedFacility?: string;
  category: string;
  purchaseInfo: {
    purchaseDate?: Date;
    purchasePrice?: number;
    supplier?: string;
    warrantyExpiry?: Date;
  };
  history: {
    date: Date;
    change: number;
    reason: string;
    user: User;
    notes?: string;
  }[];
  maintenanceSchedule: {
    scheduledDate: Date;
    type: 'cleaning' | 'repair' | 'inspection' | 'calibration';
    completed: boolean;
    completedDate?: Date;
    cost?: number;
    notes?: string;
    performedBy?: User;
  }[];
  currentBookings: Booking[];
  specifications: Map<string, string>;
  alerts: {
    lowStock: boolean;
    maintenanceDue: boolean;
    warrantyExpiring: boolean;
  };
  isDeleted: boolean;
  isTaxable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  _id: string;
  user: User;
  facility: Facility;
  startDate: Date;
  endDate: Date;
  duration: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  paymentStatus:
    | 'pending'
    | 'completed'
    | 'failed'
    | 'refunded'
    | 'partial_refund';
  totalPrice: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    reason: string;
    appliedBy: User;
  };
  paymentDetails: Transaction;
  checkIn?: {
    time: Date;
    verifiedBy: User;
    notes?: string;
  };
  checkOut?: {
    time: Date;
    verifiedBy: User;
    condition: 'good' | 'fair' | 'damaged';
    notes?: string;
    damageReport?: string;
  };
  cancellation?: {
    reason: string;
    cancelledBy: User;
    cancelledAt: Date;
    refundAmount?: number;
  };
  notes?: string;
  internalNotes?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  _id: string;
  booking?: Booking;
  user: User;
  account?: Account;
  quantity?: number;
  type: string;
  category: string;
  amount: number;
  method: string;
  paymentDetails: {
    paystackReference?: string;
    chequeNumber?: string;
    bankDetails?: {
      bankName: string;
      accountNumber: string;
      sortCode?: string;
    };
    mobileMoneyDetails?: {
      provider: string;
      phoneNumber: string;
      transactionId: string;
    };
  };
  ref?: string;
  accessCode?: string;
  receiptUrl?: string;
  approvedBy?: User;
  reconciled: boolean;
  reconciledAt?: Date;
  facility?: Facility;
  inventoryItem?: string;
  description?: string;
  attachments: string[];
  tags: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  user: User;
  name: string;
  usage: number;
  currency: string;
  transactionHistory: {
    transactionId: Transaction;
    type: 'credit' | 'debit';
    amount: number;
    usageAfter: number;
    date: Date;
    description?: string;
  }[];
  reconciliation: {
    lastReconciledDate?: Date;
    lastReconciledBy?: User;
    discrepancies: {
      amount: number;
      reason: string;
      resolvedBy?: User;
      resolvedAt?: Date;
    }[];
  };
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerAnalytics {
  user: User;
  behaviorPattern: {
    preferredTimeSlots: string[];
    preferredDays: string[];
    averageBookingDuration: number;
    preferredFacilities: Facility[];
    bookingFrequency: 'daily' | 'weekly' | 'monthly' | 'occasional';
  };
  financialProfile: {
    totalSpent: number;
    averageBookingValue: number;
    paymentPreference: 'cash' | 'mobile_money' | 'bank' | 'card';
    creditScore: number;
  };
  loyaltyMetrics: {
    totalBookings: number;
    cancellationRate: number;
    noShowRate: number;
    lastBookingDate?: Date;
    loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
    pointsEarned: number;
    pointsRedeemed: number;
  };
  recommendations: {
    suggestedFacilities: Facility[];
    suggestedTimeSlots: string[];
    personalizedOffers: {
      type: string;
      discount: number;
      validUntil: Date;
      used: boolean;
    }[];
  };
  insights: {
    isHighValueCustomer: boolean;
    churnRisk: 'low' | 'medium' | 'high';
    nextBookingPrediction?: Date;
    lifetimeValue: number;
  };
  updatedAt: Date;
}

export interface SystemAlert {
  type:
    | 'overbooking'
    | 'maintenance_due'
    | 'low_inventory'
    | 'payment_failed'
    | 'high_churn_risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  relatedEntity: {
    type: 'facility' | 'booking' | 'user' | 'inventory' | 'transaction';
    id: string;
  };
  isRead: boolean;
  isResolved: boolean;
  resolvedBy?: User;
  resolvedAt?: Date;
  actionTaken?: string;
  createdAt: Date;
}

export interface Token {
  user: string;
  accessToken?: string;
  refreshToken?: string;
  passwordResetToken?: string;
  emailVerificationToken?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentFormData {
  metadata: {
    full_name: string;
  };
  email: string;
  currency: string;
  amount: number;
}

export interface Tax {
  _id?: string;
  name: string;
  rate: number;
  type: string;
  appliesTo: 'inventory_item' | 'facility' | 'both';
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
