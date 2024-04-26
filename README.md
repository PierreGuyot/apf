# APF

## What is APF?

APF is a small form to generate reports for anatomical pathology.

## Goals

Generate quickly an anatomical pathology report in a clean, standardized format.

For that:
- The form should be easy to use
- The form should indicate when it has been updated last
- The form should be as up-to-date as realistically possible
- The report should be easy to read for practitioners that are not anatomical pathologists
- Reporting error or feedback should be easy
- Visual design should be simple and clean, with a clear visual hierarchy
- The form should work offline
- The form should be portable on any machine
- Code should be robust and automatically tested
- Information should be filled once, and only once
- Everything that can be computed automatically should be updated automatically (for instance, the total of a column)


## Principles of design

TODO: principles of design (with related articles)

## How to contribute?

### Quick start

You'll need `yarn` installed: \
TODO: guide to install yarn

`yarn start` \
Starts the app in development mode.

`yarn build` \
Builds the app for production to the `build` folder.

`yarn clean` \
Re-format the code (this should be part of a CI ideally).

`yarn tsc` \
Checks the TypeScript annotations are correct.

### Technical stack

APF is a React TypeScript web page.

@PierreGuyot picked these because:

- He's got professional experience in React TypeScript
- React declarative structure is relatively easy to onboard non-dev newcomers on the project (typically medical students)

It has no backend to make it:

- Run on any machine
- Available offline
- Easy to run for anyone

### Structure of the repository

All important code lives under `apf/src`. \
Base form components (like text inputs or dropdowns) live under `apf/src/ui`. \
Pages (one per form, plus some additional pages like the bibliography) live under `apf/src/pages`.

## Roadmap

TODO: roadmap
