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
  retries: 2
,
  projects: [
    {
      name: 'chrome',
      use:{

      browserName: 'chromium',
      headless: false,
      screenshot: 'on',
      trace: 'on',
      ignoreHTTPSErrors: true
      }
    }, 

    {
      name: 'firefox',
      use:{

      browserName: 'firefox',
      headless: true,
      screenshot: 'on',
      trace: 'on',
      ignoreHTTPSErrors: true
      }
    }
  ],

});
module.exports = config

