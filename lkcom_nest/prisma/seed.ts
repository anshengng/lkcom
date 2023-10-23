import _ from 'lodash';
import { user } from './seeds/user';
import comment from './seeds/comments';
import post from './seeds/post';

async function run() {
    await user()
    await comment()
    await post()
};

run()