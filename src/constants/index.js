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

export const devices = [{
    key: 'artik053',
    name: 'ARTIK 053',
    link: 'https://developer.artik.io/documentation/artik-05x/',
    platform: {
      name: 'TizenRT',
      link: 'https://github.com/Samsung/TizenRT',
    },
  }, {
    key: 'artik530',
    name: 'ARTIK 530',
    link: 'https://www.artik.io/modules/artik-530/',
    platform: {
      name: 'Tizen',
      link: 'https://www.tizen.org/',
    },
  }, {
    key: 'rpi2',
    name: 'Raspberry Pi 2',
    link: 'https://www.raspberrypi.org/products/raspberry-pi-2-model-b/',
    platform: {
      name: 'Raspbian Jessie',
      link: 'https://www.raspbian.org/',
    },
  }, {
    key: 'stm32f4dis',
    name: 'STM32F4-Discovery',
    link: 'http://www.st.com/en/evaluation-tools/stm32f4discovery.html',
    platform: {
      name: 'NuttX',
      link: 'http://nuttx.org/',
    },
  },
];

export const projects = {
  iotjs: {
    key: 'iotjs',
    name: 'IoT.js',
    url: 'https://github.com/Samsung/iotjs',
  },
  jerryscript: {
    key: 'jerryscript',
    name: 'JerryScript',
    url: 'https://github.com/jerryscript-project/jerryscript',
  },
};

export const pagination = {
  numberOfTestPerPage: 20,
};
