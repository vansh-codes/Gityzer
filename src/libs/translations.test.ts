/**
 * Manual Test File for Multilingual Image Support Feature
 * 
 * To run these tests, execute them in Node.js with the translation module
 * This demonstrates how the translation functions work
 */

import {
    getTranslation,
    isSupportedLanguage,
    getValidLanguage,
    Language,
    translations,
} from '@/libs/translations';

/**
 * Test Suite: getTranslation
 */
function testGetTranslation() {
    console.log('🧪 Testing getTranslation()');

    // Test 1: English translation by default
    console.log('  ✓ English (default):', getTranslation('Star') === 'Star' ? 'PASS' : 'FAIL');
    console.log('  ✓ English Fork:', getTranslation('Fork') === 'Fork' ? 'PASS' : 'FAIL');
    console.log('  ✓ English Repo:', getTranslation('Repo') === 'Repo' ? 'PASS' : 'FAIL');

    // Test 2: Hindi translation
    console.log('  ✓ Hindi Star:', getTranslation('Star', 'hin') === 'स्टार' ? 'PASS' : 'FAIL');
    console.log('  ✓ Hindi Fork:', getTranslation('Fork', 'hin') === 'फोर्क' ? 'PASS' : 'FAIL');
    console.log('  ✓ Hindi Repo:', getTranslation('Repo', 'hin') === 'रिपो' ? 'PASS' : 'FAIL');

    // Test 3: Marathi translation
    console.log('  ✓ Marathi Star:', getTranslation('Star', 'marathi') === 'तारा' ? 'PASS' : 'FAIL');
    console.log('  ✓ Marathi Fork:', getTranslation('Fork', 'marathi') === 'फोर्क' ? 'PASS' : 'FAIL');
    console.log('  ✓ Marathi Repo:', getTranslation('Repo', 'marathi') === 'रिपो' ? 'PASS' : 'FAIL');

    // Test 4: Unknown key
    console.log('  ✓ Unknown key:', getTranslation('UnknownKey', 'en') === 'UnknownKey' ? 'PASS' : 'FAIL');
}

/**
 * Test Suite: isSupportedLanguage
 */
function testIsSupportedLanguage() {
    console.log('\n🧪 Testing isSupportedLanguage()');

    // Supported languages
    console.log('  ✓ en is supported:', isSupportedLanguage('en') ? 'PASS' : 'FAIL');
    console.log('  ✓ hin is supported:', isSupportedLanguage('hin') ? 'PASS' : 'FAIL');
    console.log('  ✓ marathi is supported:', isSupportedLanguage('marathi') ? 'PASS' : 'FAIL');

    // Unsupported languages
    console.log('  ✓ fr is not supported:', !isSupportedLanguage('fr') ? 'PASS' : 'FAIL');
    console.log('  ✓ es is not supported:', !isSupportedLanguage('es') ? 'PASS' : 'FAIL');
    console.log('  ✓ invalid is not supported:', !isSupportedLanguage('invalid') ? 'PASS' : 'FAIL');
}

/**
 * Test Suite: getValidLanguage
 */
function testGetValidLanguage() {
    console.log('\n🧪 Testing getValidLanguage()');

    // Default behavior
    console.log('  ✓ No param defaults to en:', getValidLanguage() === 'en' ? 'PASS' : 'FAIL');
    console.log('  ✓ undefined defaults to en:', getValidLanguage(undefined) === 'en' ? 'PASS' : 'FAIL');

    // Valid languages
    console.log('  ✓ en returns en:', getValidLanguage('en') === 'en' ? 'PASS' : 'FAIL');
    console.log('  ✓ hin returns hin:', getValidLanguage('hin') === 'hin' ? 'PASS' : 'FAIL');
    console.log('  ✓ marathi returns marathi:', getValidLanguage('marathi') === 'marathi' ? 'PASS' : 'FAIL');

    // Invalid languages fallback to en
    console.log('  ✓ Invalid lang falls back to en:', getValidLanguage('invalid') === 'en' ? 'PASS' : 'FAIL');
    console.log('  ✓ Empty string falls back to en:', getValidLanguage('') === 'en' ? 'PASS' : 'FAIL');
}

/**
 * Test Suite: Translations Object Structure
 */
function testTranslationsObject() {
    console.log('\n🧪 Testing translations object structure');

    const labels = ['Star', 'Fork', 'Repo'];
    const languages: Language[] = ['en', 'hin', 'marathi'];

    let allValid = true;
    labels.forEach((label) => {
        languages.forEach((lang) => {
            if (!translations[label] || !translations[label][lang]) {
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
    console.log('  ✓ Star (en):', translations['Star']['en']);
    console.log('  ✓ Star (hin):', translations['Star']['hin']);
    console.log('  ✓ Star (marathi):', translations['Star']['marathi']);
    console.log('  ✓ Fork (en):', translations['Fork']['en']);
    console.log('  ✓ Fork (hin):', translations['Fork']['hin']);
    console.log('  ✓ Repo (en):', translations['Repo']['en']);
    console.log('  ✓ Repo (hin):', translations['Repo']['hin']);
}

/**
 * Integration Test: Simulating API requests
 */
function testAPIIntegration() {
    console.log('\n🧪 Testing API Integration Scenarios');

    // Scenario 1: Default language (no lang param)
    console.log('\n  Scenario 1: No lang parameter (default)');
    const defaultLang = getValidLanguage();
    console.log('    Language:', defaultLang);
    console.log('    Star label:', getTranslation('Star', defaultLang));
    console.log('    Fork label:', getTranslation('Fork', defaultLang));
    console.log('    Repo label:', getTranslation('Repo', defaultLang));

    // Scenario 2: Hindi language
    console.log('\n  Scenario 2: lang=hin');
    const hindiLang = getValidLanguage('hin');
    console.log('    Language:', hindiLang);
    console.log('    Star label:', getTranslation('Star', hindiLang));
    console.log('    Fork label:', getTranslation('Fork', hindiLang));
    console.log('    Repo label:', getTranslation('Repo', hindiLang));

    // Scenario 3: Marathi language
    console.log('\n  Scenario 3: lang=marathi');
    const marathiLang = getValidLanguage('marathi');
    console.log('    Language:', marathiLang);
    console.log('    Star label:', getTranslation('Star', marathiLang));
    console.log('    Fork label:', getTranslation('Fork', marathiLang));
    console.log('    Repo label:', getTranslation('Repo', marathiLang));

    // Scenario 4: Invalid language (fallback)
    console.log('\n  Scenario 4: lang=invalid (should fallback to en)');
    const fallbackLang = getValidLanguage('invalid');
    console.log('    Language:', fallbackLang);
    console.log('    Star label:', getTranslation('Star', fallbackLang));
}

/**
 * Run all tests
 */
export function runAllTests() {
    console.log('════════════════════════════════════════════════════════════');
    console.log('🚀 Multilingual Image Support - Test Suite');
    console.log('════════════════════════════════════════════════════════════');

    testGetTranslation();
    testIsSupportedLanguage();
    testGetValidLanguage();
    testTranslationsObject();
    testAPIIntegration();

    console.log('\n════════════════════════════════════════════════════════════');
    console.log('✅ Test suite completed');
    console.log('════════════════════════════════════════════════════════════\n');
}
