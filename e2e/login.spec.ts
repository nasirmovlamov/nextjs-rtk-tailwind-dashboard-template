import { expect, test } from '@playwright/test';

test.describe('application tests', () => {
  const corpusdata = {
    name: 'testCorpus',
    code: 11,
  };

  test('test login', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('#username').click();
    await page.locator('#username').click();
    await page.locator('#username').fill('test');
    await page.getByRole('textbox', { name: 'Şifrə' }).click();
    await page.getByRole('textbox', { name: 'Şifrə' }).fill('testtest');
    await page.getByRole('button', { name: 'Davam et' }).click();

    // check corpus create / list / view / edit
    await page.getByTestId('button-korpuslar').click();
    await page.getByTestId('link-/corps/create').click();
    expect(await page.getByTestId('corps-title')).toHaveText('Korpus əlavə et');
    await page.getByTestId('input-corpusname').fill(corpusdata.name);
    await page.getByTestId('input-corpusserialnumber').fill(String(corpusdata.code));

    await page.getByTestId('button-submit').click();
    await expect(page.getByText('Məlumat uğurla yaradıldı!')).toBeVisible();

    await page.getByTestId('link-/corps').click();
    await expect(page.getByText(corpusdata.name)).toBeVisible();
  });
});
