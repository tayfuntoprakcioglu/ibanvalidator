# IBAN Formatter & Validator 🌍

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-stable-success.svg)

A modern, privacy-focused, and highly responsive IBAN (International Bank Account Number) formatter and validator. This tool runs entirely in your browser, ensuring your banking data never leaves your device. Start validating IBANs from over 70 countries instantly with real-time feedback.

## ✨ Key Features

- **🛡️ Privacy First:** Zero server-side processing. All validation happens locally in your browser using pure JavaScript.
- **🌍 Global Support:** Validates IBAN formats for **70+ countries** worldwide.
- **⚡ Real-time Validation:** Instant feedback on format, length, and checksum (MOD-97 algorithm) as you type.
- **🎨 Modern UI/UX:**
  - Beautiful Light & Dark modes 🌓
  - Glassmorphism design elements
  - Smooth animations and toast notifications
- **🌐 Multilingual:** Native support for **English** and **Turkish** languages.
- **📋 Smart Tools:**
  - One-click copy
  - Auto-formatting with spacing
  - Automatic country detection with flag icons
  - Example IBANs for quick testing
- **📱 Responsive:** Fully optimized for desktop, tablet, and mobile devices.

## 🚀 Quick Start

No installation or build process is required! This is a vanilla JavaScript project.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tayfuntoprakcioglu/iban-validator.git
   ```
2. **Open the project:**
   Simply open `index.html` in your favorite web browser.

That's it! You are ready to validate.

## 🛠️ Technology Stack

- **HTML5:** Semantic markup for better accessibility and SEO.
- **CSS3:** Custom properties (variables), Flexbox/Grid layouts, and responsive media queries. No frameworks used.
- **JavaScript (ES6+):** Modular architecture with separate files for logic (`validator.js`), translations (`translations.js`), and UI handling (`app.js`).

## 📂 Project Structure

```
ibanvalidator/
├── index.html          # Main application entry point
├── styles.css          # Core styles and theming
├── donate-styles.css   # Specific styles for the donation modal
├── app.js              # Main UI logic and event handlers
├── validator.js        # Core IBAN validation logic & country data
├── translations.js     # i18n dictionary (EN/TR)
└── donate-copy.js      # Copy-to-clipboard functionality for donations
```

## 🤝 Contributing

Contributions are always welcome!
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💖 Support the Project

If you find this tool useful, you can support its development to keep it free and fast.

**Donation Options:**
- **GitHub Sponsors:** [Sponsor on GitHub](https://github.com/sponsors/tayfuntoprakcioglu)
- **Crypto (USDT ERC20):** `0xb329b6ba44d3a8fee4b8a8a5bf0133e314fe7482`
- **Wise:**
  - Tag: `@tayfunt53`
  - Email: `info@tayfuntoprakcioglu.com`

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Created by [TAYFUN TOPRAKCIOGLU](https://tayfuntoprakcioglu.com)**

*Always verify important financial information through official banking channels. This tool is for validation and formatting convenience purposes.*
