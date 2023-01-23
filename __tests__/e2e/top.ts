describe("Top page", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/`);
  });
  test("display Top", async () => {
    const paySplitLink = await page.$eval(
      "[data-test=pay-split-link]",
      el => (el as HTMLAnchorElement).href
    );
    const payTotalLink = await page.$eval(
      "[data-test=pay-total-link]",
      el => (el as HTMLAnchorElement).href
    );
    expect(paySplitLink).toBe(`${TARGET_PAGE_URL}/pay-split`);
    expect(payTotalLink).toBe(`${TARGET_PAGE_URL}/pay-total`);
  });
});
