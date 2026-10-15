



/* 1. MENU DATA */

const MENU = {
  "Coffee": [
    ["Espresso", "Rich, syrupy, double shot", "3.0"],
    ["Flat white", "Velvety milk, two shots", "4.2"],
    ["Cinnamon latte", "Brown sugar, cinnamon, steamed milk", "4.8"],
    ["Mocha", "Dark chocolate and espresso", "4.9"],
    ["Pour-over", "Single origin, brewed slowly", "4.5"],
    ["Cold brew", "Steeped 18 hours, served over ice", "4.4"]
  ],

  "Not coffee": [
    ["Hot chocolate", "Real chocolate, whipped cream", "4.2"],
    ["Chai latte", "Spiced black tea, frothy milk", "4.3"],
    ["Honey ginger tea", "Fresh ginger and local honey", "3.8"],
    ["Steamer", "Warm vanilla milk, nothing else", "3.2"]
  ],

  "Bakes": [
    ["Butter croissant", "Baked at 5 a.m. daily", "3.4"],
    ["Cardamom bun", "Sticky, sweet and still warm", "3.8"],
    ["Banana bread", "Toasted with salted butter", "3.6"],
    ["Oat cookie", "Chewy, with dark chocolate chunks", "2.6"]
  ]
};


/* 2. GET HTML ELEMENTS */

const tabs = document.querySelector(".tabs");
const menuList = document.getElementById("menuList");

const root = document.documentElement;
const themeButton = document.getElementById("theme");

const yearElement = document.getElementById("year");


/* 3. CREATE MENU TABS */

function createMenuTabs() {
  const categories = Object.keys(MENU);

  categories.forEach((category, index) => {
    const button = document.createElement("button");

    button.className = "tab";
    button.type = "button";
    button.textContent = category;

    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");

    button.dataset.category = category;

    // Only the active tab belongs in the normal tab sequence.
    button.tabIndex = index === 0 ? 0 : -1;

    button.addEventListener("click", () => {
      showMenu(category);
    });

    // Support left/right arrow keyboard navigation.
    button.addEventListener("keydown", (event) => {
      if (
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft"
      ) {
        return;
      }

      event.preventDefault();

      const buttons = Array.from(tabs.children);
      const currentIndex = buttons.indexOf(button);

      const direction =
        event.key === "ArrowRight" ? 1 : -1;

      const nextIndex =
        (currentIndex + direction + buttons.length) %
        buttons.length;

      const nextButton = buttons[nextIndex];

      nextButton.focus();
      showMenu(nextButton.dataset.category);
    });

    tabs.appendChild(button);
  });
}


/* 4. DISPLAY SELECTED MENU CATEGORY */

function showMenu(category) {
  if (!Object.hasOwn(MENU, category)) {
    return;
  }

  // Update tab selection.
  Array.from(tabs.children).forEach((button) => {
    const isSelected =
      button.dataset.category === category;

    button.setAttribute(
      "aria-selected",
      String(isSelected)
    );

    button.tabIndex = isSelected ? 0 : -1;
  });

  // Clear the previous menu items.
  menuList.replaceChildren();

  // Create menu items safely using DOM methods.
  MENU[category].forEach(([name, description, price]) => {
    const item = document.createElement("article");
    item.className = "item";

    const details = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = name;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    const priceElement = document.createElement("span");
    priceElement.className = "price";
    priceElement.textContent = `$${price}`;

    details.append(heading, paragraph);
    item.append(details, priceElement);

    menuList.appendChild(item);
  });

  // Keep the menu panel accessible.
  menuList.setAttribute(
    "aria-label",
    `${category} menu items`
  );
}


/* 5. THEME MANAGEMENT */

const THEME_STORAGE_KEY = "kaffenio-theme";

function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(
      THEME_STORAGE_KEY
    );

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      return savedTheme;
    }
  } catch (error) {
    // Storage might be unavailable in some browser contexts.
  }

  return null;
}


function getSystemTheme() {
  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}


function getCurrentTheme() {
  const explicitTheme = root.getAttribute("data-theme");

  if (
    explicitTheme === "light" ||
    explicitTheme === "dark"
  ) {
    return explicitTheme;
  }

  return getSystemTheme();
}


function applyTheme(theme, savePreference = false) {
  root.setAttribute("data-theme", theme);

  const isDark = theme === "dark";

  const icon = themeButton.querySelector(".theme-icon");
  const label = themeButton.querySelector(".theme-label");

  icon.textContent = isDark ? "☀" : "☾";
  label.textContent = isDark ? "Light" : "Dark";

  themeButton.setAttribute(
    "aria-label",
    isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
  );

  // Update the browser's theme color.
  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      isDark ? "#150C07" : "#3A2418"
    );
  }

  if (savePreference) {
    try {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        theme
      );
    } catch (error) {
      // The theme still works for the current page.
    }
  }
}


/* 6. THEME BUTTON EVENT */

themeButton.addEventListener("click", () => {
  const currentTheme = getCurrentTheme();

  const nextTheme =
    currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme, true);
});


/* 7. RESPECT SYSTEM THEME CHANGES */

const systemThemePreference = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

systemThemePreference.addEventListener("change", () => {
  // Follow the operating system only if the user
  // has not explicitly saved a theme preference.
  if (!getSavedTheme()) {
    root.removeAttribute("data-theme");
    applyTheme(getSystemTheme());
  }
});


/* 8. INITIALIZE WEBSITE */

function initializeKaffenio() {
  // Build menu tabs and display the first category.
  createMenuTabs();

  const firstCategory = Object.keys(MENU)[0];

  showMenu(firstCategory);

  // Restore the saved theme, or use system preference.
  const savedTheme = getSavedTheme();

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    root.removeAttribute("data-theme");
    applyTheme(getSystemTheme());
  }

  // Set the current year automatically.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}


// Initialize after the HTML has loaded.
initializeKaffenio();
