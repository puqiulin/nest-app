import { Test, TestingModule } from '@nestjs/testing';
import { PostsByUserLoader } from './posts-by-user.loader';

describe('PostsByUserLoader', () => {
  let provider: PostsByUserLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsByUserLoader],
    }).compile();

    provider = module.get<PostsByUserLoader>(PostsByUserLoader);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
