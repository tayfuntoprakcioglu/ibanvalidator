// IBAN Validator - Core Validation Logic
// Supports 70+ countries worldwide

// IBAN country specifications
const IBAN_REGISTRY = {
    'AD': { length: 24, name: 'Andorra', flag: '🇦🇩' },
    'AE': { length: 23, name: 'United Arab Emirates', flag: '🇦🇪' },
    'AL': { length: 28, name: 'Albania', flag: '🇦🇱' },
    'AT': { length: 20, name: 'Austria', flag: '🇦🇹' },
    'AZ': { length: 28, name: 'Azerbaijan', flag: '🇦🇿' },
    'BA': { length: 20, name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    'BE': { length: 16, name: 'Belgium', flag: '🇧🇪' },
    'BG': { length: 22, name: 'Bulgaria', flag: '🇧🇬' },
    'BH': { length: 22, name: 'Bahrain', flag: '🇧🇭' },
    'BR': { length: 29, name: 'Brazil', flag: '🇧🇷' },
    'BY': { length: 28, name: 'Belarus', flag: '🇧🇾' },
    'CH': { length: 21, name: 'Switzerland', flag: '🇨🇭' },
    'CR': { length: 22, name: 'Costa Rica', flag: '🇨🇷' },
    'CY': { length: 28, name: 'Cyprus', flag: '🇨🇾' },
    'CZ': { length: 24, name: 'Czech Republic', flag: '🇨🇿' },
    'DE': { length: 22, name: 'Germany', flag: '🇩🇪' },
    'DK': { length: 18, name: 'Denmark', flag: '🇩🇰' },
    'DO': { length: 28, name: 'Dominican Republic', flag: '🇩🇴' },
    'EE': { length: 20, name: 'Estonia', flag: '🇪🇪' },
    'EG': { length: 29, name: 'Egypt', flag: '🇪🇬' },
    'ES': { length: 24, name: 'Spain', flag: '🇪🇸' },
    'FI': { length: 18, name: 'Finland', flag: '🇫🇮' },
    'FO': { length: 18, name: 'Faroe Islands', flag: '🇫🇴' },
    'FR': { length: 27, name: 'France', flag: '🇫🇷' },
    'GB': { length: 22, name: 'United Kingdom', flag: '🇬🇧' },
    'GE': { length: 22, name: 'Georgia', flag: '🇬🇪' },
    'GI': { length: 23, name: 'Gibraltar', flag: '🇬🇮' },
    'GL': { length: 18, name: 'Greenland', flag: '🇬🇱' },
    'GR': { length: 27, name: 'Greece', flag: '🇬🇷' },
    'GT': { length: 28, name: 'Guatemala', flag: '🇬🇹' },
    'HR': { length: 21, name: 'Croatia', flag: '🇭🇷' },
    'HU': { length: 28, name: 'Hungary', flag: '🇭🇺' },
    'IE': { length: 22, name: 'Ireland', flag: '🇮🇪' },
    'IL': { length: 23, name: 'Israel', flag: '🇮🇱' },
    'IQ': { length: 23, name: 'Iraq', flag: '🇮🇶' },
    'IS': { length: 26, name: 'Iceland', flag: '🇮🇸' },
    'IT': { length: 27, name: 'Italy', flag: '🇮🇹' },
    'JO': { length: 30, name: 'Jordan', flag: '🇯🇴' },
    'KW': { length: 30, name: 'Kuwait', flag: '🇰🇼' },
    'KZ': { length: 20, name: 'Kazakhstan', flag: '🇰🇿' },
    'LB': { length: 28, name: 'Lebanon', flag: '🇱🇧' },
    'LC': { length: 32, name: 'Saint Lucia', flag: '🇱🇨' },
    'LI': { length: 21, name: 'Liechtenstein', flag: '🇱🇮' },
    'LT': { length: 20, name: 'Lithuania', flag: '🇱🇹' },
    'LU': { length: 20, name: 'Luxembourg', flag: '🇱🇺' },
    'LV': { length: 21, name: 'Latvia', flag: '🇱🇻' },
    'MC': { length: 27, name: 'Monaco', flag: '🇲🇨' },
    'MD': { length: 24, name: 'Moldova', flag: '🇲🇩' },
    'ME': { length: 22, name: 'Montenegro', flag: '🇲🇪' },
    'MK': { length: 19, name: 'North Macedonia', flag: '🇲🇰' },
    'MR': { length: 27, name: 'Mauritania', flag: '🇲🇷' },
    'MT': { length: 31, name: 'Malta', flag: '🇲🇹' },
    'MU': { length: 30, name: 'Mauritius', flag: '🇲🇺' },
    'NL': { length: 18, name: 'Netherlands', flag: '🇳🇱' },
    'NO': { length: 15, name: 'Norway', flag: '🇳🇴' },
    'PK': { length: 24, name: 'Pakistan', flag: '🇵🇰' },
    'PL': { length: 28, name: 'Poland', flag: '🇵🇱' },
    'PS': { length: 29, name: 'Palestine', flag: '🇵🇸' },
    'PT': { length: 25, name: 'Portugal', flag: '🇵🇹' },
    'QA': { length: 29, name: 'Qatar', flag: '🇶🇦' },
    'RO': { length: 24, name: 'Romania', flag: '🇷🇴' },
    'RS': { length: 22, name: 'Serbia', flag: '🇷🇸' },
    'SA': { length: 24, name: 'Saudi Arabia', flag: '🇸🇦' },
    'SE': { length: 24, name: 'Sweden', flag: '🇸🇪' },
    'SI': { length: 19, name: 'Slovenia', flag: '🇸🇮' },
    'SK': { length: 24, name: 'Slovakia', flag: '🇸🇰' },
    'SM': { length: 27, name: 'San Marino', flag: '🇸🇲' },
    'TN': { length: 24, name: 'Tunisia', flag: '🇹🇳' },
    'TR': { length: 26, name: 'Turkey', flag: '🇹🇷' },
    'UA': { length: 29, name: 'Ukraine', flag: '🇺🇦' },
    'VA': { length: 22, name: 'Vatican City', flag: '🇻🇦' },
    'VG': { length: 24, name: 'British Virgin Islands', flag: '🇻🇬' },
    'XK': { length: 20, name: 'Kosovo', flag: '🇽🇰' }
};

class IBANValidator {
    constructor() {
        this.registry = IBAN_REGISTRY;
    }

    /**
     * Remove all spaces and convert to uppercase
     */
    normalize(iban) {
        return iban.replace(/\s/g, '').toUpperCase();
    }

    /**
     * Format IBAN with spaces every 4 characters
     */
    format(iban) {
        const normalized = this.normalize(iban);
        return normalized.replace(/(.{4})/g, '$1 ').trim();
    }

    /**
     * Get country code from IBAN
     */
    getCountryCode(iban) {
        const normalized = this.normalize(iban);
        return normalized.substring(0, 2);
    }

    /**
     * Get check digits from IBAN
     */
    getCheckDigits(iban) {
        const normalized = this.normalize(iban);
        return normalized.substring(2, 4);
    }

    /**
     * Get country info from IBAN
     */
    getCountryInfo(iban) {
        const countryCode = this.getCountryCode(iban);
        return this.registry[countryCode] || null;
    }

    /**
     * Validate IBAN structure
     */
    validateStructure(iban) {
        const normalized = this.normalize(iban);

        // Check if IBAN starts with valid country code
        const countryCode = this.getCountryCode(normalized);
        const countryInfo = this.registry[countryCode];

        if (!countryInfo) {
            return {
                valid: false,
                error: 'INVALID_COUNTRY',
                message: 'Invalid country code'
            };
        }

        // Check length
        if (normalized.length !== countryInfo.length) {
            return {
                valid: false,
                error: 'INVALID_LENGTH',
                message: `Invalid length. Expected ${countryInfo.length} characters`
            };
        }

        // Check format (letters and numbers only)
        if (!/^[A-Z0-9]+$/.test(normalized)) {
            return {
                valid: false,
                error: 'INVALID_FORMAT',
                message: 'IBAN can only contain letters and numbers'
            };
        }

        return { valid: true };
    }

    /**
     * Calculate MOD-97 checksum
     */
    calculateChecksum(iban) {
        const normalized = this.normalize(iban);

        // Move first 4 characters to end
        const rearranged = normalized.substring(4) + normalized.substring(0, 4);

        // Replace letters with numbers (A=10, B=11, ..., Z=35)
        const numericString = rearranged.replace(/[A-Z]/g, (char) => {
            return char.charCodeAt(0) - 55;
        });

        // Calculate MOD 97
        let remainder = numericString;
        while (remainder.length > 2) {
            const block = remainder.substring(0, 9);
            remainder = (parseInt(block, 10) % 97) + remainder.substring(block.length);
        }

        return parseInt(remainder, 10) % 97;
    }

    /**
     * Validate IBAN checksum
     */
    validateChecksum(iban) {
        const checksum = this.calculateChecksum(iban);
        return checksum === 1;
    }

    /**
     * Complete IBAN validation
     */
    validate(iban) {
        if (!iban || iban.trim() === '') {
            return {
                valid: false,
                error: 'EMPTY',
                message: 'Please enter an IBAN number'
            };
        }

        // Validate structure
        const structureValidation = this.validateStructure(iban);
        if (!structureValidation.valid) {
            return structureValidation;
        }

        // Validate checksum
        if (!this.validateChecksum(iban)) {
            return {
                valid: false,
                error: 'INVALID_CHECKSUM',
                message: 'Invalid IBAN checksum'
            };
        }

        // Get country info
        const countryInfo = this.getCountryInfo(iban);

        return {
            valid: true,
            formatted: this.format(iban),
            countryCode: this.getCountryCode(iban),
            countryName: countryInfo.name,
            countryFlag: countryInfo.flag,
            checkDigits: this.getCheckDigits(iban),
            length: this.normalize(iban).length
        };
    }

    /**
     * Get all supported countries
     */
    getSupportedCountries() {
        return Object.entries(this.registry).map(([code, info]) => ({
            code,
            ...info
        }));
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IBANValidator;
}
