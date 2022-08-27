import { ConfigModule } from '@nestjs/config';
import { configs } from '../configs';

export const ConfigsRootModule = ConfigModule.forRoot({
  isGlobal: true,
  load: configs,
});
