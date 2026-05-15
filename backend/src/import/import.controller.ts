import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImportDatabaseDto } from './dto/import-database.dto';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @UseGuards(RolesGuard)
  @Roles(['manager'])
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() importDatabaseDto: ImportDatabaseDto,
  ) {
    if (!file) {
      throw new BadRequestException('CSV file is required.');
    }

    return this.importService.importDatabase(file, importDatabaseDto);
  }
}
