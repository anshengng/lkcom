import { SetMetadata } from '@nestjs/common';

export interface IPolicy {

}

export const POLICY_KEY = 'policy';
export const Policy = (policy: IPolicy) => SetMetadata(POLICY_KEY, policy);
