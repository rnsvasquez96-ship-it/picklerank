import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { TournamentService } from "./tournament.service";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { UpdateTournamentDto } from "./dto/update-tournament.dto";

@Controller("tournament")
export class TournamentController {
  constructor(
    private readonly tournamentService: TournamentService,
  ) {}

  @Post()
  create(
    @Body() createTournamentDto: CreateTournamentDto,
  ) {
    return this.tournamentService.create(
      createTournamentDto,
    );
  }

  @Get()
  findAll() {
    return this.tournamentService.findAll();
  }

  // ✅ Tournament Progress
  @Get(":id/progress")
  getProgress(
    @Param("id") id: string,
  ) {
    return this.tournamentService.getProgress(+id);
  }

  // ✅ Tournament Standings
  @Get(":id/standings")
  getStandings(
    @Param("id") id: string,
  ) {
    return this.tournamentService.getStandings(+id);
  }

  // ✅ Get Tournament
  @Get(":id")
  findOne(
    @Param("id") id: string,
  ) {
    return this.tournamentService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentService.update(
      +id,
      updateTournamentDto,
    );
  }

  // ✅ Generate Bracket
  @Post(":id/generate-bracket")
  generateBracket(
    @Param("id") id: string,
  ) {
    return this.tournamentService.generateBracket(
      +id,
    );
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
  ) {
    return this.tournamentService.remove(+id);
  }
}