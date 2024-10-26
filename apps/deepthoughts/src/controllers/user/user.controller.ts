import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserT } from '../../types/user';
import { CreateUserDTO } from './dto/user-create.dto';
import { UpdateUserDTO } from './dto/user-update.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: UserT })
  @ApiParam({ name: 'userId', required: true, description: 'User id' })
  @Get('/:userId')
  getUser(@Param('userId') userId: string): Promise<UserT | null> {
    return this.userService.getUser(userId);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserT })
  @ApiBody({ type: CreateUserDTO })
  @Post()
  createUser(@Body() dto: CreateUserDTO): Promise<UserT> {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserT })
  @ApiParam({ name: 'userId', required: true, description: 'User id' })
  @ApiBody({ type: CreateUserDTO })
  @Put('/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDTO
  ): Promise<UserT> {
    return this.userService.updateUser({ dto, userId });
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 200, type: UserT })
  @ApiParam({ name: 'userId', required: true, description: 'User id' })
  @Delete('/:userId')
  deleteUser(
    @Param('userId') userId: string
  ): Promise<Pick<UserT, 'id'> | null> {
    return this.userService.removeUser(userId);
  }
}
