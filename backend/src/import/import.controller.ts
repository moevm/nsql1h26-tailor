import { Controller, Get, Query } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportDatabaseDto } from './dto/import-database.dto';

@Controller('export')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get()
  exportDatabase(@Query() importDatabaseDto: ImportDatabaseDto) {
    return this.importService.importDatabase(importDatabaseDto);
  }
}
