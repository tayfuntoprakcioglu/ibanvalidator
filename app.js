// IBAN Validator - Main Application Logic

// Initialize validators and managers
const validator = new IBANValidator();
const translationManager = new TranslationManager();

// DOM Elements
const ibanInput = document.getElementById('ibanInput');
const clearBtn = document.getElementById('clearBtn');
const validationMessage = document.getElementById('validationMessage');
const resultSection = document.getElementById('resultSection');
const statusBadge = document.getElementById('statusBadge');
const formattedIban = document.getElementById('formattedIban');
const countryInfo = document.getElementById('countryInfo');
const countryCode = document.getElementById('countryCode');
const checkDigits = document.getElementById('checkDigits');
const ibanLength = document.getElementById('ibanLength');
const copyBtn = document.getElementById('copyBtn');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const exampleBtns = document.querySelectorAll('.example-btn');
const toast = document.getElementById('toast');
const donateBtn = document.getElementById('donateBtn');
const donateModal = document.getElementById('donateModal');
const modalClose = donateModal?.querySelector('.donate-modal-close');
const modalOverlay = donateModal?.querySelector('.donate-modal-overlay');

// State
let currentValidation = null;

// Initialize
function init() {
    initTheme();
    initLanguage();
    attachEventListeners();
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('iban-theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('iban-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Language Management
function initLanguage() {
    translationManager.setLanguage(translationManager.getCurrentLanguage());
}

// Event Listeners
function attachEventListeners() {
    // Input events
    ibanInput.addEventListener('input', handleIbanInput);
    ibanInput.addEventListener('paste', handlePaste);

    // Clear button
    clearBtn.addEventListener('click', clearInput);

    // Copy button
    copyBtn.addEventListener('click', copyToClipboard);

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Language toggle
    langToggle.addEventListener('click', () => {
        translationManager.toggleLanguage();
    });

    // Example buttons
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const exampleIban = e.currentTarget.getAttribute('data-iban');
            ibanInput.value = exampleIban;
            handleIbanInput();
            ibanInput.focus();
        });
    });

    // Donate button and modal
    if (donateBtn) {
        donateBtn.addEventListener('click', openDonateModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeDonateModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeDonateModal);
    }
}

// Input Handlers
function handleIbanInput() {
    const value = ibanInput.value.trim();

    // Show/hide clear button
    if (value) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
        hideResult();
        clearValidationMessage();
        return;
    }

    // Validate IBAN
    validateIban(value);
}

function handlePaste(e) {
    // Remove spaces from pasted content
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const cleanedText = pastedText.replace(/\s/g, '');

    // Get cursor position
    const start = ibanInput.selectionStart;
    const end = ibanInput.selectionEnd;
    const currentValue = ibanInput.value;

    // Insert cleaned text at cursor position
    ibanInput.value = currentValue.substring(0, start) + cleanedText + currentValue.substring(end);

    // Set cursor position
    const newPosition = start + cleanedText.length;
    ibanInput.setSelectionRange(newPosition, newPosition);

    // Trigger validation
    handleIbanInput();
}

function clearInput() {
    ibanInput.value = '';
    clearBtn.classList.remove('visible');
    hideResult();
    clearValidationMessage();
    ibanInput.focus();
}

// Validation
function validateIban(iban) {
    const result = validator.validate(iban);
    currentValidation = result;

    if (result.valid) {
        showValidResult(result);
        clearValidationMessage();
    } else {
        showInvalidResult(result);
        hideResult();
    }
}

function showValidResult(result) {
    // Update status badge
    statusBadge.classList.remove('invalid');
    const badgeText = statusBadge.querySelector('span');
    badgeText.setAttribute('data-i18n', 'validIban');
    badgeText.textContent = translationManager.translate('validIban');

    // Update formatted IBAN
    formattedIban.textContent = result.formatted;

    // Update country info
    countryInfo.textContent = `${result.countryFlag} ${result.countryName}`;
    countryCode.textContent = result.countryCode;
    checkDigits.textContent = result.checkDigits;
    ibanLength.textContent = result.length;

    // Show result section
    resultSection.classList.remove('hidden');
}

function showInvalidResult(result) {
    let errorKey = 'errorInvalidChecksum';

    switch (result.error) {
        case 'EMPTY':
            errorKey = 'errorEmpty';
            break;
        case 'INVALID_COUNTRY':
            errorKey = 'errorInvalidCountry';
            break;
        case 'INVALID_LENGTH':
            errorKey = 'errorInvalidLength';
            break;
        case 'INVALID_FORMAT':
            errorKey = 'errorInvalidFormat';
            break;
        case 'INVALID_CHECKSUM':
            errorKey = 'errorInvalidChecksum';
            break;
    }

    showValidationMessage(translationManager.translate(errorKey), 'error');
}

function hideResult() {
    resultSection.classList.add('hidden');
}

// Validation Message
function showValidationMessage(message, type = 'error') {
    validationMessage.textContent = message;
    validationMessage.className = `validation-message ${type}`;
}

function clearValidationMessage() {
    validationMessage.textContent = '';
    validationMessage.className = 'validation-message';
}

// Copy to Clipboard
function copyToClipboard() {
    if (!currentValidation || !currentValidation.valid) {
        return;
    }

    const textToCopy = validator.normalize(currentValidation.formatted);

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => showToast())
            .catch(() => fallbackCopy(textToCopy));
    } else {
        fallbackCopy(textToCopy);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Failed to copy:', err);
    }

    document.body.removeChild(textarea);
}

function showToast() {
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Modal Functions
function openDonateModal() {
    if (donateModal) {
        donateModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeDonateModal() {
    if (donateModal) {
        donateModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        ibanInput.focus();
        ibanInput.select();
    }

    // Escape to clear or close modal
    if (e.key === 'Escape') {
        if (donateModal && !donateModal.classList.contains('hidden')) {
            closeDonateModal();
        } else {
            clearInput();
        }
    }
});

// Auto-focus input on load
window.addEventListener('load', () => {
    ibanInput.focus();
});

// Initialize app
init();
