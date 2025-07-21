import { FacebookCreateDto } from '../dtos/facebook-create.dto';
import { Facebook } from '../entities/facebook.entity';

export abstract class FacebookRepositoryInterface {
  abstract create(body: FacebookCreateDto, userId: string): Promise<Facebook>;
  abstract findByUser(userId: string): Promise<Facebook>;
}
