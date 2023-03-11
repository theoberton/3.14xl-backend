import { PartialType } from '@nestjs/mapped-types';
import { CreateNftCollectionManagerDto } from './createNftCollectionManager.dto';

export class UpdateNftCollectionManagerDto extends PartialType(
  CreateNftCollectionManagerDto,
) {}
