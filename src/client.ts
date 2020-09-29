import * as sapper from '@sapper/app';

import { startClient } from './middleware/i18n';

startClient();

sapper.start({
	target: document.querySelector('#sapper')
});