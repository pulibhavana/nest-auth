import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GreetingsService } from './greetings.service';
import { AzureADGuard   } from '../authentication/strategies/azuread.strategy';
import { AdminGuard } from '../authentication/strategies/admin.guard';
import { UserGuard } from '../authentication/strategies/user.guard';

@ApiTags('Greetings')
@Controller('greetings')
@ApiBearerAuth()

export class GreetingsController {
    constructor(private readonly greetingsService: GreetingsService) { }

    @Get()
    @UseGuards(AzureADGuard,UserGuard)
    async getGreetings(): Promise<any> {
        return this.greetingsService.getGreetings();
    }

    @Get('/:user')
    @UseGuards(AzureADGuard,AdminGuard)
    async getGreetingsPersonalized(@Param('user') user: string): Promise<any> {
        return this.greetingsService.getGreetingsPersonalized(user);
    }
}


