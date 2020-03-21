# Newswire Condé Nast Exercise

## Getting It Started
- Create a .env in `./conde-nast/news-api-server` with the `NEWS_API_KEY` set to your key
- Run `npm i` then `npm run dev` in both `news-reader-app` and `news-api-server`
- Direct your browser to localhost:3000

## What I Would Do Next
Unfortunately I ran out of time to work on the exercise and so I didn't get to the level of polish I'd like. I've enclosed a list of next steps to show you where my head is.

### Features
- Flesh out the news list with the news source
- Give the option to sort the news by popularity/recency. The API is ready for it.
- Make the StateIndicator an icon that spins for loading and can be clicked to refresh the current query
- Pagination
- Show which articles have been clicked on/read by using storing a list of IDs in localStorage (the API creates the ID from a hash of the story object for this reason).

### Architecture
- Move styling constants like colours into a single JS object
- Refactor for a small collection of reusable styled components

### Testing
- Add snapshot tests for each component 
- Finish testing the storage module, mocking out localStorage to verify that the string serialisation is robust
- Test the service module, mocking axios (like in the API app)
- Add some component test cases where I pass junk props and expect them to throw errors 
