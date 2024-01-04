import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatusTransformationPipe implements PipeTransform {
  constructor(private db: DatabaseService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    const statusValue = value.newStatus;
    if (!statusValue) {
      return value;
    }

    const statusObject = await this.db.plantStatus.findFirst({
      where: {
        OR: [{ status: statusValue }, { subStatus: statusValue }],
      },
    });

    if (!statusObject) {
      throw new NotFoundException(`Status '${statusValue}' not found`);
    }

    // Replace the status field with the complete object
    return { ...value, currentStatus: statusObject, newStatus: undefined };
  }
}
