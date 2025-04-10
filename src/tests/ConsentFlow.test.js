import WhatsAppBot from '../components/WhatsAppBot.js';
import { MessageTemplates, BotState } from '../utils/config.js';

describe('Consent Flow Tests', () => {
    let bot;
    let container;
    let simulateApprovalBtn;
    let simulateRejectionBtn;
    let resendConsentBtn;

    beforeEach(() => {
        // Setup DOM
        container = document.createElement('div');
        container.innerHTML = `
            <div id="chatMessages">
                <div id="typingIndicator"></div>
            </div>
            <div class="simulation-controls">
                <button id="simulateApproval">Simulate Consent Approval</button>
                <button id="simulateRejection">Simulate Consent Rejection</button>
            </div>
        `;
        document.body.appendChild(container);

        // Get button references
        simulateApprovalBtn = document.getElementById('simulateApproval');
        simulateRejectionBtn = document.getElementById('simulateRejection');

        // Initialize bot
        bot = new WhatsAppBot();
        bot.selectedLanguage = 'en'; // Ensure English language for testing
    });

    afterEach(() => {
        document.body.removeChild(container);
        jest.clearAllMocks();
    });

    // Test Consent Approval Flow
    describe('Consent Approval', () => {
        test('should update consent status and transition to TRIP_STARTED state', async () => {
            const checkConsentStatusSpy = jest.spyOn(bot, 'checkConsentStatus');
            const showTypingIndicatorSpy = jest.spyOn(bot, 'showTypingIndicator');
            
            await bot.handleSimulateApproval();
            
            expect(bot.tripData.consentStatus).toBe('APPROVED');
            expect(bot.currentState).toBe(BotState.TRIP_STARTED);
            expect(checkConsentStatusSpy).toHaveBeenCalled();
            
            // Check if the correct messages were displayed
            const chatMessages = document.getElementById('chatMessages');
            expect(chatMessages.textContent).toContain('Your consent has been approved');
            expect(chatMessages.textContent).toContain('Trip tracking started');
        });
        
        test('should disable and re-enable the button while processing', async () => {
            // Setup spy to monitor the button state
            Object.defineProperty(simulateApprovalBtn, 'disabled', {
                get: jest.fn().mockImplementation(() => simulateApprovalBtn.getAttribute('disabled') === 'true'),
                set: jest.fn().mockImplementation(value => {
                    simulateApprovalBtn.setAttribute('disabled', value);
                })
            });
            
            // Start approval process
            bot.handleSimulateApproval();
            
            // Check initial button state
            expect(simulateApprovalBtn.disabled).toBe(true);
            
            // Wait for process to complete
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check final button state
            expect(simulateApprovalBtn.disabled).toBe(false);
        });
    });

    // Test Consent Rejection Flow
    describe('Consent Rejection', () => {
        test('should update consent status and transition to CONSENT_REJECTED state', async () => {
            const checkConsentStatusSpy = jest.spyOn(bot, 'checkConsentStatus');
            const showResendConsentOptionSpy = jest.spyOn(bot, 'showResendConsentOption');
            
            await bot.handleSimulateRejection();
            
            expect(bot.tripData.consentStatus).toBe('REJECTED');
            expect(bot.currentState).toBe(BotState.CONSENT_REJECTED);
            expect(checkConsentStatusSpy).toHaveBeenCalled();
            expect(showResendConsentOptionSpy).toHaveBeenCalled();
            
            // Check if the correct messages were displayed
            const chatMessages = document.getElementById('chatMessages');
            expect(chatMessages.textContent).toContain('Your consent has been rejected');
        });
        
        test('should show resend consent button after rejection', async () => {
            await bot.handleSimulateRejection();
            
            const resendButton = document.querySelector('[data-testid="resend-consent-button"]');
            expect(resendButton).not.toBeNull();
            expect(resendButton.textContent).toBe(MessageTemplates.en.requestResendConsent);
        });
    });

    // Test Resend Consent Request Flow
    describe('Resend Consent Request', () => {
        test('should handle resend consent request correctly', async () => {
            // First simulate rejection
            await bot.handleSimulateRejection();
            
            // Get the resend button that should have been created
            const resendButton = document.querySelector('[data-testid="resend-consent-button"]');
            expect(resendButton).not.toBeNull();
            
            // Mock the button click
            const handleResendConsentRequestSpy = jest.spyOn(bot, 'handleResendConsentRequest');
            
            // Click the resend button
            resendButton.click();
            
            // Wait for the async operations to complete
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Verify the correct method was called
            expect(handleResendConsentRequestSpy).toHaveBeenCalled();
            
            // Check if the correct messages were displayed
            const chatMessages = document.getElementById('chatMessages');
            expect(chatMessages.textContent).toContain('We have requested to resend the consent message');
            expect(chatMessages.textContent).toContain('Please wait for some time to get consent approval message to your phone');
            
            // Verify state is updated correctly
            expect(bot.currentState).toBe(BotState.CONSENT_PENDING);
        });
        
        test('should disable button during processing', async () => {
            // First simulate rejection
            await bot.handleSimulateRejection();
            
            // Get the resend button
            const resendButton = document.querySelector('[data-testid="resend-consent-button"]');
            
            // Click the button
            resendButton.click();
            
            // Immediately check if button is disabled
            expect(resendButton.disabled).toBe(true);
            
            // Wait for processing to complete
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Re-check button state (should be re-enabled)
            expect(resendButton.disabled).toBe(false);
        });
    });
    
    // Test the complete flow from rejection to approval
    describe('Complete Rejection to Approval Flow', () => {
        test('should correctly handle the flow from rejection to approval', async () => {
            // First simulate rejection
            await bot.handleSimulateRejection();
            
            // Verify rejection state
            expect(bot.currentState).toBe(BotState.CONSENT_REJECTED);
            expect(bot.tripData.consentStatus).toBe('REJECTED');
            
            // Click resend button
            const resendButton = document.querySelector('[data-testid="resend-consent-button"]');
            resendButton.click();
            
            // Wait for processing
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Verify pending state
            expect(bot.currentState).toBe(BotState.CONSENT_PENDING);
            
            // Now simulate approval
            await bot.handleSimulateApproval();
            
            // Verify final state
            expect(bot.currentState).toBe(BotState.TRIP_STARTED);
            expect(bot.tripData.consentStatus).toBe('APPROVED');
            
            // Check the full message flow
            const chatMessages = document.getElementById('chatMessages');
            const messages = chatMessages.textContent;
            
            // Verify the sequence of important messages
            expect(messages.indexOf('Your consent has been rejected')).toBeLessThan(
                messages.indexOf('We have requested to resend the consent message')
            );
            
            expect(messages.indexOf('We have requested to resend the consent message')).toBeLessThan(
                messages.indexOf('Please wait for some time to get consent approval message')
            );
            
            expect(messages.indexOf('Please wait for some time to get consent approval message')).toBeLessThan(
                messages.indexOf('Your consent has been approved')
            );
            
            expect(messages.indexOf('Your consent has been approved')).toBeLessThan(
                messages.indexOf('Trip tracking started')
            );
        });
    });
}); 