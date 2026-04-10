import { Controller, Get, Query } from '@nestjs/common';

import { ImportDatabaseDto } from './dto/import-database.dto';
import { ImportService } from './import.service';

@Controller('export')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get()
  exportDatabase(@Query() importDatabaseDto: ImportDatabaseDto) {
    return this.importService.importDatabase(importDatabaseDto);
  }
}
