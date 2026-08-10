import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { MatchService } from "./match.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { UpdateResultDto } from "./dto/update-result.dto";

@Controller("match")
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
  ) {}

  @Post()
  create(
    @Body() data: CreateMatchDto,
  ) {
    return this.matchService.create(data);
  }

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get("tournament/:id")
  findByTournament(
    @Param("id") id: string,
  ) {
    return this.matchService.findByTournament(+id);
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
  ) {
    return this.matchService.findOne(+id);
  }

  @Patch(":id/result")
  updateResult(
    @Param("id") id: string,
    @Body() data: UpdateResultDto,
  ) {
    return this.matchService.updateResult(
      +id,
      data,
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() data: UpdateMatchDto,
  ) {
    return this.matchService.update(
      +id,
      data,
    );
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
  ) {
    return this.matchService.remove(+id);
  }
}