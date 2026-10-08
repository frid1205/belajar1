import { Locator, Page, expect } from '@playwright/test';

export class DaftarGajiPage {
  readonly page: Page;
  readonly addDaftarGajiButton: Locator;
  readonly employeeCombobox: Locator;
  readonly employeeSearchInput: Locator;
  readonly employeeGroupCombobox: Locator;
  readonly basic: Locator;
  readonly position: Locator;
  readonly expat: Locator;
  readonly home: Locator;
  readonly hotSkill: Locator;
  readonly saveButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addDaftarGajiButton = page.getByRole('button', { name: /Add Daftar Gaji/i });
    this.employeeCombobox = page.getByRole('combobox').filter({ hasText: /^Select employee$/i });
    this.employeeSearchInput = page.locator('[data-slot="command-input"]');
    this.employeeGroupCombobox = page.getByRole('combobox').filter({ hasText: /^Select employee group$/i });
    this.basic = page.getByPlaceholder('Enter basic');
    this.position = page.getByPlaceholder('Enter position');
    this.expat = page.getByPlaceholder('Enter expat');
    this.home = page.getByPlaceholder('Enter home');
    this.hotSkill = page.getByPlaceholder('Enter hot skill');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.successAlert = page.getByRole('status');
  }

  async navigateTo() {
    await expect(this.page).not.toHaveURL(/login/);
    await this.page.goto('https://telkomcel-s1.lumoshive.net/daftar-gaji');
  }

  // Helper method untuk memilih karyawan
  async selectEmployee(name: string) {
    await this.employeeCombobox.click();
    await this.employeeSearchInput.fill(name);
    await this.page.getByRole('option', { name: new RegExp(name, 'i') }).click();
  }

  // Helper method untuk memilih employee group
  async selectEmployeeGroup(group: string) {
    await this.employeeGroupCombobox.click();
    await this.page.getByRole('option', { name: new RegExp(group, 'i') }).click();
  }

  async isiDaftarGaji(
    employeeName: string,
    group: string,
    basic: string,
    position: string,
    expat: string,
    home: string,
    hotSkill: string
  ) {
    // 1. Klik tombol 'Add Daftar Gaji'
    await this.addDaftarGajiButton.click();

    // 2. Pilih Employee & Group menggunakan helper method yang rapi
    await this.selectEmployee(employeeName);
    await this.selectEmployeeGroup(group);

    // 3. Isi field nominal gaji
    await this.basic.fill(basic);
    await this.position.fill(position);
    await this.expat.fill(expat);
    await this.home.fill(home);
    await this.hotSkill.fill(hotSkill);

    // 4. Simpan
    await this.saveButton.click();
  }

    // 5. Verifikasi alert / toast success
  async verifySuccessAlert() {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toContainText(/Reguler created successfully/i);
  }
}


