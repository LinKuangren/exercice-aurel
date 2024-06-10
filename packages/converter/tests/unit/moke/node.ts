import { setupServer } from 'msw/node';

import { handlers } from '../moke/handler.ts';

export const server = setupServer(...handlers)
