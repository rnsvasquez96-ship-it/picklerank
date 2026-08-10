import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";

import { PlayerService } from "./player.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";

@Controller("player")
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

  @Get(":id/stats")
  getPlayerStats(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.playerService.getPlayerStats(id);
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.playerService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdatePlayerDto,
  ) {
    return this.playerService.update(id, data);
  }

  @Delete(":id")
  remove(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.playerService.remove(id);
  }
}