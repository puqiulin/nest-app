//module level config file
import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  users: ['wangjie', 'puqiulin'],
}));
