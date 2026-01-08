// Translations for IBAN Validator
// Supports: Turkish (tr) and English (en)

const translations = {
    en: {
        appTitle: 'IBAN Validator',
        tagline: 'Worldwide IBAN Formatting & Validation',
        validatorTitle: 'Enter IBAN Number',
        validatorSubtitle: 'Supports 70+ countries worldwide',
        ibanLabel: 'IBAN Number',
        validIban: 'Valid IBAN',
        invalidIban: 'Invalid IBAN',
        country: 'Country',
        countryCode: 'Country Code',
        checkDigits: 'Check Digits',
        length: 'Length',
        copy: 'Copy',
        copiedToast: 'Copied to clipboard!',
        exampleTitle: 'Try example IBANs:',
        infoCard1Title: '70+ Countries',
        infoCard1Text: 'Support for IBAN formats from all countries',
        infoCard2Title: 'Real-time Validation',
        infoCard2Text: 'Instant IBAN validation with checksum verification',
        infoCard3Title: 'Secure & Private',
        infoCard3Text: 'All validation happens locally in your browser',
        footer: 'Made with ❤️ for better banking experience',
        supportProject: 'Support This Project',
        developedBy: 'Developed by',
        donate: 'Donate',
        donateModalTitle: 'Support This Project ❤️',
        donateModalDesc: 'Help keep IBAN Validator free, fast, and privacy-friendly.',
        githubSponsors: 'GitHub Sponsors',
        cryptoSupport: 'Crypto support (USDT – ERC20)',
        wiseSupport: 'Wise support (multi-currency)',
        wiseDescription: 'You can donate in your own currency using Wise.',
        wiseTag: 'WISETAG',
        wiseEmail: 'EMAIL',
        thankYou: 'Thank you for helping keep this project fast, simple, and privacy-friendly. 🙏',
        donateTitle: 'Support This Project',
        donateDescription: 'If you find this tool useful, consider supporting its development',
        donateInfo: 'Your support helps maintain and improve this tool for everyone',

        // Error messages
        errorEmpty: 'Please enter an IBAN number',
        errorInvalidCountry: 'Invalid country code',
        errorInvalidLength: 'Invalid IBAN length',
        errorInvalidFormat: 'IBAN can only contain letters and numbers',
        errorInvalidChecksum: 'Invalid IBAN checksum'
    },
    tr: {
        appTitle: 'IBAN Doğrulayıcı',
        tagline: 'Dünya Geneli IBAN Formatlama ve Doğrulama',
        validatorTitle: 'IBAN Numarasını Girin',
        validatorSubtitle: '70+ ülke desteği',
        ibanLabel: 'IBAN Numarası',
        validIban: 'Geçerli IBAN',
        invalidIban: 'Geçersiz IBAN',
        country: 'Ülke',
        countryCode: 'Ülke Kodu',
        checkDigits: 'Kontrol Basamakları',
        length: 'Uzunluk',
        copy: 'Kopyala',
        copiedToast: 'Panoya kopyalandı!',
        exampleTitle: 'Örnek IBAN\'ları deneyin:',
        infoCard1Title: '70+ Ülke',
        infoCard1Text: 'Tüm ülkelerin IBAN formatları için destek',
        infoCard2Title: 'Anlık Doğrulama',
        infoCard2Text: 'Kontrol toplamı doğrulaması ile anında IBAN kontrolü',
        infoCard3Title: 'Güvenli ve Özel',
        infoCard3Text: 'Tüm doğrulama işlemleri tarayıcınızda gerçekleşir',
        footer: 'Daha iyi bankacılık deneyimi için ❤️ ile yapıldı',
        supportProject: 'Bu Projeyi Destekle',
        developedBy: 'Geliştirici',
        donate: 'Bağış Yap',
        donateModalTitle: 'Bu Projeyi Destekle ❤️',
        donateModalDesc: 'IBAN Validator\'ı ücretsiz, hızlı ve gizlilik dostu tutmaya yardımcı olun.',
        githubSponsors: 'GitHub Sponsors',
        cryptoSupport: 'Kripto destek (USDT – ERC20)',
        wiseSupport: 'Wise desteği (çoklu para birimi)',
        wiseDescription: 'Wise kullanarak kendi para biriminizde bağış yapabilirsiniz.',
        wiseTag: 'WISETAG',
        wiseEmail: 'E-POSTA',
        thankYou: 'Bu projeyi hızlı, basit ve gizlilik dostu tutmaya yardımcı olduğunuz için teşekkürler. 🙏',
        donateTitle: 'Bu Projeyi Destekle',
        donateDescription: 'Bu aracı faydalı buluyorsanız, geliştirilmesine destek olabilirsiniz',
        donateInfo: 'Desteğiniz bu aracı herkes için korumaya ve geliştirmeye yardımcı olur',

        // Error messages
        errorEmpty: 'Lütfen bir IBAN numarası girin',
        errorInvalidCountry: 'Geçersiz ülke kodu',
        errorInvalidLength: 'Geçersiz IBAN uzunluğu',
        errorInvalidFormat: 'IBAN sadece harf ve rakam içerebilir',
        errorInvalidChecksum: 'Geçersiz IBAN kontrol toplamı'
    }
};

class TranslationManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = translations;
        this.initLanguage();
    }

    initLanguage() {
        // Check localStorage first
        const savedLang = localStorage.getItem('iban-lang');
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
        } else {
            // Default to English
            this.currentLang = 'en';
        }
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not supported, falling back to English`);
            lang = 'en';
        }

        this.currentLang = lang;
        localStorage.setItem('iban-lang', lang);
        this.updatePageTranslations();
        this.updateLangToggle();
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'tr' : 'en';
        this.setLanguage(newLang);
    }

    translate(key) {
        return this.translations[this.currentLang][key] || key;
    }

    updatePageTranslations() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    updateLangToggle() {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            const langText = langToggle.querySelector('.lang-text');
            langText.textContent = this.currentLang === 'en' ? 'TR' : 'EN';
        }
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}
