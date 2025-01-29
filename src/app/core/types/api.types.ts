// core/types/api.types.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
}
