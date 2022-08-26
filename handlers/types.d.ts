export interface CreateLinkData {
  realIP?: string;
  body: {
    reuse?: boolean;
    password?: string;
    customurl: string;
    description?: string;
    expire_in?: number;
    domain?: Domain;
    target: string;
  };
  user: User
}
