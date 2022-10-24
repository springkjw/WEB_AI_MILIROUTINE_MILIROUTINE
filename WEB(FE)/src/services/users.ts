export interface LoginRequest {
  email: string;
  password: string;
}

export async function loginWithEmailAndPassword(
  data: LoginRequest
): Promise<any> {
  return;
}
