import { CONFIG, BotState, ErrorMessages, MessageTemplates, validateMessage, getElement, handleError, formatMessage } from '../utils/config.js';

class WhatsAppBot {
    constructor() {
        this.currentState = BotState.INITIAL;
        this.selectedLanguage = CONFIG.DEFAULT_LANGUAGE;
        this.tripData = {
            tripId: 'FT' + Math.random().toString(36).substr(2, 9),
            driverName: 'John Doe',
            vehicleNumber: 'MH 04 AB 1234',
            origin: 'Mumbai, Maharashtra',
            destination: 'Delhi, NCR',
            location: 'Mumbai, Maharashtra',
            speed: '45',
            eta: '2 hours 30 minutes',
            distance: '100',
            duration: '45 minutes'
        };
        this.state = {
            diversionData: {
                isUnloading: false,
                unloadingPoints: [],
                currentPointIndex: 0,
                authorizedBy: null,
                awaitingLocation: false,
                awaitingBags: false
            }
        };
        this.setupEventListeners();
        setTimeout(() => this.initializeChat(), 100);
    }

    async initializeChat() {
        try {
            // Add welcome message
            await this.addBotMessage(MessageTemplates[this.selectedLanguage].welcome);
            
            // Show initial trip details with language selection
            await this.addBotMessage(formatMessage(
                MessageTemplates[this.selectedLanguage].tripCreated,
                this.tripData
            ));

            // Show language options
            this.showLanguageOptions();
        } catch (error) {
            console.error('Error initializing chat:', error);
            this.addBotMessage(handleError(error));
        }
    }

