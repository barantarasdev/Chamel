import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenT } from '../../../src/types/auth';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { RefreshTokenGuard } from '../../guards/refreshToken.guard';
import { User } from '../../decorators/user.decorator';
import { UserD } from '../../types/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'signIn' })
  @ApiResponse({ status: 200, type: TokenT })
  @ApiBody({ type: SignInDTO })
  @Post('/signIn')
  signIn(@Body() dto: SignInDTO): Promise<TokenT> {
    return this.authService.signIn(dto);
  }

  @ApiOperation({ summary: 'signUp' })
  @ApiResponse({ status: 201, type: TokenT })
  @ApiBody({ type: SignUpDTO })
  @Post('/signUp')
  signUp(@Body() dto: SignUpDTO): Promise<TokenT> {
    return this.authService.signUp(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'refreshToken' })
  @ApiResponse({ status: 200, type: TokenT })
  @Get('/refresh')
  refresh(@User() user: UserD): Promise<TokenT> {
    return this.authService.refresh(user?.refreshToken || null);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'signOut' })
  @ApiResponse({ status: 200 })
  @Delete('/signOut')
  signOut(@User() user: UserD): Promise<void> {
    return this.authService.signOut(
      user?.accessToken || null,
      user?.refreshToken || null
    );
  }
}
