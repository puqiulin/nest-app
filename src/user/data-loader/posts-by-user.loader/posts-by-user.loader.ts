import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PostsByUserLoader extends DataLoader<number, User[]> {
  constructor(private readonly prisma: PrismaService) {
  }

  private async batchLoadFn(userIds: readonly number[]) {
    const userWithPosts = await this.prisma.user.find({
      select: ['id'],
      relations: true,
      where: {
        id: In(userIds as number[]),
      },
    });

    return userWithPosts.map((user) => user.posts);
  }
}
