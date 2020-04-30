# Protobuf Events

Generated protobuf files. 

### Install

`npm install --save @roadmunk/events`


### Build

`npm run build`

This will use docker to build and update required changes in `dist`. We _do_ commit these files so we can add a link to the github for testing.

### Testing out our changes

Run the test suite:
```
npm install
npm run test
```

Create a branch with your changes and push it to github. In the repo you want to test with, update the `package.json` to point to the github URL plus branch. You may also need to remove package-lock.json to pick up any additional changes.

```
{
  "dependencies": {
    "@roadmunk/events": "git://github.com/Roadmunk/events#YOUR_BRANCH_HERE"
  }
}
```

### Optional Fields

In proto3 all fields are technically optional. When a message is deserialized, any fields that were not set are assumed to have the [default value](https://developers.google.com/protocol-buffers/docs/proto3#default) for the field type.

To allow the message consumer to differentiate between a field not being set, and a field set too the default value, the following [wrapper types](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf) can be used:

 - `google.protobuf.BoolValue`
 - `google.protobuf.BytesValue`
 - `google.protobuf.DoubleValue`
 - `google.protobuf.FloatValue`
 - `google.protobuf.Int32Value`
 - `google.protobuf.Int64Value`
 - `google.protobuf.StringValue`
 - `google.protobuf.UInt32Value`
 - `google.protobuf.UInt64Value`

To simplify the usage of messages with these field types, all message classes exported in this library are patched such that any accessors for fields of these types behave as a field of the equivalent scalar type.

For example, given the following message:
```proto3
message MyMessage {
  string first_name = 1;
  google.protobuf.StringValue last_name = 2;
}
```

The fields could be accessed like so:
```javascript
const msg = new MyMessage();

msg.getFirstName(); // ''
msg.getLastName();  // undefined

msg.toObject();     // {
                    //  firstName : '',
                    //  lastName  : undefined,
                    // }

msg.setFirstName('Jane');
msg.setLastName('Smith');

msg.getFirstName(); // 'Jane'
msg.getLastName();  // 'Smith'

msg.toObject();     // {
                    //  firstName : 'Jane',
                    //  lastName  : 'Smith',
                    // }
```