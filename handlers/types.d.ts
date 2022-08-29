export interface CreateLinkData {
  realIP?: string;
  body: {
    reuse?: boolean;
    password?: string | undefined;
    customurl?: string | undefined;
    description?: string | undefined;
    expire_in?: string | undefined;
    domain?: DomainType | undefined;
    target: string;
  };
  user: User
}

export interface UpdateLinkData {
  body: {
    id: string;
    address?: string;
    target?: string;
    description?: string;
    expire_in?: string
  };
  user: User
}
