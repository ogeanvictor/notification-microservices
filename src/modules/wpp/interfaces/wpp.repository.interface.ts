import { Wpp } from '../entities/Wpp.entity';

import { WppCreateDto } from '../dtos/wpp-create.dto';

export abstract class WppRepositoryInterface {
  abstract create(body: WppCreateDto, userId: string): Promise<Wpp>;
  abstract findByUser(userId: string): Promise<Wpp>;
}
