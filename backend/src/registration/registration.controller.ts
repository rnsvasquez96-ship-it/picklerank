import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
  ) {}

  @Post()
  create(
    @Body() data: CreateRegistrationDto,
  ) {
    return this.registrationService.create(data);
  }

  @Get('tournament/:id')
  findByTournament(
    @Param('id') id: string,
  ) {
    return this.registrationService.findByTournament(+id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.registrationService.remove(+id);
  }
}