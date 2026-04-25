import { Injectable } from '@nestjs/common';

import { ExportDatabaseDto } from './dto/export-database.dto';

@Injectable()
export class ExportService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exportDatabase(exportDatabaseDto: ExportDatabaseDto) {}
}
