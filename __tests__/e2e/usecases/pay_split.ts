describe("Pay split", () => {
  beforeEach(async () => {
    await page.goto(`${TARGET_PAGE_URL}/`);
    await Promise.all([
      page.waitForSelector("[data-test=coins]"),
      page.click("[data-test=pay-split-link]"),
    ]);
  });

  test("calc success", async () => {
    await page.type("[data-test=coins]", "1000");
    await page.type("[data-test=people]", "3");
    await Promise.all([
      page.waitForSelector(".result"),
      page.click("[data-test=submit]"),
    ]);

    const resultCoin = await page.$eval(
      "[data-test=result-coins]",
      el => (el as HTMLSpanElement).innerText
    );
    expect(resultCoin.trim()).toBe("334");

    await Promise.all([
      page.waitForSelector("[data-test=coins]"),
      page.click("[data-test=back-link]"),
    ]);

    const coins = await page.$("[data-test=coins]");
    const people = await page.$("[data-test=people]");
    expect(coins).not.toBeNull();
    expect(people).not.toBeNull();
  });

  test("calc input blank", async () => {
    await page.type("[data-test=coins]", "");
    await page.type("[data-test=people]", "");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);

    const resultCoins = await page.$("[data-test=result-coins]");
    const coins = await page.$("[data-test=coins]");
    const people = await page.$("[data-test=people]");

    expect(resultCoins).toBeNull();
    expect(coins).not.toBeNull();
    expect(people).not.toBeNull();

    const errorMessages = await page.$eval(
      "[data-test=error-panel]",
      el => (el as HTMLDivElement).innerText
    );
    expect(errorMessages).toMatch("Coins required");
    expect(errorMessages).toMatch("People required");
  });

  test("calc input negative coins", async () => {
    await page.type("[data-test=coins]", "-1000");
    await page.type("[data-test=people]", "3");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);

    const resultCoins = await page.$("[data-test=result-coins]");
    const coins = await page.$eval("[data-test=coins]", el =>
      el.getAttribute("value")
    );
    const people = await page.$eval("[data-test=people]", el =>
      el.getAttribute("value")
    );

    expect(resultCoins).toBeNull();
    expect(coins).toBe("-1000");
    expect(people).toBe("3");

    const errorMessages = await page.$eval(
      "[data-test=error-panel]",
      el => (el as HTMLDivElement).innerText
    );
    expect(errorMessages).toMatch(
      "Coins must be a number greater than or equal to 1"
    );
  });

  test("calc input negative people", async () => {
    await page.type("[data-test=coins]", "1000");
    await page.type("[data-test=people]", "-3");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);

    const resultCoins = await page.$("[data-test=result-coins]");
    const coins = await page.$eval("[data-test=coins]", el =>
      el.getAttribute("value")
    );
    const people = await page.$eval("[data-test=people]", el =>
      el.getAttribute("value")
    );

    expect(resultCoins).toBeNull();
    expect(coins).toBe("1000");
    expect(people).toBe("-3");

    const errorMessages = await page.$eval(
      "[data-test=error-panel]",
      el => (el as HTMLDivElement).innerText
    );
    expect(errorMessages).toMatch(
      "People must be a number greater than or equal to 1"
    );
  });
});
