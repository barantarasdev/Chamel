import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { RefreshTokenGuard } from '../../guards/refresh-token.guard';
import { User } from '../../decorators/user.decorator';
import { authValidation } from '@libs/validation';
import { CommonZodValidationPipe } from '../../pipes/common-zod-validation.pipe';
import { TokenC } from './interfaces/auth.interface';
import { UserI } from '../../decorators/interfaces/decorators.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'signIn' })
  @ApiResponse({ status: 200, type: TokenC })
  @ApiBody({ type: SignInDTO })
  @Post('/signIn')
  signIn(@Body() dto: SignInDTO): Promise<TokenC> {
    return this.authService.signIn(dto);
  }

  @ApiOperation({ summary: 'signUp' })
  @ApiResponse({ status: 201, type: TokenC })
  @ApiBody({ type: SignUpDTO })
  @UsePipes(new CommonZodValidationPipe(authValidation.signUpSchema))
  @Post('/signUp')
  signUp(@Body() dto: SignUpDTO): Promise<TokenC> {
    return this.authService.signUp(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'refreshToken' })
  @ApiResponse({ status: 200, type: TokenC })
  @Get('/refresh')
  refresh(@User() user: UserI): Promise<TokenC> {
    return this.authService.refresh(user?.refreshToken || null);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'signOut' })
  @ApiResponse({ status: 200 })
  @Delete('/signOut')
  signOut(@User() user: UserI): Promise<void> {
    return this.authService.signOut(
      user?.accessToken || null,
      user?.refreshToken || null
    );
  }
}
