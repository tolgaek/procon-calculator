# PROCON Calculator

Simple implementation of Producer Consumer model using HTTP to communicate between the producer and consumer in Node.js


## Messages
Messages are randomly generated to follow a simple aritmethic expressions in the form of `{{Number}}{{Operator}}{{Number}}=`
Supported Operators are `*`, `+`, `-`, `/`

Example `12+3=`

## Requirements

- node.js
- npm

## Structure

This repo is broken down into two sections:

- **generator**: Acts as the **Producer** generating arithmetic operations and sending them over HTTP to the Consumer to get them evaluated. It's capable of creating multiple producers.
- **evaluator**: Acts as the **Consumer** listening for incoming messages over HTTP to evaluate and respond with

First, **evaluator** has to be started for it to listen incoming messages. Then **generator** can be started with an arbitrary number of producers to start generating and sending them to evaluator

**NOTE:** Each evaluator and generator folders are separate node projects and are implemented as such

## Usage
### Evaluator

While in the `/evaluator` folder, run 
`$ npm install` to install the dependencies
`$ npm start` to start the server.

#### Environment Variables

- `NODE_HTTP_PORT`: `Default: 3000` - Specifies the port to run the server on.

- To start the server on any port other than 3000 `$ NODE_HTTP_PORT=4000 npm start`

### Generator

While in the `/generator` folder, run
`$ npm install` to install the dependencies
`$ npm start` to start the server.

#### Environment Variables

- `EVALUATOR_URL`: `Default: http://localhost:3000` - Fully qualified URL for the evaluator
- `NUMBER_OF_PRODUCERS`: `Default: 2` - Generator can spin up multiple producers which send messages to evaluator
- `INTERVAL_MILLISECONDS`: `Default: 1000` - Determines how often each producer produce a message
- `MAX_VALUE`: `Default: 1000` - Maximum (exclusive) integer value when generating random arithmetic expressions
- `MIN_VALUE`: `Default: -1000` - Minimum (inclusive) integer value when generating random arithmetic expressions

## Tests

Tests for both projects can be run by using `$ npm test` in their respective folders
