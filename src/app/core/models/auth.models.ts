// Chno ghan-sifto l'Backend
export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}


// Chno ghan-st9blo men l'Backend (L'objet JWT)
export interface AuthResponse {
  accessToken: string;
  tokenType?: string;   // 'Bearer'
}
