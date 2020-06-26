# Publishing an event

PubSub is an SDK into an SNS / SQS event pipeline.

`publish` requires the following environment variables to be set:

- REGION - This is the AWS region our service is operating in
- ACCOUNT - The AWS account number we are using
- DEPLOYMENT - The deployment we are part of
- SERVICE - The name of our service

When publishing events, we pass a protobuf data object and the `publish` function will figure
out which event to fire. In this way we prevent issues where an event is fired with the wrong
data type. IE: `emit('user-updated', accountUpdatedData)` which would cause issues when we 
try to deserialize the data.

#### Example

This will publish a UserUpdated event. It's important to note that there is no automatic
retry mechanism for publishing events that fail. You can and should catch any errors that occur
and log / handle them.

```
const {publish, UserUpdated} = require('@roadmunk/events');

const userUpdatedData = new UserUpdated();
userUpdatedData.setId('abcd');

publish(userUpdatedData)
	.then(() => console.log('user updated event sent successfully))
	.catch(err => console.log('Error publishing user updated event', { err }));
```
