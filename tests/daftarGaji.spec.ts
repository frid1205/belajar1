import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DaftarGajiPage } from '../pages/DaftarGajiPage';

test('Isi Daftar Gaji', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const daftarGajiPage = new DaftarGajiPage(page);

  // 1. Login terlebih dahulu
  await loginPage.navigateTo();
  await loginPage.login('0000000', 'PasswordSuperAdmin@Tecel67');

  // 2. Masuk ke halaman Daftar Gaji dan isi data
  await daftarGajiPage.navigateTo();
  await daftarGajiPage.isiDaftarGaji('ABRAO SARMENTO', 'Local', '500', '500', '500', '500', '500');

  // 3. Verifikasi alert / toast success
  await daftarGajiPage.verifySuccessAlert();
});

  