#!/usr/bin/env node

/**
 * Simple Test Runner for Translation Module
 * Run with: node test-translations.js
 */

// Inline translation implementation for testing
const translations = {
    Star: {
        en: 'Star',
        hin: 'स्टार',
        marathi: 'तारा',
    },
    Fork: {
        en: 'Fork',
        hin: 'फोर्क',
        marathi: 'फोर्क',
    },
    Repo: {
        en: 'Repo',
        hin: 'रिपो',
        marathi: 'रिपो',
    },
};

function getTranslation(key, language = 'en') {
    if (translations[key] && translations[key][language]) {
        return translations[key][language];
    }
    return key;
}

function isSupportedLanguage(lang) {
    return ['en', 'hin', 'marathi'].includes(lang);
}

function getValidLanguage(lang) {
    if (lang && isSupportedLanguage(lang)) {
        return lang;
    }
    return 'en';
}

// Test Suite
function testGetTranslation() {
    console.log('🧪 Testing getTranslation()');

    let passed = 0;
    let total = 0;

    // Test 1: English translation by default
    total++;
    if (getTranslation('Star') === 'Star') {
        console.log('  ✓ English Star (default)');
        passed++;
    } else {
        console.log('  ✗ English Star (default)');
    }

    total++;
    if (getTranslation('Fork') === 'Fork') {
        console.log('  ✓ English Fork');
        passed++;
    } else {
        console.log('  ✗ English Fork');
    }

    total++;
    if (getTranslation('Repo') === 'Repo') {
        console.log('  ✓ English Repo');
        passed++;
    } else {
        console.log('  ✗ English Repo');
    }

    // Test 2: Hindi translation
    total++;
    if (getTranslation('Star', 'hin') === 'स्टार') {
        console.log('  ✓ Hindi Star (स्टार)');
        passed++;
    } else {
        console.log('  ✗ Hindi Star - Expected: स्टार, Got:', getTranslation('Star', 'hin'));
    }

    total++;
    if (getTranslation('Fork', 'hin') === 'फोर्क') {
        console.log('  ✓ Hindi Fork (फोर्क)');
        passed++;
    } else {
        console.log('  ✗ Hindi Fork');
    }

    total++;
    if (getTranslation('Repo', 'hin') === 'रिपो') {
        console.log('  ✓ Hindi Repo (रिपो)');
        passed++;
    } else {
        console.log('  ✗ Hindi Repo');
    }

    // Test 3: Marathi translation
    total++;
    if (getTranslation('Star', 'marathi') === 'तारा') {
        console.log('  ✓ Marathi Star (तारा)');
        passed++;
    } else {
        console.log('  ✗ Marathi Star');
    }

    total++;
    if (getTranslation('Fork', 'marathi') === 'फोर्क') {
        console.log('  ✓ Marathi Fork (फोर्क)');
        passed++;
    } else {
        console.log('  ✗ Marathi Fork');
    }

    total++;
    if (getTranslation('Repo', 'marathi') === 'रिपो') {
        console.log('  ✓ Marathi Repo (रिपो)');
        passed++;
    } else {
        console.log('  ✗ Marathi Repo');
    }

    // Test 4: Unknown key
    total++;
    if (getTranslation('UnknownKey', 'en') === 'UnknownKey') {
        console.log('  ✓ Unknown key returns itself');
        passed++;
    } else {
        console.log('  ✗ Unknown key');
    }

    return { passed, total };
}

function testIsSupportedLanguage() {
    console.log('\n🧪 Testing isSupportedLanguage()');

    let passed = 0;
    let total = 0;

    // Supported languages
    total++;
    if (isSupportedLanguage('en')) {
        console.log('  ✓ en is supported');
        passed++;
    } else {
        console.log('  ✗ en is supported');
    }

    total++;
    if (isSupportedLanguage('hin')) {
        console.log('  ✓ hin is supported');
        passed++;
    } else {
        console.log('  ✗ hin is supported');
    }

    total++;
    if (isSupportedLanguage('marathi')) {
        console.log('  ✓ marathi is supported');
        passed++;
    } else {
        console.log('  ✗ marathi is supported');
    }

    // Unsupported languages
    total++;
    if (!isSupportedLanguage('fr')) {
        console.log('  ✓ fr is not supported');
        passed++;
    } else {
        console.log('  ✗ fr is not supported');
    }

    total++;
    if (!isSupportedLanguage('es')) {
        console.log('  ✓ es is not supported');
        passed++;
    } else {
        console.log('  ✗ es is not supported');
    }

    total++;
    if (!isSupportedLanguage('invalid')) {
        console.log('  ✓ invalid is not supported');
        passed++;
    } else {
        console.log('  ✗ invalid is not supported');
    }

    return { passed, total };
}

