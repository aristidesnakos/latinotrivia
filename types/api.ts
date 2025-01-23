export interface ApiResponse<T> {
  type: 'success' | 'error';
  data?: T;
  message?: string;
}
