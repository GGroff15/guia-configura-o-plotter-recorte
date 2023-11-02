import { MaterialDto } from "./material-dto";
import { TapeteDto } from "./tapete-dto";
import { CanetaDto } from "./caneta-dto";
import { LaminaDto } from "./lamina-dto";

export interface ProcessoDto {
    id: number;
    materialDto: MaterialDto;
    tapeteDto: TapeteDto;
    canetaDto: CanetaDto;
    pressaoFerramenta: number;
    tipo: string;
    laminaDto: LaminaDto;
    profundidadeLamina: number;
    tecido: boolean;
}
