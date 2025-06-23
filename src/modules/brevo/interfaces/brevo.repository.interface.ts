import { Brevo } from '../entities/brevo.entity';

import { BrevoCreateDto } from '../dtos/brevo-create.dto';

export abstract class BrevoRepositoryInterface {
  abstract create(body: BrevoCreateDto, userId: string): Promise<Brevo>;
}
