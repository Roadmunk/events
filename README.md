# PubSub Events

This is the PubSub. The two functions we use are `Publish` and `On`.

### Install

`npm install --save @roadmunk/events`

### Build

`npm run build`

This will use docker to build and update required changes in `dist`. We _do_ commit these files so we can add a link to the github for testing.

### Usage

Clone the repo and run `npm run docs`. This will create the documentation and tutorials in the `docs` directory. You can 
also check out `tutorials/on-tutorial.md` or `tutorials/publish-tutorial.md`.

### Testing out our changes

Create a branch with your changes and push it to github. In the repo you want to test with, update the `package.json` to point to the github URL plus branch. You may also need to remove package-lock.json to pick up any additional changes.

```
{
  "dependencies": {
    "@roadmunk/events": "git://github.com/Roadmunk/events#YOUR_BRANCH_HERE"
  }
}
```
