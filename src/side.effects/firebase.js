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

import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDMgyPr0V49Rdf5ODAU9nLY02ZGEUNoxiM',
  authDomain: 'remote-testrunner.firebaseapp.com',
  databaseURL: 'https://remote-testrunner.firebaseio.com',
  projectId: 'remote-testrunner',
  storageBucket: 'remote-testrunner.appspot.com',
  messagingSenderId: '183582255751',
};

firebase.initializeApp(config);

export const deviceLastResultDatabase = (project, device) =>
  firebase.database().ref(`${project}/${device}/`).limitToLast(1).once('value');

export const deviceResultDatabase = (project, device) =>
  firebase.database().ref().child(`${project}/${device}/`).once('value');

export const iotjsCoverageResults = (device) =>
  firebase.database().ref().child(`coverage/iotjs/${device}/`).once('value');
