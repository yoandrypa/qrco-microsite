export interface CreateLinkData {
  realIP?: string;
  body: {
    reuse?: boolean;
    password?: string | undefined;
    customUrl?: string | undefined;
    description?: string | undefined;
    expireIn?: string | undefined;
    domain?: DomainType | undefined;
    type?: string;
    target: string;
  };
  user: User;
}

export interface CreateQrDataType {
  qrName: string;
  qrType: string;
  userId: string;
  isDynamic?: boolean;
  shortLinkId?: string;
  qrOptionsId?: object;
}

export interface UpdateLinkData {
  body: {
    id: string;
    address?: string;
    target?: string;
    description?: string;
    expireIn?: string
  };
  user: User;
}

export interface UpdateQrDataType {
  id: string;
  qrName: string;
  qrType: string;
  userId?: string;
  isDynamic?: boolean;
  shortLinkId?: string;
  qrOptionsId?: object;
}
