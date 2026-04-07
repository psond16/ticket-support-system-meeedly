# 🚀 Support Ticket System — Meeedly Assignment

A scalable support ticket system built using React to simulate a real-world SaaS support environment.

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/psond16/ticket-support-system-meeedly
```


### 2. Install Dependencies
```bash
npm install
```
### 3. Install UI Package
```bash
npm install noplin-uis
```
### 4. Run Application
```bash
npm start
```

Open in browser:

http://localhost:3000

## 📦 Usage

### Create Ticket
1. Enter title and description
2. Submit form 
3. Ticket appears on dashboard

### Manage Tickets
1. Search and filter tickets
2. Assign tickets
3. Track status and priority

### Respond to Tickets
1. Open ticket
2. Use chat interface
3. Send messages

### Close Ticket
1. Must be assigned
2. Requires confirmation
3. Disables further actions

## 🧱 Architecture

### Ticket Model
```bash
{
  id,
  title,
  description,
  status,
  priority,
  assignedTo,
  createdAt,
  messages: []
}
```

### Message Model
```bash
{
  sender,
  text,
  image,
  time
}
```

### Component Structure
```bash
TicketCard
Navbar
Footer
Dashboard
TicketDetail
Filters
Search
```

## ⚠️ Challenges & Fixes
### Event Bubbling Issue

```bash
e.stopPropagation();
```

Fixes unintended navigation when clicking inner buttons.

### State Persistence
1. Local storage used to persist tickets
2. Prevents data loss on refresh
3. 
### UI Constraints
1. Fixed layout issues caused by UI library wrappers

### 🛡 Edge Case Handling
```bash
if (!message.trim()) return;
```
1. Prevent empty submissions
2. Handle long titles
3. Show empty states
4. Disable actions for closed tickets
5. Confirm before closing tickets

### 🔁 Ticket Flow
1. User creates ticket
2. Ticket appears on dashboard
3. Agent assigns ticket
4. Agent replies in chat
5. Ticket is resolved
6. Ticket is closed
   
## 🎥 Demo

https://youtu.be/zVthK4UKfRg

## 📝 Article

https://medium.com/@parineetsond16/beyond-crud-engineering-a-scalable-support-ticket-system-for-real-world-workflows-93761a68e548

## 👤 Author

Parineet Sond

University of Illinois Chicago

## 🙌 Acknowledgment

Thanks to Meeedly for this assignment.

Focus: scalable system design, real-world workflows, and maintainable architecture.

## 🧪 Scripts
```bash
npm start
npm run build
npm test
```
