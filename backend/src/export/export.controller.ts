import { Controller, Get, Query } from '@nestjs/common';

import { ExportDatabaseDto } from './dto/export-database.dto';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get()
  exportDatabase(@Query() exportDatabaseDto: ExportDatabaseDto) {
    return this.exportService.exportDatabase(exportDatabaseDto);
  }
}
