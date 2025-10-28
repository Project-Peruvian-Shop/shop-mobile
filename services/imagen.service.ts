import type { ImagenResponseDTO } from "@/models/Imagen/Imagen_response_dto";
import type { ApiResponse } from "@/services/global.interfaces";
import { URL_API } from "@/utils/constants";
import axios from "axios";

const BASE_URL = `${URL_API}/imagen`;

export async function createImagen(
  formData: FormData
): Promise<ImagenResponseDTO> {
  const url = `${BASE_URL}`;

  const res = await axios.post<ApiResponse<ImagenResponseDTO>>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
}
