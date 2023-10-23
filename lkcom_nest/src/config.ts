import {registerAs} from '@nestjs/config';

export default registerAs('config',()=>{
    return {
        port: 3000,
        name: 'jizhu',
        TOKEN_SECRET: 'jizhu',
    }
})