// Configuration
export const CONFIG = {
    TYPING_DELAY: 1000,
    MAX_MESSAGE_LENGTH: 1000,
    SUPPORTED_LANGUAGES: ['en', 'te', 'hi'],
    DEFAULT_LANGUAGE: 'en',
    TRIP_STATES: {
        NOT_STARTED: 'NOT_STARTED',
        STARTED: 'STARTED',
        IN_TRANSIT: 'IN_TRANSIT',
        STOPPED: 'STOPPED',
        APPROACHING: 'APPROACHING',
        ARRIVED: 'ARRIVED',
        COMPLETED: 'COMPLETED'
    }
};

// Message Templates for all languages
export const MessageTemplates = {
    en: {
        welcome: 'Welcome to Freight Tiger! 🚛',
        selectLanguage: 'Please select your preferred language:',
        languageSet: 'Language set to English',
        consentRequest: 'Do you consent to share your location and trip details?',
        consentAccepted: 'Thank you for your consent. Your trip will begin shortly.',
        consentRejected: 'You must provide consent to continue. Would you like to try again?',
        tripCreated: `
🚛 *New Trip Created*
Trip ID: {tripId}
Driver: {driverName}
Vehicle: {vehicleNumber}
From: {origin}
To: {destination}

Please select your preferred language to continue.`,
        tripStarted: `✅ Trip tracking started!
Trip Details:
🆔 Trip ID: {tripId}
👤 Driver: {driverName}
🚛 Vehicle: {vehicleNumber}
📍 From: {origin}
🎯 To: {destination}
⏱️ ETA: {eta}`,
        tripInProgress: "🚚 Vehicle is currently at {location}, moving at {speed} km/h. ETA: {eta}",
        longStoppage: `⚠️ *Long Stoppage Alert*
Vehicle has been stopped at {location} for {duration}.
Please select reason for stoppage or provide details.`,
        approachingDelivery: `
📍 *Approaching Delivery Point*
Distance Remaining: {distance} KM
ETA: {eta}
Delivery Location: {destination}`,
        uploadEpod: 'Please upload the ePOD document.',
        enterOtp: 'Please enter the OTP received:',
        tripCompleted: 'Trip completed successfully! Thank you for using our service. 🎉',
        diversionAlert: `⚠️ *Diversion Alert*
Vehicle has deviated from planned route.
Current Location: {location}
Please explain the reason for diversion:`,
        epodUploading: 'Uploading ePOD document... Please wait.',
        epodUploaded: 'ePOD document uploaded successfully! ✅',
        otpVerified: 'OTP verified successfully! Your delivery has been confirmed. ✅',
        selected: 'You selected: {option}',
        deviationReasonRecorded: 'Deviation reason recorded: {reason}',
        returnToRoute: 'Please return to the planned route as soon as possible.',
        processingUnloading: 'Processing unloading at {numPoints} location(s).',
        invalidAuthorizationOption: 'Invalid authorization option. Please select a valid option.',
        recordedBags: '✅ Recorded {numBags} bags at this location.',
        noUnloadingPointsRecorded: 'No unloading points recorded. Please try again.',
        buttons: {
            accept: 'Accept',
            decline: 'Decline',
            confirm: 'Confirm',
            update: 'Update',
            report: 'Report'
        },
        stoppageReasons: [
            'Lunch Break',
            'Vehicle Maintenance',
            'Traffic',
            'Rest Stop',
            'Other'
        ],
        deviationReasons: [
            'Traffic Congestion',
            'Road Construction',
            'Accident on Route',
            'Police Checkpost',
            'Weather Conditions',
            'Other'
        ],
        consentApproved: "✅ Your consent has been approved. Starting trip tracking...",
        consentPending: "⏳ Your consent is pending approval.",
        waitForApproval: "Please wait while we process your consent. This may take a few minutes.",
        consentRejected: "❌ Your consent has been rejected.",
        requestResendConsent: "Request New Consent Message",
        consentResendRequested: "✉️ We have requested to resend the consent message.",
        waitForNewConsent: "You will receive a new consent message shortly. Please check your WhatsApp messages.",
        consentResendError: "⚠️ Unable to request new consent message. Please try again later.",
        waitForConsentApproval: "Please wait for some time to get consent approval message to your phone and give the consent to that message.",
        diversionProcessHelp: "Please continue with the diversion process or type 'help' for assistance.",
        alerts: {
            longStoppage: `⚠️ *Long Stoppage Alert*
Vehicle has been stopped at {location} for {duration}.
Please select reason for stoppage or provide details.`,
            
            routeDeviation: `⚠️ *Route Deviation Alert*
Vehicle has deviated from planned route.
Current Location: {location}
Distance from route: {deviationDistance} km
Please explain the reason for deviation.`,
            
            diversion: {
                initial: `⚠️ *Route Change Alert*
Vehicle has deviated from planned route.
Current Location: {location}
Distance from route: {deviationDistance} km

Is cargo being unloaded at this location?`,
                unloadingQuery: `📦 *Unloading Confirmation*
Please indicate who authorized the unloading:
1. Consignee
2. Transporter
3. Other (Please specify)`,
                unloadingPointsQuery: "How many locations are you unloading at?",
                locationDetailsPrompt: `Please provide details for unloading point #{pointNumber}:
1. Share location
2. Enter number of bags unloaded`,
                locationReceived: "📍 Location received: {address}\nLatitude: {latitude}\nLongitude: {longitude}",
                bagsPrompt: "Enter the number of bags unloaded at this location:",
                unloadingSuccess: "✅ Unloading details successfully recorded for {numPoints} locations.",
                epodPrompt: "Please proceed with ePOD upload and OTP verification.",
                normalDeviation: `Please select the reason for deviation:
1. Traffic Jam
2. Road Block
3. Police Checkpost
4. Vehicle Issue
5. Other (Please specify)`,
                approachingDelivery50KM: `📍 *Near Delivery Point*
You are now 50 km away from the delivery location.
Current Location: {location}
Estimated Time of Arrival: {eta}
Delivery Location: {destination}

Please prepare for unloading at destination.`,
                epodOtpFlow: `📦 *Delivery Confirmation Required*
You have reached the delivery location.
Please complete the following steps to confirm delivery:
1. Upload ePOD document
2. Enter OTP received from consignee`,
                deliveryCompleted: 'Trip completed successfully! Thank you for using our service. 🎉',
                returnToRoute: 'Please return to the planned route as soon as possible.'
            },
            
            continuousDriving: `⚠️ *Continuous Driving Alert*
Driver has been driving for {duration} hours without proper rest.
Current Location: {location}
Please ensure mandatory rest break.`,
            
            nightDriving: `⚠️ *Night Driving Alert*
Vehicle is operating during restricted night hours ({time}).
Current Location: {location}
Please confirm if night driving permission is obtained.`,
            
            overSpeeding: `🚨 *Over Speeding Alert*
Vehicle Speed: {speed} km/h
Speed Limit: {speedLimit} km/h
Location: {location}
Please advise driver to maintain speed limit.`
        }
    },
    hi: {
        welcome: 'फ्रेट टाइगर में आपका स्वागत है! 🚛',
        selectLanguage: 'कृपया अपनी पसंदीदा भाषा चुनें:',
        languageSet: 'भाषा हिंदी में सेट की गई है',
        consentRequest: 'क्या आप अपना स्थान और यात्रा विवरण साझा करने के लिए सहमत हैं?',
        consentAccepted: 'आपकी सहमति के लिए धन्यवाद। आपकी यात्रा जल्द ही शुरू होगी।',
        consentRejected: 'जारी रखने के लिए आपको सहमति देनी होगी। क्या आप पुनः प्रयास करना चाहते हैं?',
        tripCreated: `🚚 *नई यात्रा बनाई गई है*
चालक: {driverName}
वाहन: {vehicleNumber}
से: {origin}
तक: {destination}
    
कृपया अपनी पसंदीदा भाषा चुनें।`,
        tripStarted: `
📦 *यात्रा शुरू की गई*
यात्रा आईडी: {tripId}
👤 चालक: {driverName}
🚛 वाहन: {vehicleNumber}
📍 से: {origin}
🎯 तक: {destination}
⏱️ अनुमानित समय: {eta}`,
        tripInProgress: "🚚 वाहन वर्तमान में {location} पर है, {speed} किमी/घंटा की गति से चल रहा है। अनुमानित समय: {eta}",
        longStoppage: `⚠️ *लंबे समय तक रुकने की चेतावनी*
वाहन {location} पर {duration} के लिए रुका हुआ है।
कृपया रुकने का कारण चुनें या विवरण प्रदान करें।`,
        approachingDelivery: `
📍 *डिलीवरी पॉइंट के पास*
शेष दूरी: {distance} किमी
अनुमानित समय: {eta}
डिलीवरी स्थान: {destination}`,
        uploadEpod: 'कृपया ePOD दस्तावेज़ अपलोड करें।',
        enterOtp: 'कृपया प्राप्त OTP दर्ज करें:',
        tripCompleted: `✅ *डिलीवरी सफलतापूर्वक पूरी हुई*
डिलीवरी पूरी करने के लिए धन्यवाद।
यात्रा आईडी: {tripId}
गंतव्य: {destination}
डिलीवरी पुष्टि स्थान: {location}

यात्रा अब पूर्ण हो गई है।`,
        diversionAlert: `⚠️ *मार्ग परिवर्तन चेतावनी*
वाहन निर्धारित मार्ग से विचलित हो गया है।
वर्तमान स्थान: {location}
मार्ग से दूरी: {deviationDistance} किमी

क्या इस स्थान पर माल उतारा जा रहा है?`,
        epodUploading: 'ePOD दस्तावेज़ अपलोड हो रहा है... कृपया प्रतीक्षा करें।',
        epodUploaded: 'ईपीओडी सफलतापूर्वक अपलोड हो गया! ✅',
        otpVerified: 'OTP सफलतापूर्वक सत्यापित! आपकी डिलीवरी की पुष्टि हो गई है। ✅',
        selected: 'आपने चुना: {option}',
        deviationReasonRecorded: 'विचलन कारण दर्ज किया गया: {reason}',
        returnToRoute: 'कृपया जल्द से जल्द नियोजित मार्ग पर वापस आएं।',
        processingUnloading: '{numPoints} स्थान(ओं) पर सामान उतारने की प्रक्रिया जारी है।',
        invalidAuthorizationOption: 'अमान्य प्राधिकरण विकल्प। कृपया एक वैध विकल्प चुनें।',
        recordedBags: '✅ इस स्थान पर {numBags} बैग दर्ज किए गए।',
        noUnloadingPointsRecorded: 'कोई अनलोडिंग पॉइंट दर्ज नहीं किया गया। कृपया पुनः प्रयास करें।',
        buttons: {
            accept: 'Accept',
            decline: 'Decline',
            confirm: 'Confirm',
            update: 'Update',
            report: 'Report'
        },
        stoppageReasons: [
            'Lunch Break',
            'Vehicle Maintenance',
            'Traffic',
            'Rest Stop',
            'Other'
        ],
        deviationReasons: [
            'Traffic Congestion',
            'Road Construction',
            'Accident on Route',
            'Police Checkpost',
            'Weather Conditions',
            'Other'
        ],
        consentApproved: "✅ आपकी सहमति को मंजूरी दे दी गई है। यात्रा ट्रैकिंग शुरू हो रही है...",
        consentPending: "⏳ आपकी सहमति अनुमोदन के लिए लंबित है।",
        waitForApproval: "कृपया अपनी सहमति के प्रसंस्करण के दौरान प्रतीक्षा करें। इसमें कुछ मिनट लग सकते हैं।",
        consentRejected: "❌ आपकी सहमति अस्वीकार कर दी गई है।",
        requestResendConsent: "नया सहमति संदेश अनुरोध करें",
        consentResendRequested: "✉️ हमने सहमति संदेश को फिर से भेजने का अनुरोध किया है।",
        waitForNewConsent: "आपको जल्द ही एक नया सहमति संदेश प्राप्त होगा। कृपया अपने WhatsApp संदेशों की जांच करें।",
        consentResendError: "⚠️ नया सहमति संदेश अनुरोध करने में असमर्थ। कृपया बाद में पुनः प्रयास करें।",
        waitForConsentApproval: "सहमति अनुमोदन संदेश प्राप्त करने के लिए कृपया कुछ समय प्रतीक्षा करें और उस संदेश को सहमति दें।",
        diversionProcessHelp: "कृपया मार्ग परिवर्तन प्रक्रिया जारी रखें या सहायता के लिए 'help' टाइप करें।",
        alerts: {
            longStoppage: `⚠️ *लंबे समय तक रुकने की चेतावनी*
वाहन {location} पर {duration} के लिए रुका हुआ है।
कृपया रुकने का कारण चुनें या विवरण प्रदान करें।`,
            
            routeDeviation: `⚠️ *मार्ग विचलन चेतावनी*
वाहन निर्धारित मार्ग से विचलित हो गया है।
वर्तमान स्थान: {location}
मार्ग से दूरी: {deviationDistance} किमी
कृपया विचलन का कारण बताएं।`,
            
            diversion: {
                initial: `⚠️ *मार्ग परिवर्तन चेतावनी*
वाहन निर्धारित मार्ग से विचलित हो गया है।
वर्तमान स्थान: {location}
मार्ग से दूरी: {deviationDistance} किमी

क्या इस स्थान पर माल उतारा जा रहा है?`,
                unloadingQuery: `📦 *अनलोडिंग पुष्टिकरण*
कृपया बताएं कि किसने अनलोडिंग के लिए अधिकृत किया:
1. कंसाइनी
2. ट्रांसपोर्टर
3. अन्य (कृपया स्पष्ट करें)`,
                unloadingPointsQuery: "आप कितने स्थानों पर माल उतार रहे हैं?",
                locationDetailsPrompt: `कृपया अनलोडिंग पॉइंट #{pointNumber} के लिए विवरण प्रदान करें:
1. स्थान साझा करें
2. उतारे गए बैग की संख्या दर्ज करें`,
                locationReceived: "📍 स्थान प्राप्त: {address}\nअक्षांश: {latitude}\nदेशांतर: {longitude}",
                bagsPrompt: "इस स्थान पर उतारे गए बैग की संख्या दर्ज करें:",
                unloadingSuccess: "✅ {numPoints} स्थानों के लिए अनलोडिंग विवरण सफलतापूर्वक दर्ज किया गया।",
                epodPrompt: "कृपया ईपीओडी अपलोड और ओटीपी सत्यापन के साथ आगे बढ़ें।",
                normalDeviation: `कृपया विचलन का कारण चुनें:
1. ट्रैफिक जाम
2. सड़क अवरोध
3. पुलिस चौकी
4. वाहन समस्या
5. अन्य (कृपया स्पष्ट करें)`,
                approachingDelivery50KM: `📍 *डिलीवरी पॉइंट के पास*
आप अब डिलीवरी स्थान से 50 किमी दूर हैं।
वर्तमान स्थान: {location}
अनुमानित पहुंचने का समय: {eta}
डिलीवरी स्थान: {destination}

कृपया गंतव्य पर उतराई की तैयारी करें।`,
                epodOtpFlow: `📦 *डिलीवरी पुष्टिकरण आवश्यक*
आप डिलीवरी स्थान पर पहुंच गए हैं।
कृपया डिलीवरी की पुष्टि के लिए निम्नलिखित चरणों को पूरा करें:
1. ईपीओडी दस्तावेज अपलोड करें
2. कंसाइनी से प्राप्त ओटीपी दर्ज करें`,
                deliveryCompleted: 'यात्रा सफलतापूर्वक पूरी हुई! हमारी सेवा का उपयोग करने के लिए धन्यवाद। 🎉',
                returnToRoute: 'कृपया जल्द से जल्द नियोजित मार्ग पर वापस आएं।'
            },
            
            continuousDriving: `⚠️ *लगातार ड्राइविंग चेतावनी*
चालक उचित आराम के बिना {duration} घंटे से ड्राइव कर रहा है।
वर्तमान स्थान: {location}
कृपया अनिवार्य आराम ब्रेक सुनिश्चित करें।`,
            
            nightDriving: `⚠️ *रात्रि ड्राइविंग चेतावनी*
वाहन प्रतिबंधित रात्रि घंटों ({time}) के दौरान चल रहा है।
वर्तमान स्थान: {location}
कृपया पुष्टि करें कि क्या रात्रि ड्राइविंग की अनुमति प्राप्त है।`,
            
            overSpeeding: `🚨 *अधिक गति चेतावनी*
वाहन की गति: {speed} किमी/घंटा
गति सीमा: {speedLimit} किमी/घंटा
स्थान: {location}
कृपया चालक को गति सीमा बनाए रखने की सलाह दें।`
        }
    },
    te: {
        welcome: 'ఫ్రైట్ టైగర్‌కి స్వాగతం! 🚛',
        selectLanguage: 'దయచేసి మీ ప్రాధాన్య భాషను ఎంచుకోండి:',
        languageSet: 'భాష తెలుగుకి సెట్ చేయబడింది',
        consentRequest: 'మీ స్థానం మరియు ప్రయాణ వివరాలను పంచుకోవడానికి మీరు అంగీకరిస్తున్నారా?',
        consentAccepted: 'మీ అంగీకారానికి ధన్యవాదాలు. మీ ప్రయాణం త్వరలో ప్రారంభమవుతుంది.',
        consentRejected: 'కొనసాగించడానికి మీరు అంగీకారం ఇవ్వాలి. మళ్లీ ప్రయత్నించాలనుకుంటున్నారా?',
        tripCreated: `
🚚 *కొత్త ప్రయాణం సృష్టించబడింది*
ప్రయాణ ID: {tripId}
డ్రైవర్: {driverName}
వాహనం: {vehicleNumber}
నుండి: {origin}
వరకు: {destination}
  
దయచేసి మీ అభిమత భాషను ఎంచుకోండి.`,
        tripStarted: `
📦 *ప్రయాణం ప్రారంభమైంది*
ప్రయాణ ID: {tripId}
👤 డ్రైవర్: {driverName}
🚛 వాహనం: {vehicleNumber}
📍 నుండి: {origin}
🎯 వరకు: {destination}
⏱️ అంచనా సమయం: {eta}`,
        tripInProgress: "🚚 వాహనం ప్రస్తుతం {location} వద్ద ఉంది, {speed} కి.మీ/గంట వేగంతో కదులుతోంది. అంచనా సమయం: {eta}",
        longStoppage: `⚠️ *దీర్ఘకాలిక ఆగిపోవడం అలర్ట్*
వాహనం {location} వద్ద {duration} నుండి ఆగి ఉంది.
దయచేసి ఆగిపోవడానికి కారణాన్ని ఎంచుకోండి లేదా వివరణ ఇవ్వండి.`,
        approachingDelivery: `
📍 *డెలివరీ పాయింట్‌కి చేరుకుంటున్నారు*
మిగిలిన దూరం: {distance} కి.మీ
అంచనా సమయం: {eta}
డెలివరీ స్థానం: {destination}`,
        uploadEpod: 'దయచేసి ePOD పత్రాన్ని అప్‌లోడ్ చేయండి.',
        enterOtp: 'దయచేసి అందుకున్న OTPని నమోదు చేయండి:',
        tripCompleted: `✅ *డెలివరీ విజయవంతంగా పూర్తయింది*
డెలివరీని పూర్తి చేసినందుకు ధన్యవాదాలు.
ప్రయాణం ID: {tripId}
గమ్యస్థానం: {destination}
డెలివరీ నిర్ధారణ స్థానం: {location}

ప్రయాణం ఇప్పుడు పూర్తి చేయబడింది.`,
        diversionAlert: `⚠️ *మార్గమార్పు అలర్ట్*
వాహనం ప్రత్యామ్నాయ మార్గాన్ని తీసుకుంటోంది.
ప్రస్తుత స్థానం: {location}
కొత్త అంచనా సమయం: {eta}
దయచేసి ఈ మార్గమార్పు అధికారికంగా అనుమతించబడిందో నిర్ధారించండి.`,
        epodUploading: 'ePOD అప్లోడ్ అవుతోంది... దయచేసి వేచి ఉండండి.',
        epodUploaded: 'ePOD అప్లోడించబడింది! ✅',
        otpVerified: 'OTP సఫలంగా ధృవీకరించబడింది! మీ డెలివరీ సఫలంగా ధృవీకరించబడింది. ✅',
        selected: 'మీరు ఎంచుకోన్నారు: {option}',
        deviationReasonRecorded: 'మార్గ విచలన కారణం నమోదు చేయబడింది: {reason}',
        returnToRoute: 'వీలైనంత త్వరగా ప్రణాళికాబద్ధ మార్గానికి తిరిగి రావాలి.',
        processingUnloading: '{numPoints} ప్రాంతాల్లో మోసుకువచ్చిన వస్తువులు దింపడం ప్రాసెస్ చేస్తోంది.',
        invalidAuthorizationOption: 'చెల్లని ప్రామాణీకరణ ఎంపిక. దయచేసి చెల్లుబాటు అయ్యే ఎంపికను ఎంచుకోండి.',
        recordedBags: '✅ ఈ ప్రాంతంలో {numBags} బ్యాగులు నమోదు చేయబడ్డాయి.',
        noUnloadingPointsRecorded: 'అన్‌లోడింగ్ పాయింట్లు ఏవీ నమోదు చేయబడలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.',
        buttons: {
            accept: 'అంగీకరించు',
            decline: 'తిరస్కరించు',
            confirm: 'నిర్ధారించు',
            update: 'నవీకరించు',
            report: 'నివేదించు'
        },
        stoppageReasons: [
            'భోజన విరామం',
            'వాహన మరమ్మతు',
            'ట్రాఫిక్',
            'విశ్రాంతి',
            'ఇతరం'
        ],
        deviationReasons: [
            'ట్రాఫిక్ రద్దీ',
            'రోడ్డు నిర్మాణం',
            'మార్గంలో ప్రమాదం',
            'పోలీస్ చెక్‌పోస్ట్',
            'వాతావరణ పరిస్థితులు',
            'ఇతరం'
        ],
        consentApproved: "✅ మీ అంగీకారం ఆమోదించబడింది. ప్రయాణ ట్రాకింగ్ ప్రారంభమవుతోంది...",
        consentPending: "⏳ మీ అంగీకారం ఆమోదం కోసం పెండింగ్‌లో ఉంది.",
        waitForApproval: "దయచేసి మీ అంగీకారాన్ని ప్రాసెస్ చేస్తున్నప్పుడు వేచి ఉండండి. ఇది కొన్ని నిమిషాలు పట్టవచ్చు.",
        consentRejected: "❌ మీ అంగీకారం తిరస్కరించబడింది.",
        requestResendConsent: "కొత్త అంగీకార సందేశాన్ని అభ్యర్థించండి",
        consentResendRequested: "✉️ మేము అంగీకార సందేశాన్ని మళ్లీ పంపమని అభ్యర్థించాము.",
        waitForNewConsent: "మీరు త్వరలో కొత్త అంగీకార సందేశాన్ని అందుకుంటారు. దయచేసి మీ WhatsApp సందేశాలను తనిఖీ చేయండి.",
        consentResendError: "⚠️ కొత్త అంగీకార సందేశాన్ని అభ్యర్థించడం సాధ్యం కాలేదు. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
        waitForConsentApproval: "మీ ఫోన్‌కి అంగీకార ఆమోదం సందేశాన్ని పొందడానికి కొంత సమయం వేచి ఉండండి మరియు ఆ సందేశానికి అంగీకారాన్ని ఇవ్వండి.",
        diversionProcessHelp: "దయచేసి మార్గమార్పు ప్రక్రియను కొనసాగించండి లేదా సహాయం కోసం 'help' టైప్ చేయండి.",
        alerts: {
            longStoppage: `⚠️ *దీర్ఘకాలిక ఆగిపోవడం అలర్ట్*
వాహనం {location} వద్ద {duration} నుండి ఆగి ఉంది.
దయచేసి ఆగిపోవడానికి కారణాన్ని ఎంచుకోండి లేదా వివరణ ఇవ్వండి.`,
            
            routeDeviation: `⚠️ *మార్గమార్పు అలర్ట్*
వాహనం ప్రణాళిక మార్గం నుండి వైకల్యం చెందింది.
ప్రస్తుత స్థానం: {location}
మార్గం నుండి దూరం: {deviationDistance} కి.మీ
దయచేసి వైకల్యానికి కారణాన్ని వివరించండి.`,
            
            diversion: {
                initial: `⚠️ *మార్గమార్పు హెచ్చరిక*
వాహనం ప్రణాళిక మార్గం నుండి వైకల్యం చెందింది.
ప్రస్తుత స్థానం: {location}
మార్గం నుండి దూరం: {deviationDistance} కి.మీ

ఈ స్థానంలో అన్‌లోడింగ్ జరుగుతోందా?`,
                unloadingQuery: `📦 *అన్‌లోడింగ్ నిర్ధారణ*
దయచేసి ఎవరు అన్‌లోడింగ్‌కి అధికారం ఇచ్చారో తెలియజేయండి:
1. కన్సైనీ
2. ట్రాన్స్‌పోర్టర్
3. ఇతరులు (దయచేసి పేర్కొనండి)`,
                unloadingPointsQuery: "మీరు ఎన్ని స్థానాలలో అన్‌లోడ్ చేస్తున్నారు?",
                locationDetailsPrompt: `దయచేసి అన్‌లోడింగ్ పాయింట్ #{pointNumber} కోసం వివరాలను అందించండి:
1. స్థానాన్ని షేర్ చేయండి
2. అన్‌లోడ్ చేసిన బ్యాగుల సంఖ్యను నమోదు చేయండి`,
                locationReceived: "📍 స్థానం స్వీకరించబడింది: {address}\nఅక్షాంశం: {latitude}\nరేఖాంశం: {longitude}",
                bagsPrompt: "ఈ స్థానంలో అన్‌లోడ్ చేసిన బ్యాగుల సంఖ్యను నమోదు చేయండి:",
                unloadingSuccess: "✅ {numPoints} స్థానాల కోసం అన్‌లోడింగ్ వివరాలు విజయవంతంగా నమోదు చేయబడ్డాయి.",
                epodPrompt: "దయచేసి ePOD అప్‌లోడ్ మరియు OTP ధృవీకరణతో కొనసాగండి.",
                normalDeviation: `దయచేసి వైకల్యానికి కారణాన్ని ఎంచుకోండి:
1. ట్రాఫిక్ రద్దీ
2. రోడ్డు అడ్డంకి
3. పోలీస్ చెక్‌పోస్ట్
4. వాహన సమస్య
5. ఇతరం (దయచేసి పేర్కొనండి)`,
                approachingDelivery50KM: `📍 *డెలివరీ పాయింట్ వద్దకు చేరుకుంటున్నారు*
మీరు ఇప్పుడు డెలివరీ స్థానానికి 50 కి.మీ దూరంలో ఉన్నారు.
ప్రస్తుత స్థానం: {location}
అంచనా చేరుకునే సమయం: {eta}
డెలివరీ స్థానం: {destination}

దయచేసి గమ్యస్థానంలో దిగుమతి కోసం సిద్ధం కండి.`,
                epodOtpFlow: `📦 *డెలివరీ నిర్ధారణ అవసరం*
మీరు డెలివరీ స్థానానికి చేరుకున్నారు.
దయచేసి డెలివరీని నిర్ధారించడానికి కింది దశలను పూర్తి చేయండి:
1. ePOD పత్రాన్ని అప్‌లోడ్ చేయండి
2. కన్సైనీ నుండి పొందిన OTPని నమోదు చేయండి`,
                deliveryCompleted: `✅ *డెలివరీ విజయవంతంగా పూర్తయింది*
డెలివరీని పూర్తి చేసినందుకు ధన్యవాదాలు.
ప్రయాణం ID: {tripId}
గమ్యస్థానం: {destination}
డెలివరీ నిర్ధారణ స్థానం: {location}

ప్రయాణం ఇప్పుడు పూర్తి చేయబడింది.`,
                returnToRoute: 'వీలైనంత త్వరగా ప్రణాళికాబద్ధ మార్గానికి తిరిగి రావాలి.'
            },
            
            continuousDriving: `⚠️ *నిరంతర డ్రాయింగ్ అలర్ట్*
డ్రైవర్ సరైన విశ్రాంతి లేకుండా {duration} గంటలు డ్రాయింగ్ చేస్తున్నారు.
ప్రస్తుత స్థానం: {location}
దయచేసి తప్పనిసరి విశ్రాంతి తీసుకోవడం నిర్ధారించండి.`,
            
            nightDriving: `⚠️ *రాత్రి డ్రాయింగ్ అలర్ట్*
వాహనం నిషేధిత రాత్రి సమయంలో ({time}) ప్రయాణిస్తోంది.
ప్రస్తుత స్థానం: {location}
దయచేసి రాత్రి డ్రాయింగ్ అనుమతి పొందబడిందో నిర్ధారించండి.`,
            
            overSpeeding: `🚨 *అధిక వేగం అలర్ట్*
వాహన వేగం: {speed} కి.మీ/గంట
వేగ పరిమితి: {speedLimit} కి.మీ/గంట
స్థానం: {location}
దయచేసి డ్రాయింగ్‌ని వేగ పరిమితులు పాటించమని సూచించండి.`
        }
    }
};

