export type JwtPayload = {
  userId: string;
  role: 'user' | 'admin';
};

export type PaginationQuery = {
  page?: number;
  limit?: number;
};

