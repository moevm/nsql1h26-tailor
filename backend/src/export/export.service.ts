import { Injectable } from '@nestjs/common';

import { ExportDatabaseDto } from './dto/export-database.dto';

@Injectable()
export class ExportService {
  async exportDatabase(exportDatabaseDto: ExportDatabaseDto) {}
}
