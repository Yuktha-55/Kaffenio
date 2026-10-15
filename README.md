# Kaffenio

Kaffenio is a responsive coffee house landing page inspired by slow mornings, freshly brewed coffee, and the warmth of a neighborhood café. It features an espresso-inspired visual design, an interactive menu, café story, coffee bean profiles, visit information, and a responsive layout for different screen sizes.

## Features

- **Responsive design** — Adapts to desktop, tablet, and mobile screens.
- **Café-inspired UI** — Warm espresso, mocha, caramel, and cream color palette.
- **Hero section** — Navigation, introductory content, and calls to action.
- **Interactive menu** — Switch between coffee, non-coffee drinks, and bakes.
- **Data-driven rendering** — Menu items are generated dynamically from `script.js`.
- **Light and dark themes** — Supports manual theme switching and system-preference detection.
- **Theme persistence** — Saves the selected theme using `localStorage`.
- **Keyboard accessibility** — Menu tabs support left and right arrow navigation.
- **Semantic HTML** — Uses meaningful landmarks, labels, and accessible navigation.
- **Live menu updates** — Announces menu content changes to assistive technologies.
- **Reduced-motion support** — Respects users' motion preferences.
- **Dynamic copyright year** — Updates automatically using JavaScript.
- **Typography** — Uses Fraunces and Nunito from Google Fonts, with system font fallbacks.

## Tech Stack

- **HTML5** — Page structure and semantic markup.
- **CSS3** — Styling, layouts, responsive design, themes, and animations.
- **JavaScript (ES6+)** — Menu rendering, tab interactions, theme management, and dynamic content.
- **Google Fonts** — Typography using Fraunces and Nunito.
- **localStorage** — Persists the selected theme preference.

## Project Structure

| File | Purpose |
|---|---|
| `index.html` | Page structure, content, navigation, and semantic markup |
| `styles.css` | Theme variables, layout, responsive rules, animations, and component styles |
| `script.js` | Menu rendering, menu-tab interactions, theme management, and year initialization |
| `logo.png` | Kaffenio brand asset |
| `README.md` | Project documentation and setup instructions |

## Getting Started

### Run Locally

No build step or dependency installation is required.

1. Clone or download the repository.
2. Open the project folder in your code editor.
3. Open `index.html` in a browser.

For a local development server, you can use the **Live Server** extension in Visual Studio Code or run:

```bash
npx serve .
```

The page can run without a development server, although using one is recommended during development.

**Note:** Fraunces and Nunito load from Google Fonts when an internet connection is available. System font fallbacks are provided for offline use.

## Customizing the Menu

Menu categories and items are defined in the `MENU` object near the top of `script.js`.

Each menu item follows this format:

```js
["Drink name", "Short description", "4.50"]
```

For example:

```js
["Caramel Latte", "Espresso, steamed milk, and caramel.", "4.50"]
```

Add, remove, or edit entries in the `MENU` object to update the displayed menu without modifying the HTML structure.

## Theme Preferences

Kaffenio supports light and dark themes. The page detects the user's system preference and allows them to switch themes manually. The selected preference is saved in `localStorage` so it can be restored on subsequent visits.

## Accessibility

The project includes accessibility-focused features such as:

- Semantic HTML landmarks.
- Keyboard navigation for menu tabs.
- Accessible labels and live announcements for menu updates.
- Support for reduced-motion preferences.
- Responsive layouts for different screen sizes.

## Future Improvements

- Add a dedicated coffee shop location map.
- Include online ordering and shopping cart functionality.
- Add a contact form and reservation feature.
- Improve menu presentation with coffee and bakery photography.
- Deploy the website using GitHub Pages or another static hosting service.

## License

This project is intended for learning and portfolio development. Add a license file if you plan to distribute or reuse the project under specific licensing terms.

---

**Kaffenio — A little warmth in every cup.**
