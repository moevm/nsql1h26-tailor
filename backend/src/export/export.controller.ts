import { createReadStream } from 'node:fs';
import { join } from 'node:path';

import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import {
  Controller,
  Get,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';

import { ExportDatabaseDto } from './dto/export-database.dto';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @UseGuards(RolesGuard)
  @Roles(['manager'])
  @Get('file')
  async exportDatabase(
    @Query() exportDatabaseDto: ExportDatabaseDto,
  ): Promise<StreamableFile> {
    const filename = await this.exportService.saveDatabase(exportDatabaseDto);
    const file = createReadStream(join(process.cwd(), filename));
    return new StreamableFile(file, {
      type: 'text/csv',
      disposition: `attachment; filename="${filename}"`,
    });
  }
}
