# WhatsApp Bot Test Suite

This directory contains test files for the WhatsApp Bot, focusing on language support and alert messages.

## Prerequisites

- Ensure the development server is running on port 3001 (you can run `python -m http.server 3001` from the project root)
- Navigate to these test pages in your browser

## Available Tests

### Language Tests (`test-language.html`)

This test allows you to verify that messages appear correctly in all supported languages (English, Hindi, and Telugu). 

Features:
- Test welcome messages
- Test consent flow messages
- Test button labels
- Test diversion flow messages
- Verify that non-English languages don't contain English text

### Alert Tests (`test-alerts.html`)

This test specifically focuses on alert messages in all supported languages.

Features:
- View all alert messages side-by-side across languages
- Test specific alert types (long stoppage, route deviation, diversion)
- Automatic detection of English phrases in non-English translations

### State Tests (`test-states.html`)

This test allows you to verify messages based on different bot states.

Features:
- Test messages for different flows (consent, trip, document, alert)
- View messages by state
- Compare translations across languages
- Automatic detection of English words in non-English translations

## How to Run

1. Start the server from the project root:
   ```
   python -m http.server 3001
   ```

2. Open your browser and navigate to:
   - Language Tests: `http://localhost:3001/src/tests/test-language.html`
   - Alert Tests: `http://localhost:3001/src/tests/test-alerts.html`
   - State Tests: `http://localhost:3001/src/tests/test-states.html`

3. Use the buttons on each test page to run specific tests

## Adding New Tests

When adding new tests:

1. Create a new HTML file in the `src/tests/` directory
2. Include necessary scripts from the main application
3. Implement test logic
4. Add the test to this README

## Troubleshooting

If tests fail to load:
- Ensure the server is running on port 3001
- Check that all paths to scripts are correct
- Check browser console for JavaScript errors 