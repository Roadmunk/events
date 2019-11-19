# Protobuf Events

Generated protobuf files. 

### Install

`npm install --save @roadmunk/events`


### Build

`npm run build`

This will use docker to build and update required changes in `dist`. We _do_ commit these files so we can add a link to the github for testing.

### Testing out our changes

Create a branch with your changes and push it to github. In the repo you want to test with, update the `package.json` to point to the github URL plus branch. You may also need to remove package-lock.json to pick up any additional changes.

```
{
  "dependencies": {
    "@roadmunk/events": "git://github.com/Roadmunk/events#YOUR_BRANCH_HERE"
  }
}
```
