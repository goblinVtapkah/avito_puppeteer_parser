<h1>The project is a system with a microservices architecture consisting of 3 microservices:</h1>
1. Service: backend/api;
	Stack: Nest;
	Description: An API service for storing and serving parsed data.

2. Service: parser;
	Stack: Puppeteer;
	Description: Parsing chat data from Avito.

3. Service: frontend;
	Stack: React;
	Description: Displaying the parsed data.