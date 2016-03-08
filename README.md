# The Flag Web

This is a server and client application for tracking and visualizing the score
of rounds of the game capture the flag.

The `server` component expose a JSON api with the following functionality
- registering players
- updating player status
- retrieving round status.
- creating and starting rounds.

The `client` component implements an web page
- create and start rounds
- display in-game status
- manually registering and updating players status

## Installation

Execute `npm install` in each of the folders `client` and `server`.

## Usage

Both client must be started separately with `npm start`.

## Testing

The client component have tests written in `mocha`/`chai` and are executed
with `npm run test` or `npm run watch`.
