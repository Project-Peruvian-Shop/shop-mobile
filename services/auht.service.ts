import type {
  LoginRequestDto,
  RefreshTokenResponseDto,
  UsuarioRequestDto,
} from "@/models/Usuario/Usuario_request_dto";
import type { UsuarioResponseDto } from "@/models/Usuario/Usuario_response_dto";
import type { ApiResponse } from "@/services/global.interfaces";
import api from "@/utils/api";

const BASE_URL =  "/auth";

export async function login(
  body: LoginRequestDto
): Promise<UsuarioResponseDto> {
  const url = `${BASE_URL}/login`;

  const res = await api.post<ApiResponse<UsuarioResponseDto>>(url, body);

  return res.data.data;
}

export async function register(
  body: UsuarioRequestDto
): Promise<UsuarioResponseDto> {
  const url = `${BASE_URL}/register`;

  const res = await api.post<ApiResponse<UsuarioResponseDto>>(url, body);

  return res.data.data;
}

export async function obtenerNuevoToken(
  refreshToken: string
): Promise<RefreshTokenResponseDto> {
  const url = `${BASE_URL}/refresh-token`;

  const res = await api.post<ApiResponse<RefreshTokenResponseDto>>(url, {
    refreshToken,
  });

  return res.data.data;
}
