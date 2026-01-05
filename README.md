# sst-workflows

A minimal integration of Github `slash` commands, status checks, and deployment statuses with SST deployment workflows.

## Overview

This repository demonstrates how to add manual, slash-based triggers to `deploy`, `destroy`, and `staging`, allowing maintainers to manage SST deployments without requiring local AWS credentials.

> [!Note]
> This repository deploys an unmodified Next.js application to AWS via SST. No further focus will be given to the application itself.

There are three classes of workflows:
1. `deploy` (one for production, one for staging)
2. `destroy_staging`
3. `unlock_staging`

The `deploy` workflow runs automatically when a branch is created or updated. The `destroy` workflow runs automatically when a branch is closed.

### Github Marketplace

We make use of three open-source Github Actions via the Github Marketplace to facilitate `slash` based workflows.

1. [peter-evans/slash-command-dispatch](https://github.com/peter-evans/slash-command-dispatch)@v4 — for parsing slash commands and dispatching workflows
2. [myrotvorets/set-commit-status-action](https://github.com/myrotvorets/set-commit-status-action)@master — for creating non-deployment commit statuses
3. [chrnorm/deployment-action](https://github.com/chrnorm/deployment-action)@v2 — for creating deployment statuses

## Usage

There are three slash commands available in this repository.
1. `/deploy`
2. `/remove` 
3. `/unlock` 

> [!NOTE]
> Note that, although `/remove` corresponds to `destroy_staging.yml`, it is named in accordance with the SST command it triggers. 

On any open PR, the slash commands will initiate their respective workflows. 

Here is the expected sequence when using a slash command: 
1. User with `write` access submits a comment on a PR (e.g. "/remove")
2. `slash-command-dispatch` detects the comment as matching one of its enumerated commands and acknowledges with a reaction "👀"
3. `slash-command-dispatch` dispatches the workflow and confirms with a reaction "🚀"
4. The workflow begins, either creating a deployment status (`deploy`) via `deployment-action` or creating a commit status (`destroy`, `unlock`) via `set-commit-status-action`, and sets the status to pending
5. The workflow executes
6. Upon completion, both `deployment-action` and `set-commit-status-action` will update their respective statuses to either success or failure.
