/*
 * Copyright 2018 Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as fire from '../side.effects/firebase';
import rootReducer from './root.reducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const middlewares = applyMiddleware(
  thunk.withExtraArgument({
    fire
  })
);

export const store = createStore(
  rootReducer,
  isDevelopment ? composeWithDevTools(middlewares) : middlewares
);
