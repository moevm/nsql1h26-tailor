import { Injectable } from '@nestjs/common';

import { ImportDatabaseDto } from './dto/import-database.dto';

@Injectable()
export class ImportService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async importDatabase(importDatabaseDto: ImportDatabaseDto) {}
}
