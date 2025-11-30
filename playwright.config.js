// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';
import { on } from 'events';

const config =({

  testDir: './tests',
  //timeout: 40 *1000,
  timeout: 50*1000, 
  expect:{
    timeout: 5000,
  },

  reporter: 'html', //By adding this will get report in html format

  use:{

    browserName: 'chromium',
    //browserName: 'webkit',
    //browserName: 'firefox',
    headless: false,
    screenshot: 'on failure',
    //trace: 'off',s
    //trace: 'on',
    //trace: 'retain-on-failure',

    ignoreHTTPSErrors: true
  },


});
module.exports = config