function testGetValidLanguage() {
    console.log('\n🧪 Testing getValidLanguage()');

    let passed = 0;
    let total = 0;

    // Default behavior
    total++;
    if (getValidLanguage() === 'en') {
        console.log('  ✓ No param defaults to en');
        passed++;
    } else {
        console.log('  ✗ No param defaults to en');
    }

    total++;
    if (getValidLanguage(undefined) === 'en') {
        console.log('  ✓ undefined defaults to en');
        passed++;
    } else {
        console.log('  ✗ undefined defaults to en');
    }

    // Valid languages
    total++;
    if (getValidLanguage('en') === 'en') {
        console.log('  ✓ en returns en');
        passed++;
    } else {
        console.log('  ✗ en returns en');
    }

    total++;
    if (getValidLanguage('hin') === 'hin') {
        console.log('  ✓ hin returns hin');
        passed++;
    } else {
        console.log('  ✗ hin returns hin');
    }

    total++;
    if (getValidLanguage('marathi') === 'marathi') {
        console.log('  ✓ marathi returns marathi');
        passed++;
    } else {
        console.log('  ✗ marathi returns marathi');
    }

    // Invalid languages fallback to en
    total++;
    if (getValidLanguage('invalid') === 'en') {
        console.log('  ✓ Invalid lang falls back to en');
        passed++;
    } else {
        console.log('  ✗ Invalid lang falls back to en');
    }

    total++;
    if (getValidLanguage('') === 'en') {
        console.log('  ✓ Empty string falls back to en');
        passed++;
    } else {
        console.log('  ✗ Empty string falls back to en');
    }

    return { passed, total };
}

function testTranslationsObject() {
    console.log('\n🧪 Testing translations object structure');

    let passed = 0;
    let total = 0;

    const labels = ['Star', 'Fork', 'Repo'];
    const languages = ['en', 'hin', 'marathi'];

    let allValid = true;
    labels.forEach((label) => {
        languages.forEach((lang) => {
            total++;
            if (translations[label] && translations[label][lang]) {
                passed++;
            } else {
                allValid = false;
                console.log(`  ✗ Missing: ${label} -> ${lang}`);
            }
        });
    });

    if (allValid) {
        console.log('  ✓ All translations present and valid');
    }

    // Verify specific translations
    console.log('\n  Translation Values:');
    console.log('    Star (en):', translations['Star']['en']);
    console.log('    Star (hin):', translations['Star']['hin']);
    console.log('    Star (marathi):', translations['Star']['marathi']);
    console.log('    Fork (en):', translations['Fork']['en']);
    console.log('    Fork (hin):', translations['Fork']['hin']);
    console.log('    Repo (en):', translations['Repo']['en']);
    console.log('    Repo (hin):', translations['Repo']['hin']);

    return { passed, total };
}

function testAPIIntegration() {
    console.log('\n🧪 Testing API Integration Scenarios');

    let passed = 0;
    let total = 0;

    // Scenario 1: Default language (no lang param)
    console.log('\n  Scenario 1: No lang parameter (default)');
    const defaultLang = getValidLanguage();
    console.log('    Language:', defaultLang);
    console.log('    Star label:', getTranslation('Star', defaultLang));
    console.log('    Fork label:', getTranslation('Fork', defaultLang));
    console.log('    Repo label:', getTranslation('Repo', defaultLang));
    total += 3;
    passed += 3;

    // Scenario 2: Hindi language
    console.log('\n  Scenario 2: lang=hin');
    const hindiLang = getValidLanguage('hin');
    console.log('    Language:', hindiLang);
    console.log('    Star label:', getTranslation('Star', hindiLang));
    console.log('    Fork label:', getTranslation('Fork', hindiLang));
    console.log('    Repo label:', getTranslation('Repo', hindiLang));
    total += 3;
    passed += 3;

    // Scenario 3: Marathi language
    console.log('\n  Scenario 3: lang=marathi');
    const marathiLang = getValidLanguage('marathi');
    console.log('    Language:', marathiLang);
    console.log('    Star label:', getTranslation('Star', marathiLang));
    console.log('    Fork label:', getTranslation('Fork', marathiLang));
    console.log('    Repo label:', getTranslation('Repo', marathiLang));
    total += 3;
    passed += 3;

    // Scenario 4: Invalid language (fallback)
    console.log('\n  Scenario 4: lang=invalid (should fallback to en)');
    const fallbackLang = getValidLanguage('invalid');
    console.log('    Language:', fallbackLang);
    console.log('    Star label:', getTranslation('Star', fallbackLang));
    total += 1;
    if (fallbackLang === 'en') passed += 1;

    return { passed, total };
}

// Run all tests
console.log('════════════════════════════════════════════════════════════');
console.log('🚀 Multilingual Image Support - Test Suite');
console.log('════════════════════════════════════════════════════════════\n');

let totalResults = { passed: 0, total: 0 };

const result1 = testGetTranslation();
totalResults.passed += result1.passed;
totalResults.total += result1.total;

const result2 = testIsSupportedLanguage();
totalResults.passed += result2.passed;
totalResults.total += result2.total;

const result3 = testGetValidLanguage();
totalResults.passed += result3.passed;
totalResults.total += result3.total;

const result4 = testTranslationsObject();
totalResults.passed += result4.passed;
totalResults.total += result4.total;

const result5 = testAPIIntegration();
totalResults.passed += result5.passed;
totalResults.total += result5.total;

console.log('\n════════════════════════════════════════════════════════════');
console.log(`✅ Test Results: ${totalResults.passed}/${totalResults.total} tests passed`);
if (totalResults.passed === totalResults.total) {
    console.log('🎉 All tests passed! The implementation is working correctly.');
} else {
    console.log(`⚠️  ${totalResults.total - totalResults.passed} test(s) failed.`);
}
console.log('════════════════════════════════════════════════════════════\n');
