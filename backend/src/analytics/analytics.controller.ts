import { Roles } from '@/common/decorator/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { OrderQueryDto } from './dto/order-query.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(RolesGuard)
  @Roles(['manager'])
  @Get()
  findAll(@Query() orderQueryDto: OrderQueryDto) {
    return this.analyticsService.getAnalytics(orderQueryDto);
  }
}
