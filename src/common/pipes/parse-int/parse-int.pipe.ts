import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

//parseIntPipe already exists in nestjs, we just for study custom pipe
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const v = parseInt(value, 10);
    if (isNaN(v)) {
      throw new BadRequestException(
        `Validation failed, "${value}" is not an integer`,
      );
    }
    return v;
  }
}
