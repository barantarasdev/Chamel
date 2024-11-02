import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user-create.dto';
import { UpdateUserDTO } from './dto/user-update.dto';
import { CommonZodValidationPipe } from '../../pipes/common-zod-validation.pipe';
import { userValidation } from '@libs/validation';
import { UserC } from './interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: UserC })
  @ApiParam({ name: 'userId', required: true, description: 'User id' })
  @Get('/:userId')
  getUser(@Param('userId') userId: string): Promise<UserC | null> {
    return this.userService.getUser(userId);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserC })
  @ApiBody({ type: CreateUserDTO })
  @UsePipes(new CommonZodValidationPipe(userValidation.createUserSchema))
  @Post()
  createUser(@Body() dto: CreateUserDTO): Promise<UserC> {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserC })
  @ApiParam({ name: 'userId', required: true, description: 'User id' })
  @ApiBody({ type: UpdateUserDTO })
  @UsePipes(new CommonZodValidationPipe(userValidation.updateUserSchema))
  @Put('/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDTO
  ): Promise<UserC> {
    return this.userService.updateUser({ dto, userId });
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 200, type: UserC })
  @ApiParam({ name: 'userId', required: true, description: 'User id' })
  @Delete('/:userId')
  deleteUser(
    @Param('userId') userId: string
  ): Promise<Pick<UserC, 'id'> | null> {
    return this.userService.removeUser(userId);
  }
}
