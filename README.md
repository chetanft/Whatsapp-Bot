# FTDriver WhatsApp Bot

A WhatsApp bot interface for the Freight Tiger Driver app that enables real-time trip tracking and communication.

## Features

- Multi-language support (English, Hindi, Telugu)
- Real-time trip tracking
- Location sharing
- Route deviation alerts
- Unloading point management
- ePOD upload functionality
- OTP verification
- Various alert types:
  - Long stoppage
  - Route deviation
  - Continuous driving
  - Night driving
  - Over speeding

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open in browser:
```
http://localhost:3000
```

## Usage

1. Select your preferred language
2. Provide location sharing consent
3. Start trip tracking
4. Use simulation buttons to test different scenarios:
   - Consent approval
   - Route deviation
   - Unloading points
   - ePOD upload
   - Various alerts

## Project Structure

```
ftdriver-whatsapp-bot/
├── index.html          # Main WhatsApp interface
├── src/
│   ├── components/    # WhatsApp bot components
│   │   └── WhatsAppBot.js
│   └── utils/        # Utility functions and configurations
│       └── config.js
└── package.json
```

## Supported Languages

- English (en)
- Hindi (hi)
- Telugu (te)

## Prerequisites

- Python 3.x (for running a local HTTP server)
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional dependencies required

## Installation & Setup

1. **Download or clone this repository**
   
   Download the ZIP file and extract it to a directory of your choice, or use Git to clone the repository:
   ```
   git clone [repository-url]
   ```

2. **Navigate to the project directory**
   
   Open a terminal/command prompt and change to the directory where you extracted the files:
   ```
   cd path/to/project
   ```

3. **Start a local HTTP server**

   Run the following command to start a Python HTTP server:
   ```
   python3 -m http.server 8004
   ```
   
   This will start a server on port 8004. If this port is already in use, you can change it to another port:
   ```
   python3 -m http.server [port-number]
   ```
   
   For Windows users who may not have Python in their PATH:
   ```
   py -3 -m http.server 8004
   ```

4. **Access the application**

   Open your web browser and navigate to:
   ```
   http://localhost:8004
   ```

5. **Stopping the server**

   To stop the server, go back to the terminal/command prompt and press `Ctrl+C`.

## Usage Instructions

1. **Language Selection**
   - Upon loading, choose your preferred language (English, Hindi, or Telugu)
   - All subsequent interactions will be in the selected language

2. **Simulation Features**
   - Use the simulation buttons in the control panel to test different scenarios
   - Click "Approaching (50KM)" to simulate nearing the delivery point
   - Click "ePOD Flow" to simulate the proof of delivery process

3. **Interactive Elements**
   - Respond to messages using the chat interface
   - Select options from the provided buttons
   - Interact with special features like location sharing and file uploads

## Troubleshooting

- **Address already in use error:**
  ```
  OSError: [Errno 48] Address already in use
  ```
  This occurs when the port is already being used. Try:
  - Using a different port number: `python3 -m http.server 8005`
  - Finding and terminating the existing process using that port
  - Restarting your computer if other solutions don't work

- **File not found errors in the console:**
  Some 404 errors for files like favicon.ico are normal and don't affect functionality.

- **Browser compatibility issues:**
  If you experience display issues, try using Chrome or Firefox for optimal compatibility.

## Project Structure

- `index.html` - Main entry point and HTML structure
- `src/components/WhatsAppBot.js` - Main bot logic and functionality
- `src/utils/config.js` - Configuration and language templates
- `public/` - Static assets (if any)
- `design-system/` - Design system components and styles

## License

This project is for demonstration purposes only.

## Contact

For any questions or support, please contact the project maintainer. 