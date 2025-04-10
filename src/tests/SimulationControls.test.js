import WhatsAppBot from '../components/WhatsAppBot.js';
import { MessageTemplates, BotState } from '../utils/config.js';

describe('Simulation Controls Tests', () => {
    let bot;
    let container;
    let simulateApprovalBtn;
    let simulateLongStoppageBtn;
    let simulateRouteDeviationBtn;
    let simulateDiversionBtn;
    let simulateContinuousDrivingBtn;
    let simulateNightDrivingBtn;
    let simulateOverSpeedingBtn;

    beforeEach(() => {
        // Setup DOM
        container = document.createElement('div');
        container.innerHTML = `
            <div id="chatMessages">
                <div id="typingIndicator"></div>
            </div>
            <div class="simulation-controls">
                <button id="simulateApproval">Simulate Consent Approval</button>
                <button id="simulateLongStoppage">Long Stoppage</button>
                <button id="simulateRouteDeviation">Route Deviation</button>
                <button id="simulateDiversion">Diversion</button>
                <button id="simulateContinuousDriving">Continuous Driving</button>
                <button id="simulateNightDriving">Night Driving</button>
                <button id="simulateOverSpeeding">Over Speeding</button>
            </div>
        `;
        document.body.appendChild(container);

        // Get button references
        simulateApprovalBtn = document.getElementById('simulateApproval');
        simulateLongStoppageBtn = document.getElementById('simulateLongStoppage');
        simulateRouteDeviationBtn = document.getElementById('simulateRouteDeviation');
        simulateDiversionBtn = document.getElementById('simulateDiversion');
        simulateContinuousDrivingBtn = document.getElementById('simulateContinuousDriving');
        simulateNightDrivingBtn = document.getElementById('simulateNightDriving');
        simulateOverSpeedingBtn = document.getElementById('simulateOverSpeeding');

        // Initialize bot
        bot = new WhatsAppBot();
    });

    afterEach(() => {
        document.body.removeChild(container);
        jest.clearAllMocks();
    });

    // Test Consent Approval Button
    describe('Consent Approval Button', () => {
        test('should update consent status and trigger checkConsentStatus', async () => {
            const checkConsentStatusSpy = jest.spyOn(bot, 'checkConsentStatus');
            
            await simulateApprovalBtn.click();
            
            expect(bot.tripData.consentStatus).toBe('APPROVED');
            expect(checkConsentStatusSpy).toHaveBeenCalled();
            expect(simulateApprovalBtn.disabled).toBe(false);
        });

        test('should disable button while processing', async () => {
            simulateApprovalBtn.click();
            expect(simulateApprovalBtn.disabled).toBe(true);
            await new Promise(resolve => setTimeout(resolve, 100));
            expect(simulateApprovalBtn.disabled).toBe(false);
        });
    });

    // Test Alert Buttons
    describe('Alert Simulation Buttons', () => {
        const testCases = [
            {
                button: 'simulateLongStoppage',
                alertType: 'longStoppage',
                expectedData: {
                    location: "Mumbai-Pune Expressway",
                    duration: "4 hours"
                }
            },
            {
                button: 'simulateRouteDeviation',
                alertType: 'routeDeviation',
                expectedData: {
                    location: "Mumbai-Pune Expressway",
                    deviationDistance: "5"
                }
            },
            {
                button: 'simulateDiversion',
                alertType: 'diversion',
                expectedData: {
                    location: "Mumbai-Pune Expressway",
                    eta: "2 hours 30 minutes"
                }
            },
            {
                button: 'simulateContinuousDriving',
                alertType: 'continuousDriving',
                expectedData: {
                    duration: "4 hours",
                    location: "Mumbai-Pune Expressway"
                }
            },
            {
                button: 'simulateNightDriving',
                alertType: 'nightDriving',
                expectedData: {
                    time: "23:45",
                    location: "Mumbai-Pune Expressway"
                }
            },
            {
                button: 'simulateOverSpeeding',
                alertType: 'overSpeeding',
                expectedData: {
                    speed: "95",
                    speedLimit: "80",
                    location: "Mumbai-Pune Expressway"
                }
            }
        ];

        testCases.forEach(({ button, alertType, expectedData }) => {
            test(`${button} should trigger correct alert message`, async () => {
                const addBotMessageSpy = jest.spyOn(bot, 'addBotMessage');
                const btn = document.getElementById(button);
                
                await btn.click();
                
                expect(addBotMessageSpy).toHaveBeenCalledWith(
                    expect.stringContaining(expectedData.location)
                );
            });
        });

        test('should handle alerts in all supported languages', async () => {
            const supportedLanguages = ['en', 'hi', 'te'];
            
            for (const lang of supportedLanguages) {
                bot.selectedLanguage = lang;
                await simulateLongStoppageBtn.click();
                
                const messages = document.querySelectorAll('.message.received');
                const lastMessage = messages[messages.length - 1];
                
                expect(lastMessage.textContent).toContain(
                    MessageTemplates[lang].alerts.longStoppage
                        .replace('{location}', 'Mumbai-Pune Expressway')
                        .replace('{duration}', '4 hours')
                );
            }
        });
    });

    // Test Error Handling
    describe('Error Handling', () => {
        test('should handle missing message templates gracefully', async () => {
            const originalTemplates = { ...MessageTemplates };
            MessageTemplates.en.alerts = undefined;
            
            const consoleSpy = jest.spyOn(console, 'error');
            await simulateLongStoppageBtn.click();
            
            expect(consoleSpy).toHaveBeenCalled();
            
            MessageTemplates.en = originalTemplates.en;
        });

        test('should handle network errors in addBotMessage', async () => {
            const mockError = new Error('Network error');
            jest.spyOn(bot, 'addBotMessage').mockRejectedValueOnce(mockError);
            
            const consoleSpy = jest.spyOn(console, 'error');
            await simulateLongStoppageBtn.click();
            
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Network error')
            );
        });
    });

    // Test State Management
    describe('State Management', () => {
        test('should maintain correct bot state after alerts', async () => {
            const initialState = bot.currentState;
            await simulateLongStoppageBtn.click();
            expect(bot.currentState).toBe(initialState);
        });

        test('should handle rapid button clicks properly', async () => {
            const addBotMessageSpy = jest.spyOn(bot, 'addBotMessage');
            
            // Simulate rapid clicks
            simulateLongStoppageBtn.click();
            simulateRouteDeviationBtn.click();
            simulateDiversionBtn.click();
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            expect(addBotMessageSpy).toHaveBeenCalledTimes(3);
        });
    });

    // Test UI Feedback
    describe('UI Feedback', () => {
        test('should show typing indicator when sending alerts', async () => {
            const typingIndicator = document.getElementById('typingIndicator');
            
            simulateLongStoppageBtn.click();
            expect(typingIndicator.style.display).toBe('block');
            
            await new Promise(resolve => setTimeout(resolve, 1100));
            expect(typingIndicator.style.display).toBe('none');
        });

        test('should scroll to latest message after alert', async () => {
            const scrollToBottomSpy = jest.spyOn(bot, 'scrollToBottom');
            
            await simulateLongStoppageBtn.click();
            expect(scrollToBottomSpy).toHaveBeenCalled();
        });
    });
}); 