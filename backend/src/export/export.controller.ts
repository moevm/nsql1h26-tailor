import { Controller, Get, Query } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportDatabaseDto } from './dto/export-database.dto';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get()
  exportDatabase(@Query() exportDatabaseDto: ExportDatabaseDto) {
    return this.exportService.exportDatabase(exportDatabaseDto);
  }
}
