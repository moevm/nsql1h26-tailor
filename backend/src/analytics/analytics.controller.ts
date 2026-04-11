import { Controller, Get, Query } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { orderQueryDto } from './dto/order-query.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  findAll(@Query() filter: orderQueryDto) {
    return this.analyticsService.getAnalytics(filter);
  }
}
