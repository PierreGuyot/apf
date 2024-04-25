# APF

## What is APF?

APF is a small form to generate reports for anatomical pathology.

## Principles of design

TODO: principles of design (with related articles)

## How to contribute?

### Quick start

You'll need `yarn` installed: 
TODO: guide to install yarn

`yarn start`
Starts the app in development mode.

`yarn build`
Builds the app for production to the `build` folder.

`yarn clean`
Re-format the code (this should be part of a CI ideally).

`yarn tsc`
Checks the TypeScript annotations are correct. 

## Technical stack

APF is a React TypeScript web page.

@PierreGuyot picked these because:
- He's got professional experience in React TypeScript
- React declarative structure is relatively easy to onboard non-dev newcomers on the project (typically medical students)

It has no backend to make it:
- Run on any machine
- Available offline
- Easy to run for anyone

### Structure of the repository

All import code lives under `apf/src`.
Base form components (like text inputs or dropdowns) live under `apf/src/ui`.
Pages (one per form, plus some additional pages like the bibliography) live under `apf/src/pages`.
