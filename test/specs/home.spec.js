import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import HomeData from '../data/home.data.json' with { type: 'json' };
import allureReporter from '@wdio/allure-reporter'

describe('Cheapflights Home Page', () => {
    beforeEach(async () => {
        await HomePage.open(HomeData.home);
    });

    it('Verify if Logo is displayed in the home page', async () => {
        await allureReporter.addStory('Develop tests for validation the logo and login button is displayed');
        const cfLogo = await HomePage.cfLogo;
        await cfLogo.waitForDisplayed();
        await expect(cfLogo).toBeDisplayed({ message: `Failed to display the Cheapflights logo in the home page.` });
    });

    it('Verify if the login button is displayed in the home page', async () => {
        await allureReporter.addStory('Develop tests for validation the logo and login button is displayed');
        const loginBtn = await HomePage.loginBtn;
        const loginIcon = await HomePage.loginIcon;
        await expect(loginBtn).toBeDisplayed({ message: `Failed to display the white circle in the login button.` });
        await expect(loginIcon).toBeDisplayed({ message: `Failed to display the user icon in the login button.` });
    });


});

