# chat-app React Frontend Documentation

This is the front-end user interface for the real-time chat application, built with **React**, **Vite**, **Tailwind CSS (v4)**, and **Zustand** state management. It provides a minimalist, high-contrast user interface that communicates with a FastAPI Python backend via REST APIs and WebSockets.

---

## 🎨 Design System & Aesthetics

The interface is styled using a custom minimalist high-contrast theme:
* **Background Deep**: `#09090b` (Zinc-950 - Solid matte black)
* **Containers & Panels**: `#18181b` (Zinc-900 - Dark charcoal)
* **Highlights / Borders**: `#27272a` (Zinc-800)
* **Primary Accent Color**: `#f97316` (Vibrant safety orange) for active items, message checks, input focuses, and brand highlights
* **Text / Mint Color**: `#f4f4f5` (Zinc-100 - Off-white high contrast) for maximum readability
* **Typography**: Primary sans-serif font family set to `Inter`, with headers styled in `Outfit`.

---

## 🚀 Key Features

1. **Minimalist Responsive Workspace**:
   - Split-pane layout for desktop (Sidebar on the left, conversation view on the right).
   - Responsive design for mobile view: shifts views dynamically. Clicking a contact shows the chat area, and clicking the header back-arrow returns to the contact list.

2. **Real-time Messaging**:
   - Dual connection synchronization using standard WebSockets.
   - Custom routing: keeps active chat sockets running, automatically closing and opening sockets as the user switches contacts.

3. **Status Polling**:
   - Polls backend active states every 8 seconds to update contact statuses. Online users display a pulsing orange indicator dot, and offline users display a static grey indicator dot.

4. **Notification System**:
   - Intercepts incoming WebSocket payloads:
     - If the sender matches the active chat, message appends to the thread in real-time.
     - If the sender is different, increments the contact's unread badge count in the sidebar and updates the last message preview.

5. **Visual Chat Detail Ticks**:
   - Messages are grouped by date (e.g. "Today", "Yesterday").
   - Sent messages feature delivery checks: single grey tick (Sent) and double orange ticks (Read) matching database status codes.

6. **Route Guarding**:
   - Redirects unauthenticated users attempting to access `/chat` back to the login page on mount.

---

## 📂 Project Structure

```
client/src/
├── assets/             # Global assets
├── components/         # Reusable UI components
│   ├── Logo.jsx        # Branding text logo ("chat-app")
│   ├── Login.jsx       # Login form with inputs, toggles, and feedback
│   ├── Register.jsx    # Registration form with checks
│   ├── Sidebar.jsx     # Contact list, search bar, and profile footers
│   ├── ChatArea.jsx    # Message timeline, WebSocket loop, and emoji picker
│   └── WelcomeArea.jsx # Landing greeting screen shown when idle
├── store/              # Zustand state containers
│   ├── userdataStore.js   # Persisted user ID and name
│   ├── toStore.js         # Tracks active chat recipient (to_id)
│   ├── peopleDataStore.js # Persisted users contact list
│   └── chatStore.js       # Notification unread counts and last message previews
├── App.jsx             # Shell wrapper, view container, and route protection
├── index.css           # Styling directives, animation definitions, and themes
└── main.jsx            # Router and app bootstrap
```

---

## ⚙️ Configuration & Setup

### Prerequisites
Make sure the **Python backend** server is running (defaulting to `http://127.0.0.1:8000`).

### Environment Settings
Create a `.env` file in the root of the `client` directory:
```env
VITE_API_URL=http://127.0.0.1:8000
```

### Installation
Run the following commands inside the `client` folder to install dependencies and run the server:

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile production bundle
npm run build
```

---

## 🔌 WebSocket Communication Details

* **Connection URL**:
  `ws://localhost:8000/ws?from=<your_id>&to=<target_recipient_id>`
* **Outbound Message**:
  Clients send raw text over the WebSocket connection (e.g., `"Hello!"`).
* **Inbound Message**:
  Clients receive JSON payloads from the server:
  ```json
  {
    "sender_id": 2,
    "message": "Hello!"
  }
  ```
