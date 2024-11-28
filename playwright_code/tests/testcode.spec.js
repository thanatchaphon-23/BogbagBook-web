import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // ---------------- Session 1: การลงทะเบียน (Sign Up) ----------------
  console.log('Session 1: การลงทะเบียน (Sign Up)');
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('link', { name: 'Sign Up' }).click();

  // กรอกอีเมลผิดในหลากหลายรูปแบบ
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Email').fill('punn');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Email').fill('punn@');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Email').fill('punn@gmail');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Email').fill('punn@gmail.com');
  await page.getByRole('button', { name: 'Sign up' }).click();

  // กรอก Username ผิดและถูกต้อง
  await page.getByLabel('Username').fill('punn');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Username').fill('punn^^');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Username').fill('punn^^123');
  await page.getByRole('button', { name: 'Sign up' }).click();

  // กรอกรหัสผ่านผิดและถูกต้อง
  await page.getByLabel('Password', { exact: true }).fill('123');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Password', { exact: true }).fill('123456');
  await page.getByLabel('Confirm Password').fill('123456');
  await page.getByRole('button', { name: 'Sign up' }).click();

  // ---------------- Session 2: การสร้างโพสต์ (Create Post) ----------------
  console.log('Session 2: การสร้างโพสต์ (Create Post)');
  await page.getByRole('link', { name: 'Create Post' }).click();

  // กรอกโพสต์ผิดและถูกต้อง
  await page.getByLabel('Title').fill('');
  await page.getByRole('button', { name: 'Post' }).click();
  await page.getByLabel('Title').fill('หม่าล่า');
  await page.getByLabel('Content').fill('');
  await page.getByRole('button', { name: 'Post' }).click();
  await page.getByLabel('Content').fill('หม่าล่าตอนกลางคืน โด้ปจัด');
  await page.getByRole('button', { name: 'Post' }).click();

  // ---------------- Session 3: การแก้ไขโพสต์ (Edit Post) ----------------
  console.log('Session 3: การแก้ไขโพสต์ (Edit Post)');
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('Content').fill('หม่าล่าตอนกลางคืน โด้ปจัด โอ้มายก้อด');
  await page.getByRole('button', { name: 'Update Post' }).click();
  await page.getByLabel('Title').fill('หม่าล่า อิอิ');
  await page.getByRole('button', { name: 'Update Post' }).click();

  // ---------------- Session 4: ไลค์/เลิกไลค์ และคอมเมนต์ ----------------
  console.log('Session 4: ไลค์/เลิกไลค์ และคอมเมนต์');
  await page.locator('#like-section-22').getByRole('button', { name: 'Like' }).click();
  await page.getByRole('button', { name: 'Unlike' }).click();

  // เพิ่มคอมเมนต์
  await page.locator('#comment_content').fill('สวัสดีนอนเถอะ');
  await page.getByRole('button', { name: 'Comment' }).click();
  await page.locator('#comment_content').fill('55555');
  await page.getByRole('button', { name: 'Comment' }).click();

  // ลบคอมเมนต์
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  await page.getByRole('button', { name: 'Delete' }).first().click();

  // ---------------- Session 5: ค้นหาโพสต์ (Search Posts) ----------------
  console.log('Session 5: ค้นหาโพสต์ (Search Posts)');
  await page.getByPlaceholder('Search posts...').fill('ไข่หวาน');
  await page.getByRole('button', { name: 'Search' }).click();

  // ---------------- Session 6: การเข้าสู่ระบบและออกจากระบบ ----------------
  console.log('Session 6: การเข้าสู่ระบบและออกจากระบบ');
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Login' }).click();

  // ล็อกอินผิดและถูกต้อง
  await page.getByLabel('Username').fill('wronguser');
  await page.getByLabel('Password').fill('wrongpass');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByLabel('Username').fill('punn^^123');
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();

  // ---------------- Session 7: การสำรวจโพสต์เพิ่มเติม ----------------
  console.log('Session 7: การสำรวจโพสต์เพิ่มเติม');
  await page.getByRole('link', { name: 'BogBagBook' }).click();
  await page.getByText('สวัสดีวันศุกร์งับ วันนี้ลองเพิ่มรูปงับพ้ม Posted by: Icetanat November 29, 2024').click();
  await page.getByRole('link', { name: 'BogBagBook' }).click();
});
