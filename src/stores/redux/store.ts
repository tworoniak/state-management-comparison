import { configureStore, type Middleware } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { actionLog } from '../../lib/actionLog';

const actionLoggerMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);
  if (
    action &&
    typeof action === 'object' &&
    'type' in action &&
    typeof action.type === 'string' &&
    !action.type.startsWith('@@')
  ) {
    actionLog.dispatch({
      library: 'redux',
      action: (action.type as string).replace('cart/', ''),
      payload: (action as { type: string; payload?: unknown }).payload,
    });
  }
  return result;
};

export const store = configureStore({
  reducer: { cart: cartReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLoggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
