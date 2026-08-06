import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';

import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
  ) {}

  @Post()
  create(@Body() data: CreatePlayerDto) {
    return this.playerService.create(data);
  }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}