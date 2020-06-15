# PubSub Events

This is the PubSub. The two functions we use are `Publish` and `On`.

### Install

`npm install --save @roadmunk/events`

### Build

`npm run build`

This will use docker to build and update required changes in `dist`. We _do_ commit these files so we can add a link to the github for testing.

### Usage

**Required Environment Variables**

The following environment fields are required:
 - ACCOUNT - The AWS account number you are using
 - REGION - The AWS region your service is connecting to
 - DEPLOYMENT - The deployment the service is being used for
 - SERVICE - The name of the service you are using

Copy the `.env.example` to `.env` and fill it in for local testing. 

Clone the repo and run `npm run docs`. This will create the documentation and tutorials in the `docs` directory. You can 
also check out `tutorials/on-tutorial.md` or `tutorials/publish-tutorial.md`.

### Testing out our changes

Create a branch with your changes and push it to github. In the repo you want to test with, update the `package.json` to point to the github URL plus branch. You may also need to remove package-lock.json to pick up any additional changes. If you need to iterate on changes to that branch, make sure not to use git --amend, or the new
commit may not find its way into your docker containers.

```
{
  "dependencies": {
    "@roadmunk/events": "git://github.com/Roadmunk/events#YOUR_BRANCH_HERE"
  }
}
```

### SQS Queue Convention

The PubSub `on` function subscribes to SQS Queues under the covers. These queues are managed by each individual service. We use a convention to simplify our `on` functions by naming our SQS Queues with a few parameters. 

With no Queue Group:
`https://sqs.${region}.amazonaws.com/${account}/${service}-${deployment}-${eventName}`

With a Queue Group:
`https://sqs.${region}.amazonaws.com/${account}/${service}-${deployment}-${eventName}-${queueGroup}`

Each service is expected to follow this naming convention so that we can abstract the internals away from each service. IE, Roadmapping doesn't need to know that it is subscribing to an SQS Queue, Kafka, or any other messaging client. It only needs to know that when an event is fired, it will receive that event. This should give us the option to switch messaging providers if we need to and simplifies the entire event system.