    setupEventListeners() {
        try {
            const sendButton = getElement('sendButton');
            const messageInput = getElement('messageInput');
            const backButton = document.querySelector('.back-button');

            // Add simulation button event listeners
            const simulateApprovalBtn = document.getElementById('simulateApproval');
            const simulateRejectionBtn = document.getElementById('simulateRejection');
            const simulateLongStoppageBtn = document.getElementById('simulateLongStoppage');
            const simulateRouteDeviationBtn = document.getElementById('simulateRouteDeviation');
            const simulateDiversionBtn = document.getElementById('simulateDiversion');
            const simulateContinuousDrivingBtn = document.getElementById('simulateContinuousDriving');
            const simulateNightDrivingBtn = document.getElementById('simulateNightDriving');
            const simulateOverSpeedingBtn = document.getElementById('simulateOverSpeeding');
            const simulateApproachingBtn = document.getElementById('simulateApproaching');
            const simulateEpodFlowBtn = document.getElementById('simulateEpodFlow');
            const simulateRestartBtn = document.getElementById('simulateRestart');

            // Add click event listeners with proper error handling
            if (simulateApprovalBtn) {
                simulateApprovalBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateApproval();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateRejectionBtn) {
                simulateRejectionBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateRejection();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateLongStoppageBtn) {
                simulateLongStoppageBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateLongStoppage();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateRouteDeviationBtn) {
                simulateRouteDeviationBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateRouteDeviation();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateDiversionBtn) {
                simulateDiversionBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateDiversion();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateContinuousDrivingBtn) {
                simulateContinuousDrivingBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateContinuousDriving();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateNightDrivingBtn) {
                simulateNightDrivingBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateNightDriving();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateOverSpeedingBtn) {
                simulateOverSpeedingBtn.addEventListener('click', async () => {
                    try {
                        await this.handleSimulateOverSpeeding();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            // Add listeners for the new buttons
            if (document.getElementById('simulateApproaching')) {
                document.getElementById('simulateApproaching').addEventListener('click', async () => {
                    try {
                        await this.handleSimulateApproaching();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (document.getElementById('simulateEpodFlow')) {
                document.getElementById('simulateEpodFlow').addEventListener('click', async () => {
                    try {
                        await this.handleSimulateEpodFlow();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            if (simulateRestartBtn) {
                simulateRestartBtn.addEventListener('click', async () => {
                    try {
                        await this.handleRestartFlow();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            // Add message input event listeners
            if (messageInput) {
                messageInput.addEventListener('keypress', async (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        try {
                            await this.handleSendMessage();
                        } catch (error) {
                            this.addBotMessage(handleError(error));
                        }
                    }
                });
            }

            // Add send button listener
            if (sendButton) {
                sendButton.addEventListener('click', async () => {
                    try {
                        await this.handleSendMessage();
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                });
            }

            // Add back button listener
            if (backButton) {
                backButton.addEventListener('click', () => this.handleBackButton());
            }

            // Add option selection event listener
            document.addEventListener('click', async (event) => {
                const optionButton = event.target.closest('.option-button');
                if (optionButton) {
                    try {
                        const option = optionButton.textContent;
                        switch (this.state.currentFlow) {
                            case 'DIVERSION_FLOW':
                                if (this.state.diversionData.isUnloading) {
                                    await this.handleUnloadingAuthorization(option);
                                } else {
                                    await this.handleDiversionResponse(option);
                                }
                                break;

                            case 'NORMAL_DEVIATION':
                                await this.handleNormalDeviationReason(option);
                                break;
                        }
                    } catch (error) {
                        this.addBotMessage(handleError(error));
                    }
                }
            });

            // Set up event emitter system for custom events
            this.eventListeners = {};

            this.on('locationShared', (location) => {
                if (this.state.diversionData.awaitingLocation) {
                    this.state.diversionData.currentLocation = location;
                    this.handleLocationShare(location);
                }
            });

            this.on('optionSelected', (option) => {
                switch (this.state.currentFlow) {
                    case 'DIVERSION_FLOW':
                        if (this.state.diversionData.isUnloading) {
                            this.handleUnloadingAuthorization(option);
                        } else {
                            this.handleDiversionResponse(option);
                        }
                        break;

                    case 'NORMAL_DEVIATION':
                        this.handleNormalDeviationReason(option);
                        break;
                }
            });
        } catch (error) {
            console.error('Error setting up event listeners:', error);
            this.addBotMessage(handleError(error));
        }
    }

    handleBackButton() {
        // Implement back button functionality if needed
        console.log('Back button clicked');
    }

    async handleSendMessage() {
        try {
            const messageInput = getElement('messageInput');
            const message = validateMessage(messageInput.value);
            if (message) {
                this.clearError(); // Clear any existing error messages
                this.addUserMessage(message);
                messageInput.value = '';
                
                console.log('Current flow:', this.state.currentFlow);
                console.log('Current state:', this.currentState);
                console.log('Diversion data:', this.state.diversionData);
                
                // Handle UNLOADING_POINTS_COUNT separately and with highest priority
                if (this.state.currentFlow === 'UNLOADING_POINTS_COUNT') {
                    console.log('Detected UNLOADING_POINTS_COUNT flow');
                    await this.handleUnloadingPointsCount(message);
                    return;
                }
                
                // Handle DIVERSION_FLOW with clear state checks
                if (this.state.currentFlow === 'DIVERSION_FLOW') {
                    // Check specific sub-states in order of priority
                    if (this.state.diversionData.awaitingBags === true) {
                        console.log('Detected awaiting bags state');
                        await this.handleBagsCount(message);
                        return;
                    } 
                    
                    if (this.state.diversionData.awaitingLocation === true) {
                        console.log('Detected awaiting location state');
                        // Mock location data for testing
                        const mockLocation = {
                            address: message,
                            latitude: "19.0760",
                            longitude: "72.8777"
                        };
                        await this.handleLocationShare(mockLocation);
                        return;
                    }
                    
                    console.log('In diversion flow but no specific state active');
                    await this.addBotMessage(MessageTemplates[this.selectedLanguage].diversionProcessHelp);
                    return;
                }
                
                // Handle NORMAL_DEVIATION flow
                if (this.state.currentFlow === 'NORMAL_DEVIATION') {
                    console.log('Detected NORMAL_DEVIATION flow');
                    await this.handleNormalDeviationReason(message);
                    return;
                }
                
                // If no special flow, process as normal user input
                await this.processUserInput(message);
            }
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async processUserInput(message) {
        try {
            await this.showTypingIndicator();
            
            switch (this.currentState) {
                case BotState.INITIAL:
                    this.handleInitialState();
                    break;
                case BotState.LANGUAGE_SELECTION:
                    await this.handleLanguageSelection(message);
                    break;
                case BotState.CONSENT_MANAGEMENT:
                    await this.handleConsent(message);
                    break;
                case BotState.TRIP_STARTED:
                    await this.handleTripStarted(message);
                    break;
                case BotState.IN_TRANSIT:
                    await this.handleInTransit(message);
                    break;
                case BotState.DELIVERY_APPROACHING:
                    await this.handleDeliveryApproaching(message);
                    break;
                case BotState.DELIVERY_CONFIRMATION:
                    await this.handleDeliveryConfirmation(message);
                    break;
                default:
                    await this.handleScenario(message);
            }
        } catch (error) {
            this.addBotMessage(handleError(error));
        }
    }

    async handleScenario(scenario) {
        switch (scenario) {
            case 'language':
                this.currentState = BotState.LANGUAGE_SELECTION;
                await this.showLanguageOptions();
                break;
            case 'consent':
                this.currentState = BotState.CONSENT_MANAGEMENT;
                await this.showConsentOptions();
                break;
            case 'tripStart':
                await this.startTrip();
                break;
            case 'inTransit':
                await this.showTripProgress();
                break;
            case 'longStoppage':
                await this.handleLongStoppage();
                break;
            case 'approaching':
                await this.handleApproachingDelivery();
                break;
            case 'unloading':
                await this.handleUnloadingPoint();
                break;
            case 'epod':
                await this.handleEpodUpload();
                break;
            case 'diversion':
                await this.handleDiversion();
                break;
            case 'completed':
                await this.handleTripCompletion();
                break;
            default:
                this.addBotMessage(MessageTemplates[this.selectedLanguage].unknownCommand || 'Unknown scenario');
        }
    }

    async addBotMessage(message) {
        try {
            // Create or get the typing indicator
            const typingIndicator = this.getOrCreateTypingIndicator();
            
            // Show typing indicator before sending the message
            typingIndicator.style.display = 'block';
            await new Promise(resolve => setTimeout(resolve, 1000));
            typingIndicator.style.display = 'none';

            const validatedMessage = validateMessage(message);
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message received';
            
            const formattedMessage = validatedMessage
                .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
                .replace(/_(.*?)_/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');

            messageDiv.innerHTML = `
                <div class="message-content">${formattedMessage}</div>
                <div class="message-time">
                    ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; display: inline-block; margin-left: 4px; vertical-align: middle;">
                        <path d="M18 6L7 17l-5-5"></path>
                    </svg>
                </div>
            `;
            
            // Apply typography styles
            messageDiv.style.fontSize = 'var(--font-size-chat-message)';
            messageDiv.querySelector('.message-time').style.fontSize = 'var(--font-size-timestamp)';
            
            getElement('chatMessages').appendChild(messageDiv);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error adding bot message:', error);
        }
    }

    addUserMessage(message) {
        try {
            const validatedMessage = validateMessage(message);
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `
                <div class="message-content">${validatedMessage}</div>
                <div class="message-time">
                    ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; display: inline-block; margin-left: 4px; vertical-align: middle;">
                        <path d="M18 6L7 17l-5-5"></path>
                        <path d="M23 6L12 17l-5-5"></path>
                    </svg>
                </div>
            `;
            
            // Apply typography styles
            messageDiv.style.fontSize = 'var(--font-size-chat-message)';
            messageDiv.querySelector('.message-time').style.fontSize = 'var(--font-size-timestamp)';
            
            getElement('chatMessages').appendChild(messageDiv);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error adding user message:', error);
        }
    }

    showTypingIndicator() {
        try {
            // Create or get the typing indicator
            const indicator = this.getOrCreateTypingIndicator();
            
            // Show the indicator
            indicator.style.display = 'block';
            
            return new Promise(resolve => {
                setTimeout(() => {
                    indicator.style.display = 'none';
                    resolve();
                }, CONFIG.TYPING_DELAY);
            });
        } catch (error) {
            console.error('Error showing typing indicator:', error);
            return Promise.resolve(); // Resolve immediately if there's an error
        }
    }
    
    // Helper method to get or create the typing indicator
    getOrCreateTypingIndicator() {
        let indicator = document.getElementById('typingIndicator');
        
        // If indicator doesn't exist, create it
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'typingIndicator';
            indicator.innerHTML = `
                <div class="typing-bubble"></div>
                <div class="typing-bubble"></div>
                <div class="typing-bubble"></div>
            `;
            
            // Append it to chat messages container
            getElement('chatMessages').appendChild(indicator);
        }
        
        return indicator;
    }

    scrollToBottom() {
        try {
            const chatMessages = getElement('chatMessages');
            const lastMessage = chatMessages.lastElementChild;
            
            if (lastMessage) {
                // Add a small delay to ensure content is rendered
                setTimeout(() => {
                    lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    // Additional scroll to ensure message is above input field
                    chatMessages.scrollTop = chatMessages.scrollHeight + 100;
                }, 100);
            }
        } catch (error) {
            console.error('Error scrolling to bottom:', error);
        }
    }

    clearError() {
        const errorMessages = document.querySelectorAll('.message.received .message-content:has(⚠️)');
        errorMessages.forEach(error => {
            const messageDiv = error.closest('.message');
            if (messageDiv) {
                messageDiv.remove();
            }
        });
    }

    handleInitialState() {
        this.currentState = BotState.LANGUAGE_SELECTION;
        this.addBotMessage(MessageTemplates[this.selectedLanguage].selectLanguage);
        this.showLanguageOptions();
    }

    showLanguageOptions() {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        const languages = [
            { code: 'en', label: 'English' },
            { code: 'hi', label: 'हिंदी' },
            { code: 'te', label: 'తెలుగు' }
        ];
        
        languages.forEach(lang => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = lang.label;
            button.onclick = () => this.handleLanguageSelection(lang.code);
            optionsContainer.appendChild(button);
        });

        getElement('chatMessages').appendChild(optionsContainer);
        this.scrollToBottom();
    }

    async handleLanguageSelection(language) {
        if (!CONFIG.SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
            throw new Error(ErrorMessages.INVALID_LANGUAGE);
        }

        this.selectedLanguage = language.toLowerCase();
        this.currentState = BotState.CONSENT_MANAGEMENT;
        
        // Show language set confirmation in the selected language
        await this.addBotMessage(MessageTemplates[this.selectedLanguage].languageSet);
        
        // Check consent status and proceed accordingly
        await this.checkConsentStatus();
    }

    async checkConsentStatus() {
        // In a real implementation, this would fetch the actual consent status from your backend
        // For now, let's simulate different statuses
        const consentStatus = this.tripData.consentStatus || 'PENDING'; // 'APPROVED', 'PENDING', 'REJECTED'
        
        switch (consentStatus) {
            case 'APPROVED':
                await this.handleApprovedConsent();
                break;
            case 'PENDING':
                await this.handlePendingConsent();
                break;
            case 'REJECTED':
                await this.handleRejectedConsent();
                break;
            default:
                await this.handlePendingConsent();
        }
    }

    async handleApprovedConsent() {
        this.currentState = BotState.TRIP_STARTED;
        await this.addBotMessage(MessageTemplates[this.selectedLanguage].consentApproved);
        await this.startTrip();
    }

    async handlePendingConsent() {
        this.currentState = BotState.CONSENT_PENDING;
        await this.addBotMessage(MessageTemplates[this.selectedLanguage].consentPending);
        // Add a message asking driver to wait
        await this.addBotMessage(MessageTemplates[this.selectedLanguage].waitForApproval);
    }

    async handleRejectedConsent() {
        this.currentState = BotState.CONSENT_REJECTED;
        await this.addBotMessage(MessageTemplates[this.selectedLanguage].consentRejected);
        await this.showResendConsentOption();
    }

    async showResendConsentOption() {
        try {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = MessageTemplates[this.selectedLanguage].requestResendConsent;
            button.setAttribute('data-testid', 'resend-consent-button');
            
            // Enhanced click handler with error handling
            button.onclick = async () => {
                try {
                    button.disabled = true; // Prevent double clicks
                    await this.handleResendConsentRequest();
                } catch (error) {
                    this.addBotMessage(handleError(error));
                } finally {
                    button.disabled = false;
                }
            };
            
            optionsContainer.appendChild(button);
            getElement('chatMessages').appendChild(optionsContainer);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error showing resend consent option:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async handleResendConsentRequest() {
        try {
            // Show typing indicator for better UX
            await this.showTypingIndicator();
            
            // Show processing message
            await this.addBotMessage(MessageTemplates[this.selectedLanguage].consentResendRequested);
            
            // Simulate API call to backend
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show typing indicator again for the second message
            await this.showTypingIndicator();
            
            // Show wait message with the specific text requested
            await this.addBotMessage(MessageTemplates[this.selectedLanguage].waitForConsentApproval);
            
            // Update state
            this.currentState = BotState.CONSENT_PENDING;
            
        } catch (error) {
            console.error('Error handling resend consent request:', error);
            throw new Error(MessageTemplates[this.selectedLanguage].consentResendError);
        }
    }

    showConsentOptions() {
        const options = document.createElement('div');
        options.className = 'options-container';
        
        const buttons = MessageTemplates[this.selectedLanguage].buttons;
        [buttons.accept, buttons.decline].forEach(action => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = action;
            button.onclick = () => this.handleConsent(action === buttons.accept);
            options.appendChild(button);
        });

        getElement('chatMessages').appendChild(options);
        this.scrollToBottom();
    }

    async handleConsent(consented) {
        if (typeof consented !== 'boolean') {
            throw new Error('Invalid consent value');
        }

        if (consented) {
            this.currentState = BotState.TRIP_STARTED;
            await this.addBotMessage(MessageTemplates[this.selectedLanguage].consentAccepted);
            await this.startTrip();
        } else {
            this.currentState = BotState.CONSENT_REJECTED;
            await this.addBotMessage(MessageTemplates[this.selectedLanguage].consentRejected);
            this.showConsentOptions();
        }
    }

    async startTrip() {
        this.currentState = BotState.TRIP_STARTED;
        await this.addBotMessage(formatMessage(
            MessageTemplates[this.selectedLanguage].tripStarted,
            this.tripData
        ));
    }

    async showTripProgress() {
        this.currentState = BotState.IN_TRANSIT;
        await this.addBotMessage(formatMessage(
            MessageTemplates[this.selectedLanguage].tripInProgress,
            this.tripData
        ));
    }

    async handleInTransit(message) {
        try {
            await this.showTypingIndicator();
            
            console.log('Handling in-transit message, current flow:', this.state.currentFlow);
            console.log('Diversion data:', this.state.diversionData);
            
            // Strictly check specific flow states in priority order
            if (this.state.currentFlow === 'UNLOADING_POINTS_COUNT') {
                console.log('Handling as unloading points count');
                await this.handleUnloadingPointsCount(message);
                return;
            }
            
            // Handle diversion flow specific states
            if (this.state.currentFlow === 'DIVERSION_FLOW') {
                if (this.state.diversionData.awaitingBags) {
                    console.log('Handling as bags count');
                    await this.handleBagsCount(message);
                    return;
                } 
                
                if (this.state.diversionData.awaitingLocation) {
                    console.log('Handling as location share');
                    // Mock location data for testing
                    const mockLocation = {
                        address: message,
                        latitude: "19.0760",
                        longitude: "72.8777"
                    };
                    await this.handleLocationShare(mockLocation);
                    return;
                }
                
                // If in diversion flow but not in special state, show default diversion message
                console.log('In diversion flow but no special state active');
                await this.addBotMessage(MessageTemplates[this.selectedLanguage].diversionProcessHelp);
                return;
            }
            
            // Handle normal in-transit messages
            console.log('Handling as normal in-transit message');
            await this.addBotMessage(formatMessage(
                MessageTemplates[this.selectedLanguage].tripInProgress,
                this.tripData
            ));
        } catch (error) {
            console.error('Error handling in-transit message:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async handleLongStoppage() {
        await this.addBotMessage(formatMessage(
            MessageTemplates[this.selectedLanguage].longStoppage,
            this.tripData
        ));
        
        const reasons = MessageTemplates[this.selectedLanguage].stoppageReasons;
        this.showOptions(reasons);
    }

    async handleApproachingDelivery() {
        this.currentState = BotState.DELIVERY_APPROACHING;
        await this.addBotMessage(formatMessage(
            MessageTemplates[this.selectedLanguage].approachingDelivery,
            this.tripData
        ));
    }

    async handleEpodUpload() {
        await this.addBotMessage(MessageTemplates[this.selectedLanguage].uploadEpod);
    }

    async handleDiversion() {
        try {
            console.log('Handling diversion simulation');
            
            const alertData = {
                location: "Mumbai-Pune Expressway",
                deviationDistance: "5"
            };
            
            // Show typing indicator
            await this.showTypingIndicator();
            
            // First show the diversion alert message
            const message = formatMessage(
                MessageTemplates[this.selectedLanguage].alerts.diversion.initial,
                alertData
            );
            await this.addBotMessage(message);

            // Update the trip data with current location
            this.tripData.location = alertData.location;
            
            // Set the current state to handle diversion
            this.currentState = BotState.IN_TRANSIT;
            this.state.currentFlow = 'DIVERSION_FLOW';
            
            // Reset diversion data to avoid state conflicts
            this.state.diversionData = {
                isUnloading: false,
                unloadingPoints: [],
                currentPointIndex: 0,
                authorizedBy: null,
                awaitingLocation: false,
                awaitingBags: false,
                totalPoints: 0
            };

            console.log('Set diversion flow state:', this.state.currentFlow);
            console.log('Updated diversion data:', this.state.diversionData);

            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show Yes/No options based on language
            let yesNoOptions;
            if (this.selectedLanguage === 'hi') {
                yesNoOptions = ['हां', 'नहीं'];
            } else if (this.selectedLanguage === 'te') {
                yesNoOptions = ['అవును', 'కాదు'];
            } else {
                yesNoOptions = ['Yes', 'No'];
            }
            
            this.showOptions(yesNoOptions);
        } catch (error) {
            console.error('Error in diversion simulation:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async handleTripCompletion() {
        await this.addBotMessage(MessageTemplates[this.selectedLanguage].tripCompleted);
    }

    showOptions(options) {
        try {
            // Hide any existing typing indicator first
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            
            // Clear any floating elements
            const clearDiv = document.createElement('div');
            clearDiv.style.clear = 'both';
            getElement('chatMessages').appendChild(clearDiv);
            
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                // Apply the typography styles
                button.style.fontSize = 'var(--font-size-chat-message)';
                button.style.fontWeight = 'var(--font-weight-medium)';
                button.style.borderRadius = '20px';
                button.style.minHeight = 'var(--touch-target-size)';
                button.style.padding = '8px 16px';
                button.onclick = () => this.handleOptionSelection(option);
                optionsContainer.appendChild(button);
            });

            getElement('chatMessages').appendChild(optionsContainer);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error showing options:', error);
        }
    }

    async handleOptionSelection(option) {
        await this.showTypingIndicator();
        const response = formatMessage(
            MessageTemplates[this.selectedLanguage].selected || 'You selected: {option}',
            { option }
        );
        await this.addBotMessage(response);

        // Remove all option containers after selection
        const optionsContainers = document.querySelectorAll('.options-container');
        optionsContainers.forEach(container => container.remove());
    }

    async handleSimulateApproval() {
        try {
            const button = document.getElementById('simulateApproval');
            button.disabled = true;
            
            // Show typing indicator for better UX
            await this.showTypingIndicator();
            
            this.tripData.consentStatus = 'APPROVED';
            await this.checkConsentStatus();
            button.disabled = false;
        } catch (error) {
            console.error('Error in consent simulation:', error);
            this.addBotMessage(handleError(error));
            
            // Re-enable the button if there's an error
            const button = document.getElementById('simulateApproval');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateRejection() {
        try {
            const button = document.getElementById('simulateRejection');
            button.disabled = true;
            
            // Show typing indicator for better UX
            await this.showTypingIndicator();
            
            this.tripData.consentStatus = 'REJECTED';
            await this.checkConsentStatus();
            button.disabled = false;
        } catch (error) {
            console.error('Error in consent rejection simulation:', error);
            this.addBotMessage(handleError(error));
            
            // Re-enable the button if there's an error
            const button = document.getElementById('simulateRejection');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateLongStoppage() {
        try {
            const button = document.getElementById('simulateLongStoppage');
            if (button) button.disabled = true;

            // Set up data for the long stoppage alert
            const alertData = {
                location: "Mumbai-Pune Expressway",
                duration: "4 hours",
                stopDuration: "4 hours" // Added for template compatibility
            };

            await this.showTypingIndicator();
            
            // Update internal state
            this.currentState = BotState.STOPPAGE_REPORTED;
            this.tripData.location = alertData.location;
            
            // Get localized alert template
            let alertTemplate = MessageTemplates[this.selectedLanguage].alerts.longStoppage;
            const localizedAlertMessage = formatMessage(alertTemplate, alertData);
            this.addAlertBanner(localizedAlertMessage, 'warning');
            
            // Add a small delay before showing the regular message
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Use localized prompt message if available
            let promptMessage;
            if (this.selectedLanguage === 'hi') {
                promptMessage = 'कृपया रुकने का कारण चुनें या विवरण प्रदान करें।';
            } else if (this.selectedLanguage === 'te') {
                promptMessage = 'దయచేసి ఆగిపోవడానికి కారణాన్ని ఎంచుకోండి లేదా వివరణ ఇవ్వండి.';
            } else {
                promptMessage = 'Please select reason for stoppage or provide explanation.';
            }
            await this.addBotMessage(promptMessage);

            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show stoppage reason options
            const reasons = MessageTemplates[this.selectedLanguage].stoppageReasons || [
                'Lunch Break',
                'Vehicle Maintenance',
                'Traffic',
                'Rest Stop',
                'Other'
            ];
            this.showOptions(reasons);

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in long stoppage simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateLongStoppage');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateApproaching() {
        try {
            const button = document.getElementById('simulateApproaching');
            if (button) button.disabled = true;

            // Set up data for the approaching alert
            const alertData = {
                location: "Thane, Maharashtra",
                distance: "50",
                eta: "1 hour 15 minutes",
                destination: this.tripData.destination
            };

            await this.showTypingIndicator();
            
            // Update internal state
            this.currentState = BotState.DELIVERY_APPROACHING;
            this.tripData.location = alertData.location;
            
            // Use localized templates for alert banner
            let alertTemplate;
            
            // Try to get the most specific template first
            if (MessageTemplates[this.selectedLanguage]?.alerts?.approachingDelivery) {
                alertTemplate = MessageTemplates[this.selectedLanguage].alerts.approachingDelivery;
            } else if (MessageTemplates[this.selectedLanguage]?.alerts?.diversion?.approachingDelivery50KM) {
                alertTemplate = MessageTemplates[this.selectedLanguage].alerts.diversion.approachingDelivery50KM;
            } else if (MessageTemplates[this.selectedLanguage]?.approachingDelivery) {
                alertTemplate = MessageTemplates[this.selectedLanguage].approachingDelivery;
            } else {
                // Fallback to language-specific hardcoded messages if templates aren't found
                if (this.selectedLanguage === 'hi') {
                    alertTemplate = `📍 *डिलीवरी पॉइंट के पास*
आप अब डिलीवरी स्थान से {distance} किमी दूर हैं।
वर्तमान स्थान: {location}
अनुमानित पहुंचने का समय: {eta}
डिलीवरी स्थान: {destination}`;
                } else if (this.selectedLanguage === 'te') {
                    alertTemplate = `📍 *డెలివరీ పాయింట్‌కి చేరుకుంటున్నారు*
మీరు ఇప్పుడు డెలివరీ స్థానం నుండి {distance} కి.మీ దూరంలో ఉన్నారు.
ప్రస్తుత స్థానం: {location}
అంచనా చేరుకునే సమయం: {eta}
డెలివరీ స్థానం: {destination}`;
                } else {
                    alertTemplate = `📍 *Approaching Delivery Point*
You are now {distance} KM away from the delivery location.
Current Location: {location}
Estimated arrival time: {eta}
Delivery Location: {destination}`;
                }
            }
            
            // Format the alert message with the data
            const localizedAlertMessage = formatMessage(alertTemplate, { ...this.tripData, ...alertData });
            this.addAlertBanner(localizedAlertMessage, 'info');
            
            // Add a small delay before showing additional information
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show additional preparation message in the selected language
            let prepMessage;
            if (this.selectedLanguage === 'hi') {
                prepMessage = 'कृपया गंतव्य पर उतराई की तैयारी करें।';
            } else if (this.selectedLanguage === 'te') {
                prepMessage = 'దయచేసి గమ్యస్థానంలో దిగుమతి కోసం సిద్ధం కండి.';
            } else {
                prepMessage = 'Please prepare for unloading at the destination.';
            }
            await this.addBotMessage(prepMessage);

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in approaching simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateApproaching');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateEpodFlow() {
        try {
            const button = document.getElementById('simulateEpodFlow');
            if (button) button.disabled = true;

            // Set up data for the ePOD flow
            const deliveryData = {
                location: this.tripData.destination,
                tripId: this.tripData.tripId,
                destination: this.tripData.destination
            };

            await this.showTypingIndicator();
            
            // Update internal state
            this.currentState = BotState.DELIVERY_CONFIRMATION;
            
            // Check for the template in various possible paths - carefully select the right one
            let messageTemplate;
            
            // First try the most specific path - alerts.diversion.epodOtpFlow
            if (MessageTemplates[this.selectedLanguage]?.alerts?.diversion?.epodOtpFlow) {
                messageTemplate = MessageTemplates[this.selectedLanguage].alerts.diversion.epodOtpFlow;
            }
            // Then try alerts.epodOtpFlow
            else if (MessageTemplates[this.selectedLanguage]?.alerts?.epodOtpFlow) {
                messageTemplate = MessageTemplates[this.selectedLanguage].alerts.epodOtpFlow;
            }
            // Then try root level epodOtpFlow (newer structure)
            else if (MessageTemplates[this.selectedLanguage]?.epodOtpFlow) {
                messageTemplate = MessageTemplates[this.selectedLanguage].epodOtpFlow;
            }
            // Fallback to English default
            else {
                messageTemplate = `📦 *Delivery Confirmation Required*
You have arrived at the delivery location.
Please complete the following steps to confirm delivery:
1. Upload ePOD document
2. Enter OTP received from consignee`;
            }
            
            // Show the ePOD flow message
            await this.addBotMessage(formatMessage(
                messageTemplate,
                deliveryData
            ));

            // Add a small delay before showing upload buttons
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show the ePOD upload and OTP buttons
            this.showEpodUploadButton();
            this.showOtpButton();

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in ePOD flow simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateEpodFlow');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateContinuousDriving() {
        try {
            const button = document.getElementById('simulateContinuousDriving');
            if (button) button.disabled = true;

            // Set up data for the continuous driving alert
            const alertData = {
                location: "Mumbai-Pune Expressway",
                duration: "4 hours"
            };

            await this.showTypingIndicator();
            
            // Update internal state
            this.currentState = BotState.IN_TRANSIT;
            this.tripData.location = alertData.location;
            
            // Show the continuous driving message
            // Check if the template exists in the expected path, otherwise use a fallback
            const messageTemplate = 
                MessageTemplates[this.selectedLanguage].alerts?.continuousDriving || 
                `⚠️ *Continuous Driving Alert*
Driver has been driving for {duration} hours without proper rest.
Current Location: {location}
Please ensure mandatory rest break is taken.`;
            
            await this.addBotMessage(formatMessage(
                messageTemplate,
                { ...this.tripData, ...alertData }
            ));

            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show continuous driving options (Accept/Ignore)
            this.showOptions([
                MessageTemplates[this.selectedLanguage].buttons?.confirm || 'Confirm Rest',
                MessageTemplates[this.selectedLanguage].buttons?.decline || 'Ignore'
            ]);

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in continuous driving simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateContinuousDriving');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateNightDriving() {
        try {
            const button = document.getElementById('simulateNightDriving');
            if (button) button.disabled = true;

            // Set up data for the night driving alert
            const alertData = {
                location: "Mumbai-Pune Expressway",
                time: "23:45"
            };

            await this.showTypingIndicator();
            
            // Update internal state
            this.currentState = BotState.IN_TRANSIT;
            this.tripData.location = alertData.location;
            
            // Show the night driving message
            // Check if the template exists in the expected path, otherwise use a fallback
            const messageTemplate = 
                MessageTemplates[this.selectedLanguage].alerts?.nightDriving || 
                `⚠️ *Night Driving Alert*
Vehicle is in transit during restricted night hours ({time}).
Current Location: {location}
Please confirm if night driving permission is obtained.`;
            
            await this.addBotMessage(formatMessage(
                messageTemplate,
                { ...this.tripData, ...alertData }
            ));

            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show night driving options (Yes/No)
            this.showOptions([
                MessageTemplates[this.selectedLanguage].buttons?.confirm || 'Permission Obtained',
                MessageTemplates[this.selectedLanguage].buttons?.decline || 'No Permission'
            ]);

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in night driving simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateNightDriving');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateOverSpeeding() {
        try {
            const button = document.getElementById('simulateOverSpeeding');
            if (button) button.disabled = true;

            // Set up data for the over-speeding alert
            const alertData = {
                location: "Mumbai-Pune Expressway",
                speed: "95",
                speedLimit: "80"
            };

            await this.showTypingIndicator();
            
            // Update internal state
            this.currentState = BotState.IN_TRANSIT;
            this.tripData.location = alertData.location;
            
            // Show the over-speeding message
            // Check if the template exists in the expected path, otherwise use a fallback
            const messageTemplate = 
                MessageTemplates[this.selectedLanguage].alerts?.overSpeeding || 
                `🚨 *Over-Speeding Alert*
Vehicle speed: {speed} km/h
Speed limit: {speedLimit} km/h
Location: {location}
Please advise driver to maintain speed limits.`;
            
            await this.addBotMessage(formatMessage(
                messageTemplate,
                { ...this.tripData, ...alertData }
            ));

            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show over-speeding options
            this.showOptions([
                MessageTemplates[this.selectedLanguage].buttons?.confirm || 'Acknowledge',
                MessageTemplates[this.selectedLanguage].buttons?.report || 'Contact Driver'
            ]);

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in over-speeding simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateOverSpeeding');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateRouteDeviation() {
        try {
            const button = document.getElementById('simulateRouteDeviation');
            if (button) button.disabled = true;

            // Set up data for the route deviation alert
            const alertData = {
                location: "Mumbai-Pune Expressway",
                deviationDistance: "5"
            };

            await this.showTypingIndicator();
            
            // Update internal state
            this.currentState = BotState.IN_TRANSIT;
            this.tripData.location = alertData.location;
            
            // Get localized alert template
            let alertTemplate = MessageTemplates[this.selectedLanguage].alerts.routeDeviation;
            const localizedAlertMessage = formatMessage(alertTemplate, alertData);
            this.addAlertBanner(localizedAlertMessage, 'warning');
            
            // Add a small delay before showing the regular message
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Use localized prompt message if available
            let promptMessage;
            if (this.selectedLanguage === 'hi') {
                promptMessage = 'कृपया विचलन का कारण बताएं।';
            } else if (this.selectedLanguage === 'te') {
                promptMessage = 'దయచేసి వైకల్యానికి కారణాన్ని వివరించండి.';
            } else {
                promptMessage = 'Please explain the reason for deviation.';
            }
            await this.addBotMessage(promptMessage);

            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show deviation reason options
            const reasons = MessageTemplates[this.selectedLanguage].deviationReasons || [
                'Traffic Congestion',
                'Road Construction',
                'Accident on Route',
                'Police Checkpost',
                'Weather Conditions',
                'Other'
            ];
            this.showOptions(reasons);

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in route deviation simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateRouteDeviation');
            if (button) button.disabled = false;
        }
    }

    async handleSimulateDiversion() {
        try {
            const button = document.getElementById('simulateDiversion');
            if (button) button.disabled = true;

            console.log('Handling diversion simulation');
            
            const alertData = {
                location: "Mumbai-Pune Expressway",
                deviationDistance: "5"
            };
            
            // Show typing indicator
            await this.showTypingIndicator();
            
            // First show the diversion alert message
            const message = formatMessage(
                MessageTemplates[this.selectedLanguage].alerts.diversion.initial,
                alertData
            );
            await this.addBotMessage(message);

            // Update the trip data with current location
            this.tripData.location = alertData.location;
            
            // Set the current state to handle diversion
            this.currentState = BotState.IN_TRANSIT;
            this.state.currentFlow = 'DIVERSION_FLOW';
            
            // Reset diversion data to avoid state conflicts
            this.state.diversionData = {
                isUnloading: false,
                unloadingPoints: [],
                currentPointIndex: 0,
                authorizedBy: null,
                awaitingLocation: false,
                awaitingBags: false,
                totalPoints: 0
            };

            console.log('Set diversion flow state:', this.state.currentFlow);
            console.log('Updated diversion data:', this.state.diversionData);

            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Show Yes/No options based on language
            let yesNoOptions;
            if (this.selectedLanguage === 'hi') {
                yesNoOptions = ['हां', 'नहीं'];
            } else if (this.selectedLanguage === 'te') {
                yesNoOptions = ['అవును', 'కాదు'];
            } else {
                yesNoOptions = ['Yes', 'No'];
            }
            
            this.showOptions(yesNoOptions);

            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in diversion simulation:', error);
            this.addBotMessage(handleError(error));
            const button = document.getElementById('simulateDiversion');
            if (button) button.disabled = false;
        }
    }

    async handleDiversionResponse(response) {
        try {
            await this.showTypingIndicator();
            
            // Accept responses in multiple languages 
            const yesResponses = ['yes', 'हां', 'అవును'];
            const noResponses = ['no', 'नहीं', 'కాదు'];
            
            if (yesResponses.includes(response.toLowerCase())) {
                this.state.diversionData.isUnloading = true;
                
                // Show unloading confirmation message
                const message = MessageTemplates[this.selectedLanguage].alerts.diversion.unloadingQuery;
                await this.addBotMessage(message);
                
                // Add a small delay before showing options
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Show authorization options
                this.showOptions(['1', '2', '3']);
            } else if (noResponses.includes(response.toLowerCase())) {
                await this.handleNormalDeviation();
            } else {
                throw new Error('Invalid response. Please select Yes or No.');
            }
        } catch (error) {
            console.error('Error in diversion response:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async handleNormalDeviation() {
        try {
            await this.showTypingIndicator();
            
            // Show normal deviation message
            const message = MessageTemplates[this.selectedLanguage].alerts.diversion.normalDeviation;
            await this.addBotMessage(message);
            
            // Add a small delay before showing options
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Show deviation reason options - maintain numeric options for consistency across languages
            this.showOptions(['1', '2', '3', '4', '5']);
            this.state.currentFlow = 'NORMAL_DEVIATION';
        } catch (error) {
            console.error('Error handling normal deviation:', error);
            this.addBotMessage(handleError(error));
        }
    }

    handleNormalDeviationReason(reason) {
        try {
            let deviationReason;
            switch (reason) {
                case '1':
                    // Use language-specific reason if available
                    if (this.selectedLanguage === 'hi') {
                        deviationReason = 'ट्रैफिक जाम';
                    } else if (this.selectedLanguage === 'te') {
                        deviationReason = 'ట్రాఫిక్ రద్దీ';
                    } else {
                        deviationReason = 'Traffic Congestion';
                    }
                    break;
                case '2':
                    if (this.selectedLanguage === 'hi') {
                        deviationReason = 'सड़क अवरोध';
                    } else if (this.selectedLanguage === 'te') {
                        deviationReason = 'రోడ్డు అడ్డంకి';
                    } else {
                        deviationReason = 'Road Block';
                    }
                    break;
                case '3':
                    if (this.selectedLanguage === 'hi') {
                        deviationReason = 'पुलिस चेकपोस्ट';
                    } else if (this.selectedLanguage === 'te') {
                        deviationReason = 'పోలీస్ చెక్‌పోస్ట్';
                    } else {
                        deviationReason = 'Police Checkpost';
                    }
                    break;
                case '4':
                    if (this.selectedLanguage === 'hi') {
                        deviationReason = 'वाहन समस्या';
                    } else if (this.selectedLanguage === 'te') {
                        deviationReason = 'వాహన సమస్య';
                    } else {
                        deviationReason = 'Vehicle Issue';
                    }
                    break;
                case '5':
                    if (this.selectedLanguage === 'hi') {
                        deviationReason = 'अन्य';
                    } else if (this.selectedLanguage === 'te') {
                        deviationReason = 'ఇతరం';
                    } else {
                        deviationReason = 'Other';
                    }
                    break;
                default:
                    if (typeof reason === 'string' && reason.trim()) {
                        deviationReason = reason.trim();
                    } else {
                        throw new Error('Invalid deviation reason');
                    }
            }

            this.state.diversionData.deviationReason = deviationReason;
            this.addBotMessage(formatMessage(
                MessageTemplates[this.selectedLanguage].deviationReasonRecorded || 'Deviation reason recorded: {reason}',
                { reason: deviationReason }
            ));
            
            this.addBotMessage(MessageTemplates[this.selectedLanguage].returnToRoute || 'Please return to the planned route as soon as possible.');
            this.state.currentFlow = 'IN_TRANSIT';
        } catch (error) {
            console.error('Error handling deviation reason:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async handleUnloadingAuthorization(option) {
        try {
            await this.showTypingIndicator();
            
            if (!['1', '2', '3'].includes(option)) {
                throw new Error(MessageTemplates[this.selectedLanguage].invalidAuthorizationOption || 'Invalid authorization option');
            }

            this.state.diversionData.authorizedBy = option;
            
            // Show unloading points query message
            const message = MessageTemplates[this.selectedLanguage].alerts.diversion.unloadingPointsQuery;
            await this.addBotMessage(message);
            
            // Add a small delay before showing next message
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.state.currentFlow = 'UNLOADING_POINTS_COUNT';
        } catch (error) {
            console.error('Error in unloading authorization:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async handleUnloadingPointsCount(count) {
        try {
            await this.showTypingIndicator();
            
            console.log('Handling unloading points count:', count);
            
            // Ensure count is treated as a number
            let numPoints;
            if (typeof count === 'string') {
                // Try to parse the string as a number
                numPoints = parseInt(count.trim(), 10);
            } else if (typeof count === 'number') {
                numPoints = count;
            } else {
                throw new Error('Invalid input for unloading points count');
            }
            
            console.log('Parsed unloading points count:', numPoints);
            
            // Only validate for minimum count and NaN
            if (isNaN(numPoints) || numPoints < 1) {
                throw new Error('Please enter a valid number of unloading points (minimum 1).');
            }

            // For very large numbers, add a confirmation but don't block the flow
            if (numPoints > 20) {
                console.warn(`Large number of unloading points: ${numPoints}`);
                await this.addBotMessage(`Confirming: You need to unload at ${numPoints} different locations?`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Update state with the number of points and immediately change to DIVERSION_FLOW
            this.state.diversionData.totalPoints = numPoints;
            this.state.currentFlow = 'DIVERSION_FLOW';
            
            // Add confirmation message with localized text
            const processingMessage = formatMessage(
                MessageTemplates[this.selectedLanguage].processingUnloading || 'Processing unloading at {numPoints} location(s).',
                { numPoints }
            );
            await this.addBotMessage(processingMessage);
            
            // Start requesting location details for the first point using direct call instead of setTimeout
            await new Promise(resolve => setTimeout(resolve, 800));
            await this.requestLocationDetails(1);
        } catch (error) {
            console.error('Error in unloading points count:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async requestLocationDetails(pointNumber) {
        try {
            await this.showTypingIndicator();
            
            console.log(`Requesting location details for point #${pointNumber}`);
            console.log(`Total points: ${this.state.diversionData.totalPoints}`);
            
            // Check if we've reached the end of points
            if (pointNumber > this.state.diversionData.totalPoints) {
                console.log('All points completed, finishing unloading details');
                await this.finishUnloadingDetails();
                return;
            }

            // Format the message with the current point number
            const message = formatMessage(
                MessageTemplates[this.selectedLanguage].alerts.diversion.locationDetailsPrompt,
                { pointNumber }
            );
            await this.addBotMessage(message);
            
            // Update state to await location
            this.state.diversionData.currentPointIndex = pointNumber;
            this.state.diversionData.awaitingLocation = true;
            this.state.diversionData.awaitingBags = false;
            
            // Add a small delay before showing location share button
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Show the location share button
            this.showLocationShareButton();
        } catch (error) {
            console.error('Error requesting location details:', error);
            this.addBotMessage(handleError(error));
        }
    }

    async handleLocationShare(location) {
        try {
            console.log('Location share received:', location);
            
            if (!this.state.diversionData.awaitingLocation) {
                console.log('Not currently awaiting location');
                return;
            }
            
            // Validate location data and use default values for missing fields
            const processedLocation = {
                address: (location && location.address) ? location.address : 'Unknown location',
                latitude: (location && location.latitude) ? location.latitude : '0.0',
                longitude: (location && location.longitude) ? location.longitude : '0.0'
            };

            await this.showTypingIndicator();
            
            // Show the received location
            const message = formatMessage(
                MessageTemplates[this.selectedLanguage].alerts.diversion.locationReceived,
                processedLocation
            );
            await this.addBotMessage(message);
            
            // Update state
            this.state.diversionData.awaitingLocation = false;
            this.state.diversionData.awaitingBags = true;
            this.state.diversionData.currentLocation = processedLocation;
            
            console.log('Updated state to await bags count');
            console.log('Current state:', this.state.diversionData);
            
            // Add a delay before showing bags prompt
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show the bags prompt with clear instructions
            const bagsPrompt = MessageTemplates[this.selectedLanguage].alerts.diversion.bagsPrompt;
            await this.addBotMessage(bagsPrompt);
            
            // Highlight input field for better user experience
            const messageInput = getElement('messageInput');
            if (messageInput) {
                messageInput.focus();
                messageInput.placeholder = 'Enter number of bags...';
            }
        } catch (error) {
            console.error('Error handling location share:', error);
            this.addBotMessage(handleError(error));
            
            // Reset state in case of error
            this.state.diversionData.awaitingLocation = true;
            this.state.diversionData.awaitingBags = false;
            
            // Show location share button again after short delay
            setTimeout(() => {
                this.showLocationShareButton();
            }, 1500);
        }
    }

    async handleBagsCount(count) {
        try {
            console.log('Handling bags count:', count);
            console.log('Current state:', this.state.diversionData);
            
            if (!this.state.diversionData.awaitingBags) {
                console.log('Not currently awaiting bags count');
                return;
            }

            await this.showTypingIndicator();
            
            // Parse the bags count
            let numBags;
            if (typeof count === 'string') {
                numBags = parseInt(count.trim(), 10);
            } else if (typeof count === 'number') {
                numBags = count;
            } else {
                throw new Error('Invalid input for bags count');
            }
            
            console.log('Parsed bags count:', numBags);
            
            // Validation - only check for minimum value and NaN
            if (isNaN(numBags) || numBags < 1) {
                throw new Error('Please enter a valid number of bags (minimum 1).');
            }
            
            // Very large numbers warning only in console, not as error to user
            if (numBags > 10000) {
                console.warn(`Very large number of bags: ${numBags}`);
                // Add a confirmation message but don't block the flow
                await this.addBotMessage(`Confirming: You are unloading ${numBags} bags at this location?`);
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Record the bags count for this location
            const currentPoint = this.state.diversionData.currentPointIndex;
            this.state.diversionData.unloadingPoints.push({
                pointNumber: currentPoint,
                bags: numBags,
                location: this.state.diversionData.currentLocation
            });

            console.log(`Recorded ${numBags} bags for point ${currentPoint}`);
            console.log('Updated unloading points:', this.state.diversionData.unloadingPoints);

            // Update state to not await bags anymore and explicitly set the flow state
            this.state.diversionData.awaitingBags = false;
            this.state.diversionData.awaitingLocation = false;
            this.state.currentFlow = 'DIVERSION_FLOW'; // Ensure we're in the right flow
            
            // Add confirmation message using localized text
            const recordedMessage = formatMessage(
                MessageTemplates[this.selectedLanguage].recordedBags || '✅ Recorded {numBags} bags at this location.',
                { numBags }
            );
            await this.addBotMessage(recordedMessage);
            
            // Reset message input placeholder
            const messageInput = getElement('messageInput');
            if (messageInput) {
                messageInput.placeholder = 'Type a message...';
                messageInput.value = ''; // Clear any existing text
            }
            
            // Move to the next point directly with an await call instead of using setTimeout
            await new Promise(resolve => setTimeout(resolve, 800));
            const nextPoint = currentPoint + 1;
            console.log(`Directly proceeding to next point #${nextPoint}`);
            
            // Check if we've reached the end of points
            if (nextPoint > this.state.diversionData.totalPoints) {
                console.log('All points completed, finishing unloading details');
                await this.finishUnloadingDetails();
            } else {
                // Request next location
                await this.requestLocationDetails(nextPoint);
            }
        } catch (error) {
            console.error('Error handling bags count:', error);
            this.addBotMessage(handleError(error));
        }
    }
    
    async finishUnloadingDetails() {
        try {
            console.log('Finishing unloading details');
            console.log('Unloading points:', this.state.diversionData.unloadingPoints);
            
            if (this.state.diversionData.unloadingPoints.length < 1) {
                console.error('No unloading points recorded');
                throw new Error(MessageTemplates[this.selectedLanguage].noUnloadingPointsRecorded || 'No unloading points recorded');
            }

            await this.showTypingIndicator();
            
            // Show completion message
            const message = formatMessage(
                MessageTemplates[this.selectedLanguage].alerts.diversion.unloadingSuccess,
                { numPoints: this.state.diversionData.totalPoints }
            );
            await this.addBotMessage(message);

            // Add a small delay before showing ePOD prompt
            await new Promise(resolve => setTimeout(resolve, 500));

            // Show ePOD prompt
            const epodPrompt = MessageTemplates[this.selectedLanguage].alerts.diversion.epodPrompt;
            await this.addBotMessage(epodPrompt);
            
            // Add a small delay before showing buttons
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Show upload and OTP buttons
            this.showEpodUploadButton();
            this.showOtpButton();
            
            // Update state to EPOD flow
            this.state.currentFlow = 'EPOD_FLOW';
            console.log('Changed flow to EPOD_FLOW');
        } catch (error) {
            console.error('Error finishing unloading details:', error);
            this.addBotMessage(handleError(error));
        }
    }

    // Function to handle location sharing in the UI
    showLocationShareButton() {
        try {
            // Hide any existing typing indicator first
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            
            // Clear any floating elements
            const clearDiv = document.createElement('div');
            clearDiv.style.clear = 'both';
            getElement('chatMessages').appendChild(clearDiv);
            
            // Remove any existing location share buttons first to prevent duplicates
            const existingButtons = document.querySelectorAll('.location-button');
            existingButtons.forEach(button => {
                const container = button.closest('.options-container');
                if (container) container.remove();
            });
            
            const locationShareContainer = document.createElement('div');
            locationShareContainer.className = 'options-container';
            
            const locationButton = document.createElement('button');
            locationButton.className = 'option-button location-button';
            // Apply updated WhatsApp UI styling
            locationButton.style.backgroundColor = 'var(--whatsapp-blue)';
            locationButton.style.minHeight = 'var(--touch-target-size)';
            locationButton.style.borderRadius = '20px';
            locationButton.style.padding = '8px 16px';
            locationButton.style.display = 'inline-flex';
            locationButton.style.alignItems = 'center';
            locationButton.style.fontSize = 'var(--font-size-chat-message)';
            locationButton.style.fontWeight = 'var(--font-weight-medium)';
            
            // Add location icon + text
            locationButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Share Location
            `;
            
            // Safe click handler with proper error handling
            locationButton.onclick = async () => {
                try {
                    // Disable button to prevent multiple clicks
                    locationButton.disabled = true;
                    locationButton.textContent = 'Sharing location...';
                    
                    // Mock location for testing with small delay to simulate sharing
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    const mockLocation = {
                        address: "Test Location, Mumbai",
                        latitude: "19.0760",
                        longitude: "72.8777"
                    };
                    
                    // Remove the location share button after successful location generation
                    if (locationShareContainer && locationShareContainer.parentNode) {
                        locationShareContainer.remove();
                    }
                    
                    // Process the shared location through the correct handler
                    if (typeof this.handleLocationShare === 'function') {
                        console.log('Calling handleLocationShare with mock location');
                        await this.handleLocationShare(mockLocation);
                    } else {
                        console.error('handleLocationShare method not found');
                        throw new Error('Could not process location. Please try again.');
                    }
                } catch (error) {
                    console.error('Error in location sharing button:', error);
                    
                    // Add error message to the chat
                    if (typeof this.addBotMessage === 'function') {
                        this.addBotMessage(handleError(error));
                    } else {
                        console.error('addBotMessage method not found');
                    }
                    
                    // Re-enable button in case of error
                    if (locationButton) {
                        locationButton.disabled = false;
                        locationButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            Share Location (Try Again)
                        `;
                    }
                }
            };
            
            locationShareContainer.appendChild(locationButton);
            getElement('chatMessages').appendChild(locationShareContainer);
            this.scrollToBottom();
            
            // Focus on the button to make it more obvious to users
            locationButton.focus();
        } catch (error) {
            console.error('Error showing location share button:', error);
            this.addBotMessage(handleError(error));
            
            // Attempt recovery if showing button fails
            setTimeout(() => {
                this.addBotMessage("Please type your location manually if the Share Location button doesn't appear.");
            }, 1000);
        }
    }

    // Function to show ePOD upload button
    showEpodUploadButton() {
        try {
            // Hide any existing typing indicator first
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            
            // Clear any floating elements
            const clearDiv = document.createElement('div');
            clearDiv.style.clear = 'both';
            getElement('chatMessages').appendChild(clearDiv);
            
            const epodContainer = document.createElement('div');
            epodContainer.className = 'options-container';
            
            const epodButton = document.createElement('button');
            epodButton.className = 'option-button epod-button';
            // Apply updated WhatsApp UI styling
            epodButton.style.backgroundColor = 'var(--whatsapp-blue)';
            epodButton.style.minHeight = 'var(--touch-target-size)';
            epodButton.style.borderRadius = '20px';
            epodButton.style.padding = '8px 16px';
            epodButton.style.display = 'inline-flex';
            epodButton.style.alignItems = 'center';
            epodButton.style.fontSize = 'var(--font-size-chat-message)';
            epodButton.style.fontWeight = 'var(--font-weight-medium)';
            
            // Get localized button text based on the selected language
            let buttonText = 'Upload ePOD';
            if (this.selectedLanguage === 'hi') {
                buttonText = 'ePOD अपलोड करें';
            } else if (this.selectedLanguage === 'te') {
                buttonText = 'ePOD అప్‌లోడ్ చేయండి';
            }
            
            // Add document icon + localized text
            epodButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                ${buttonText}
            `;
            
            epodButton.onclick = async () => {
                try {
                    // Remove the button after clicking
                    epodContainer.remove();
                    
                    // Show processing message
                    const uploadingMessage = MessageTemplates[this.selectedLanguage].epodUploading || 'Uploading ePOD document...';
                    await this.addBotMessage(uploadingMessage);
                    
                    // Simulate processing delay
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    const uploadedMessage = MessageTemplates[this.selectedLanguage].epodUploaded || 'ePOD document uploaded successfully! ✅';
                    await this.addBotMessage(uploadedMessage);
                } catch (error) {
                    this.addBotMessage(handleError(error));
                }
            };
            
            epodContainer.appendChild(epodButton);
            getElement('chatMessages').appendChild(epodContainer);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error showing ePOD upload button:', error);
            this.addBotMessage(handleError(error));
        }
    }

    // Function to show OTP button
    showOtpButton() {
        try {
            // Hide any existing typing indicator first
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            
            // Clear any floating elements
            const clearDiv = document.createElement('div');
            clearDiv.style.clear = 'both';
            getElement('chatMessages').appendChild(clearDiv);
            
            const otpContainer = document.createElement('div');
            otpContainer.className = 'options-container';
            
            const otpButton = document.createElement('button');
            otpButton.className = 'option-button otp-button';
            // Apply updated WhatsApp UI styling
            otpButton.style.backgroundColor = 'var(--whatsapp-blue)';
            otpButton.style.minHeight = 'var(--touch-target-size)';
            otpButton.style.borderRadius = '20px';
            otpButton.style.padding = '8px 16px';
            otpButton.style.display = 'inline-flex';
            otpButton.style.alignItems = 'center';
            otpButton.style.fontSize = 'var(--font-size-chat-message)';
            otpButton.style.fontWeight = 'var(--font-weight-medium)';
            
            // Get localized button text based on the selected language
            let buttonText = 'Enter OTP';
            if (this.selectedLanguage === 'hi') {
                buttonText = 'OTP दर्ज करें';
            } else if (this.selectedLanguage === 'te') {
                buttonText = 'OTP నమోదు చేయండి';
            }
            
            // Add key icon + localized text
            otpButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
                ${buttonText}
            `;
            
            otpButton.onclick = async () => {
                try {
                    // Remove the button after clicking
                    otpContainer.remove();
                    
                    // Show OTP message
                    await this.addBotMessage(MessageTemplates[this.selectedLanguage].enterOtp || 'Please enter the OTP received:');
                    
                    // Show mock OTP being verified
                    await this.showTypingIndicator();
                    const otpVerifiedMessage = MessageTemplates[this.selectedLanguage].otpVerified || 'OTP verified successfully! ✅';
                    await this.addBotMessage(otpVerifiedMessage);
                    
                    // Complete the delivery
                    this.currentState = BotState.DELIVERY_COMPLETED;
                    
                    // Check for the deliveryCompleted message in various possible paths
                    let deliveryMessage;
                    
                    // First try the most specific path - alerts.diversion.deliveryCompleted
                    if (MessageTemplates[this.selectedLanguage]?.alerts?.diversion?.deliveryCompleted) {
                        deliveryMessage = formatMessage(
                            MessageTemplates[this.selectedLanguage].alerts.diversion.deliveryCompleted,
                            this.tripData
                        );
                    }
                    // Then try root level deliveryCompleted
                    else if (MessageTemplates[this.selectedLanguage]?.deliveryCompleted) {
                        deliveryMessage = formatMessage(
                            MessageTemplates[this.selectedLanguage].deliveryCompleted,
                            this.tripData
                        );
                    }
                    // Then try tripCompleted as another possible name
                    else if (MessageTemplates[this.selectedLanguage]?.tripCompleted) {
                        deliveryMessage = formatMessage(
                            MessageTemplates[this.selectedLanguage].tripCompleted,
                            this.tripData
                        );
                    }
                    // Last resort fallback
                    else {
                        deliveryMessage = `✅ *Delivery Successfully Completed*
Thank you for completing the delivery.
Trip ID: ${this.tripData.tripId}
Destination: ${this.tripData.destination}
Delivery confirmation location: ${this.tripData.location}

The trip is now marked as complete.`;
                    }
                    
                    await this.addBotMessage(deliveryMessage);
                } catch (error) {
                    this.addBotMessage(handleError(error));
                }
            };
            
            otpContainer.appendChild(otpButton);
            getElement('chatMessages').appendChild(otpContainer);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error showing OTP button:', error);
            this.addBotMessage(handleError(error));
        }
    }

    // Add a helper method to create alert banners
    addAlertBanner(message, type = 'info') {
        try {
            // Hide any existing typing indicator first
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            
            const bannerDiv = document.createElement('div');
            bannerDiv.className = 'alert-banner';
            
            // Set different styles based on alert type
            if (type === 'warning') {
                bannerDiv.style.backgroundColor = '#FFF9C4';
                bannerDiv.style.color = '#5F4C0B';
            } else if (type === 'error') {
                bannerDiv.style.backgroundColor = '#FFEBEE';
                bannerDiv.style.color = '#B71C1C';
            } else if (type === 'success') {
                bannerDiv.style.backgroundColor = '#E8F5E9';
                bannerDiv.style.color = '#1B5E20';
            }
            
            // Format the message
            const validatedMessage = validateMessage(message);
            const formattedMessage = validatedMessage
                .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
                .replace(/_(.*?)_/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
                
            bannerDiv.innerHTML = formattedMessage;
            
            // Clear any floating elements to ensure proper placement
            const clearDiv = document.createElement('div');
            clearDiv.style.clear = 'both';
            getElement('chatMessages').appendChild(clearDiv);
            
            // Add the banner
            getElement('chatMessages').appendChild(bannerDiv);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error adding alert banner:', error);
        }
    }

    // Helper function to establish event listeners
    on(event, callback) {
        if (!this.eventListeners) {
            this.eventListeners = {};
        }
        
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        
        this.eventListeners[event].push(callback);
    }

    // Helper function to trigger events
    emit(event, data) {
        if (!this.eventListeners || !this.eventListeners[event]) {
            return;
        }
        
        for (const callback of this.eventListeners[event]) {
            callback(data);
        }
    }

    async handleRestartFlow() {
        try {
            const button = document.getElementById('simulateRestart');
            if (button) button.disabled = true;
            
            // Clear chat messages
            const chatMessages = getElement('chatMessages');
            // Keep only the typing indicator
            const typingIndicator = this.getOrCreateTypingIndicator();
            chatMessages.innerHTML = '';
            chatMessages.appendChild(typingIndicator);
            
            // Reset bot state
            this.currentState = BotState.INITIAL;
            this.selectedLanguage = CONFIG.DEFAULT_LANGUAGE;
            
            // Reset current flow state to prevent conflicts
            this.state.currentFlow = null;
            
            // Reset trip data to default values
            this.tripData = {
                tripId: 'FT' + Math.random().toString(36).substr(2, 9),
                driverName: 'John Doe',
                vehicleNumber: 'MH 04 AB 1234',
                origin: 'Mumbai, Maharashtra',
                destination: 'Delhi, NCR',
                location: 'Mumbai, Maharashtra',
                speed: '45',
                eta: '2 hours 30 minutes',
                distance: '100',
                duration: '45 minutes',
                consentStatus: null
            };
            
            // Reset diversion data
            this.state = {
                diversionData: {
                    isUnloading: false,
                    unloadingPoints: [],
                    currentPointIndex: 0,
                    authorizedBy: null,
                    awaitingLocation: false,
                    awaitingBags: false
                },
                currentFlow: null
            };
            
            // Reset message input placeholder
            const messageInput = getElement('messageInput');
            if (messageInput) {
                messageInput.value = '';
                messageInput.placeholder = 'Type a message...';
            }
            
            // Remove any options containers that might be visible
            const optionsContainers = document.querySelectorAll('.options-container');
            optionsContainers.forEach(container => container.remove());
            
            // Remove any alert banners that might be visible
            const alertBanners = document.querySelectorAll('.alert-banner');
            alertBanners.forEach(banner => banner.remove());
            
            // Restart the chat
            await this.showTypingIndicator();
            await this.initializeChat();
            
            if (button) button.disabled = false;
        } catch (error) {
            console.error('Error in restart flow:', error);
            this.addBotMessage(handleError(error));
            
            // Re-enable the button if there's an error
            const button = document.getElementById('simulateRestart');
            if (button) button.disabled = false;
        }
    }
}

export default WhatsAppBot; 