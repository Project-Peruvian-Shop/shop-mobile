import type {
  LoginRequestDto,
  UsuarioRequestDto,
} from "@/models/Usuario/Usuario_request_dto";
import { URL_API } from "@/utils/constants";
import axios from "axios";
import type { UsuarioResponseDto } from "../models/Usuario/Usuario_response_dto";
import type { ApiResponse } from "./global.interfaces";

const BASE_URL = URL_API + "/auth";

export async function login(
  body: LoginRequestDto
): Promise<UsuarioResponseDto> {
  const url = `${BASE_URL}/login`;

  const res = await axios.post<ApiResponse<UsuarioResponseDto>>(url, body);

  return res.data.data;
}

export async function register(
  body: UsuarioRequestDto
): Promise<UsuarioResponseDto> {
  const url = `${BASE_URL}/register`;

  const res = await axios.post<ApiResponse<UsuarioResponseDto>>(url, body);

  return res.data.data;
}
