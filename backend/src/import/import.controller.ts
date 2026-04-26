import { Roles } from '@/common/decorator/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ImportDatabaseDto } from './dto/import-database.dto';
import { ImportService } from './import.service';

@Controller('export')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @UseGuards(RolesGuard)
  @Roles(['manager'])
  @Get()
  exportDatabase(@Query() importDatabaseDto: ImportDatabaseDto) {
    return this.importService.importDatabase(importDatabaseDto);
  }
}
