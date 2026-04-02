import { Injectable } from '@nestjs/common';

import { ImportDatabaseDto } from './dto/import-database.dto';

@Injectable()
export class ImportService {
  async importDatabase(importDatabaseDto: ImportDatabaseDto) {}
}
