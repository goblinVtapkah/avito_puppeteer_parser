# The project is a system with a microservices architecture consisting of 3 microservices:

## Services:

### 1. backend/api:
🧪 Stack: Nest;
🚀Description: An API service for storing and serving parsed data.

### 2. parser:
🧪 Stack: Puppeteer;
🚀Description: Parsing chat data from Avito.

### 3. frontend:
🧪 Stack: React;
🚀Description: Displaying the parsed data.


## Start

Create a .env file in the root of the project based on example.env, updating the following variables:

- **AVITO_PHONE_NUMBER** (the phone number registered to the Avito account)
- **AVITO_PASSWORD** (the password for the Avito account)
- **ACCOUNT_NAME_FOR_CHAT_LISTEN** (the name of the account from which to listen for messages)

Then run the command:
`docker compose up --build`

On the first launch, the bot may request a verification code sent to your phone. You will need to send it via the following URL (GET request):
`http://127.0.0.1:3456/{code}`
where {code} is the code received on your phone.


## Note regarding chat listening:

Currently, the parser service listens to only one chat. It selects the first chat whose interlocutor username contains a substring matching **ACCOUNT_NAME_FOR_CHAT_LISTEN**. In the future, this functionality will be expanded to listen to all chats where the interlocutor’s username exactly matches **ACCOUNT_NAME_FOR_CHAT_LISTEN**.


## 🌐 Network
Swagger documentation:
`http://localhost:4000/api/swagger`

### 📡 API
Chats:
- `GET /api/chat` *Get all chats.*
- `GET /api/chat/:chat_id` *Get chat details and all its messages.*
- `POST /api/chat/` *Save a chat.*

Messages:
- `POST /api/message` *Add a new message.*