// Error Messages
export const ErrorMessages = {
    INVALID_LANGUAGE: 'Invalid language selected',
    INVALID_STATE: 'Invalid state transition',
    ELEMENT_NOT_FOUND: 'Required element not found',
    MESSAGE_TOO_LONG: 'Message exceeds maximum length',
    INVALID_TRIP_STATE: 'Invalid trip state',
    INVALID_LOCATION: 'Invalid location format',
    INVALID_OTP: 'Invalid OTP format',
    UPLOAD_FAILED: 'Document upload failed',
    NETWORK_ERROR: 'Network connection error'
};

// Bot States
export const BotState = {
    INITIAL: 'INITIAL',
    LANGUAGE_SELECTION: 'LANGUAGE_SELECTION',
    CONSENT_PENDING: 'CONSENT_PENDING',
    CONSENT_MANAGEMENT: 'CONSENT_MANAGEMENT',
    CONSENT_REJECTED: 'CONSENT_REJECTED',
    TRIP_STARTED: 'TRIP_STARTED',
    IN_TRANSIT: 'IN_TRANSIT',
    STOPPAGE_REPORTED: 'STOPPAGE_REPORTED',
    DELIVERY_APPROACHING: 'DELIVERY_APPROACHING',
    DELIVERY_CONFIRMATION: 'DELIVERY_CONFIRMATION',
    DOCUMENT_UPLOAD: 'DOCUMENT_UPLOAD',
    OTP_VERIFICATION: 'OTP_VERIFICATION',
    TRIP_COMPLETED: 'TRIP_COMPLETED'
};

// Utility Functions
export function validateMessage(message) {
    if (!message || typeof message !== 'string') {
        throw new Error('Invalid message format');
    }
    if (message.length > CONFIG.MAX_MESSAGE_LENGTH) {
        throw new Error(ErrorMessages.MESSAGE_TOO_LONG);
    }
    return message.trim();
}

export function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`${ErrorMessages.ELEMENT_NOT_FOUND}: ${id}`);
    }
    return element;
}

export function handleError(error) {
    console.error('Error:', error);
    return `⚠️ ${error.message}`;
}

export function formatMessage(template, data = {}) {
    return template.replace(/{(\w+)}/g, (match, key) => {
        return data[key] || match;
    });
} 