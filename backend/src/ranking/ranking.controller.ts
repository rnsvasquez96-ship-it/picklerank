import {
  Controller,
  Get,
  Param,
} from "@nestjs/common";

import { RankingService } from "./ranking.service";

@Controller("ranking")
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
  ) {}

  @Get()
  getRankings() {
    return this.rankingService.getRankings();
  }

  // ✅ Tournament standings
  @Get("tournament/:id")
  getTournamentStandings(
    @Param("id") id: string,
  ) {
    return this.rankingService.getTournamentStandings(
      +id,
    );
  }
}