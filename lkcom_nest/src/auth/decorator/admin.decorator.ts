import { AuthGuard } from '@nestjs/passport';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AdminGuard } from '../guards/admin.guard'

export function Admin() {
  return applyDecorators(UseGuards(AuthGuard('jwt'),AdminGuard))
}