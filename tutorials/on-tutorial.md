# Listening to an event

PubSub is an SDK into an SNS / SQS event pipeline. 

Listening to events is a two part process. First, an SQS Queue + Subscription is 
required. This will subscribe to our regional SNS Topic. All events go through a 
single SNS topic so each SQS queue applies filters to get the specific event they
want. More on this below.

Second, we need to require the `On` method out of `@roadmunk/events` and use it
to subscribe to our queue. `On` will only let us subscribe to an event _once_ per
`queueGroup`. We need a new SQS queue for each `eventName` + `queueGroup`. This
effort pays off in how we handle failures. When we read off our SQS queue, the
event is changed to invisible for a configurable amount of time. If the message
is not deleted during that time, the event becomes available to a listener again.

It's important that we follow a convention with our SQS Queues. The name of the
SQS Queue that you create should be either:

Without a queueGroup: `${service}-${deployment}-${eventName}`
With a queueGroup: `${service}-${deployment}-${eventName}-${queueGroup}`

### Create an SQS Queue and Subscription

Creating an SQS queue and subscription is a process that each service is required
to handle themselves. The suggested way is to use [terraform](https://www.terraform.io/docs/providers/aws/d/sqs_queue.html).
We need an SQS queue for every `eventName` + `queueGroup` we are listening to. This
lets every handler have a way to retry failed events independently of other handlers.

### Require `On` and listen to our SQS Queue

To listen for events we need to require our `On` method from `@roadmunk/events`. We
also need to make sure the following environment variables are set:
- REGION - This is the AWS region our service is operating in
- ACCOUNT - The AWS account number we are using
- DEPLOYMENT - The deployment we are part of
- SERVICE - The name of our service

The `On` method takes an `eventName`, a handler, and an optional object with `queueGroup`
in it. Since we use protobufs it's important we keep our them in sync with our event
names. For example, `user-updated` is the event name for `UserUpdatedMessage`. This
lets the PubSub SDK know how to deserialize events (and the event name to publish
to in the Publish section). PubSub returns the object deserialized and calls `toObject()`
on it. Let's look at some examples

#### Simple Example without queueGroup

This will listen for events from `${service}-${deployment}-${eventName}`, deserialize
the events and hand them to the handler.

```
const {On, USER_UPDATED} = require('@roadmunk/events');

On(USER_UPDATED, async (userUpdatedData) => {
	
})
```

#### Simple Example with queueGroup

This will listen for events from `${service}-${deployment}-${eventName}-${queueGroup}`,
deserialize the events and hand them to the handler.

```
const {On, USER_UPDATED} = require('@roadmunk/events');

On(USER_UPDATED, async (userUpdatedData) => {
	
}, { queueGroup: 'mongoUpdates' })
```

#### An error example

We throw an uncaught error. This will cause the PubSub SDK to log the error to `console`.
It will also allow the event to get retried. The invisible time, retry count, and 
dead letter queue are all controlled via the SQS configuration (terraform).

```
const {On, USER_UPDATED} = require('@roadmunk/events');

On(USER_UPDATED, async (userUpdatedData) => {
	throw Error('Oh snap. We should retry this event.')
})
```

#### One event, two queueGroups, one error

We can see that `A` succeeds but `B` fails. In this case `A` will be deleted from it's queue
and `B` will be retried after X amount of time. In this way we can maintain retry logic on a 
per subscription basis.

```
const {On, USER_UPDATED} = require('@roadmunk/events');

On(USER_UPDATED, async (userUpdatedData) => {
	console.log('No error here')
}, {queueGroup: 'A'})

On(USER_UPDATED, async (userUpdatedData) => {
	throw Error('Oh snap. We should retry this event.')
}, {queueGroup: 'B'})
```