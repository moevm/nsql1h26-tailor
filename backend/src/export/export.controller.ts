import { Roles } from '@/common/decorator/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ExportDatabaseDto } from './dto/export-database.dto';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @UseGuards(RolesGuard)
  @Roles(['manager'])
  @Get()
  exportDatabase(@Query() exportDatabaseDto: ExportDatabaseDto) {
    return this.exportService.exportDatabase(exportDatabaseDto);
  }
}
