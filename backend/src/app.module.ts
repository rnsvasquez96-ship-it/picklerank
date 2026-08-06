import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TournamentModule } from './tournament/tournament.module';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { RankingModule } from './ranking/ranking.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    PrismaModule,
    TournamentModule,
    PlayerModule,
    MatchModule,
    RankingModule,
    DashboardModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}