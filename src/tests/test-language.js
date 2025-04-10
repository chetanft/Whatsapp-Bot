// Initialize the WhatsApp bot
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the bot
    window.bot = new WhatsAppBot();
    
    // Set default language to English
    bot.selectedLanguage = 'en';
    
    // Expose MessageTemplates for testing
    window.MessageTemplates = MessageTemplates;
    
    console.log('Language test initialized');
    
    // Language selection handlers
    document.getElementById('testEnglish').addEventListener('click', function() {
        bot.selectedLanguage = 'en';
        logResult(`Language set to English`);
    });
    
    document.getElementById('testHindi').addEventListener('click', function() {
        bot.selectedLanguage = 'hi';
        logResult(`Language set to Hindi`);
    });
    
    document.getElementById('testTelugu').addEventListener('click', function() {
        bot.selectedLanguage = 'te';
        logResult(`Language set to Telugu`);
    });
    
    // Test Welcome Message
    document.getElementById('testWelcome').addEventListener('click', function() {
        const lang = bot.selectedLanguage;
        clearResults();
        const welcomeMessage = MessageTemplates[lang].welcomeMessage;
        addBotMessage(welcomeMessage);
        
        // Add trip created message
        const tripCreated = MessageTemplates[lang].tripCreated.replace(/{tripId}/g, 'FT12345')
                                                          .replace(/{driverName}/g, 'John Doe')
                                                          .replace(/{vehicleNumber}/g, 'MH 04 AB 1234')
                                                          .replace(/{origin}/g, 'Mumbai')
                                                          .replace(/{destination}/g, 'Delhi');
        addBotMessage(tripCreated);
        
        if (lang !== 'en' && welcomeMessage.includes("Welcome to")) {
            logResult(`ERROR: Welcome message is in English for ${lang} language!`, true);
        } else {
            logResult(`Welcome message displayed correctly in ${lang}`);
        }
    });
    
    // Test Consent Flow
    document.getElementById('testConsent').addEventListener('click', function() {
        clearResults();
        const lang = bot.selectedLanguage;
        
        // Consent rejected message
        const consentRejected = MessageTemplates[lang].consentRejected;
        addBotMessage(consentRejected);
        
        // Request resend consent
        const requestResendConsent = MessageTemplates[lang].requestResendConsent;
        addUserMessage(requestResendConsent);
        
        // Consent resend requested
        const consentResendRequested = MessageTemplates[lang].consentResendRequested;
        addBotMessage(consentResendRequested);
        
        // Check if messages are in English when they should be translated
        if (lang !== 'en' && consentRejected.includes("has been rejected")) {
            logResult(`ERROR: Consent rejected message is in English for ${lang} language!`, true);
        } else {
            logResult(`Consent flow messages displayed correctly in ${lang}`);
        }
    });
    
    // Test Wait For Consent Message
    document.getElementById('testWaitForConsent').addEventListener('click', function() {
        clearResults();
        const lang = bot.selectedLanguage;
        
        // Wait for approval message
        const waitForApproval = MessageTemplates[lang].waitForApproval;
        addBotMessage(waitForApproval);
        
        // Wait for consent approval message
        const waitForConsentApproval = MessageTemplates[lang].waitForConsentApproval;
        addBotMessage(waitForConsentApproval);
        
        // Check if the message is in English when it should be translated
        if (lang !== 'en' && waitForConsentApproval.includes("Please wait for some time")) {
            logResult(`ERROR: waitForConsentApproval message is in English for ${lang} language!`, true);
        } else {
            logResult(`Wait for consent messages displayed correctly in ${lang}`);
        }
    });
    
    // Test Button Labels
    document.getElementById('testButtons').addEventListener('click', function() {
        clearResults();
        const lang = bot.selectedLanguage;
        
        // Get button labels
        const buttons = MessageTemplates[lang].buttons;
        
        // Display button labels
        addBotMessage(`Accept button: ${buttons.accept}`);
        addBotMessage(`Decline button: ${buttons.decline}`);
        addBotMessage(`Confirm button: ${buttons.confirm}`);
        addBotMessage(`Update button: ${buttons.update}`);
        addBotMessage(`Report button: ${buttons.report}`);
        
        // Check if buttons are in English when they should be translated
        if (lang !== 'en' && (buttons.accept === 'Accept' || buttons.decline === 'Decline')) {
            logResult(`ERROR: Button labels are in English for ${lang} language!`, true);
        } else {
            logResult(`Button labels displayed correctly in ${lang}`);
        }
    });
    
    // Test Diversion Message
    document.getElementById('testDiversion').addEventListener('click', function() {
        clearResults();
        const lang = bot.selectedLanguage;
        
        // Get diversion process help message
        const diversionProcessHelp = MessageTemplates[lang].diversionProcessHelp;
        addBotMessage(diversionProcessHelp);
        
        // Check if message is in English when it should be translated
        if (lang !== 'en' && diversionProcessHelp.includes("Please continue with the diversion process")) {
            logResult(`ERROR: diversionProcessHelp message is in English for ${lang} language!`, true);
        } else {
            logResult(`Diversion process help message displayed correctly in ${lang}`);
        }
        
        // Also check alert messages
        const routeDeviation = MessageTemplates[lang].alerts.routeDeviation;
        addBotMessage(routeDeviation.replace(/{location}/g, 'Mumbai').replace(/{deviationDistance}/g, '5'));
        
        logResult(`Diversion and alert messages displayed in ${lang}`);
    });
});

// Helper functions for the test page
function logResult(message, isError = false) {
    const resultElement = document.createElement('div');
    resultElement.className = isError ? 'error' : 'success';
    resultElement.textContent = message;
    document.getElementById('testResults').appendChild(resultElement);
}

function clearResults() {
    document.getElementById('testResults').innerHTML = '';
    document.getElementById('chatMessages').innerHTML = '';
}

function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'bot-message';
    messageElement.textContent = message;
    document.getElementById('chatMessages').appendChild(messageElement);
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.textContent = message;
    document.getElementById('chatMessages').appendChild(messageElement);
} 