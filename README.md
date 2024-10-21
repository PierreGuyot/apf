# APF

## What is APF?

APF is a collection of forms to generate reports for anatomical pathology.

## Goals

Quickly generate an anatomical pathology report in a clean, standardized format in multiple languages (FR and EN for now).

For that:

- The form should be easy to use
- The form should indicate when it has been updated last
- The form should be as up-to-date as realistically possible
- The report should be easy to read for medical practitioners that are not anatomical pathologists
- Reporting errors, feedback or requests should be easy
- Visual design should be simple and clean, with a clear visual hierarchy
- The form should work offline
- The form should be portable on any machine
- Code should be robust and automatically tested
- Behavior should be tested by hand by anatomical pathologists (domain specialists if possible)
- Information should be filled once, and only once
- Everything that can be computed automatically should be updated automatically (for instance, the total of a column)
- The form should be accessible (in the a11y sense)
- The form should be lightweight (currently under 70ko)

## Principles of design

TODO: principles of design (with related articles)

- Style is very simple, it should mostly look like a paper form
- Fields to be filled are light blue so they pop immediately, while the rest of the form is in grey to recede in the back
- Palette, font sizes, styles, etc. are limited to keep visuals consistent and unobtrusive
- The order of elements in the form is the same as the order of elements in the final report (excepted for tables that need to be moved to the end for a clean copy-paste)
- The content of the form is based on research
- A user should be able to fill the form using only the keyboard (using the `Tab` and `Return` keys)
- Wording must be consistent

## How to contribute?

### Quick start

You'll need `yarn` installed: \

`yarn start` \
Starts the app in development mode.

`yarn build` \
Builds the app for production to the `build` folder.

`yarn clean` \
Re-format the code (this should be part of a CI ideally).

`yarn tsc` \
Checks the TypeScript annotations are correct.

### Technical stack

APF is a React TypeScript web page, with no backend.

@PierreGuyot picked these because:

- He's got professional experience in React TypeScript
- React declarative structure is relatively easy to onboard non-dev newcomers on the project (typically medical students)
- The form should be available offline
- The form should be easy to run on any machine
- It doesn't prevent us to connect APF to a backend later

This means that APF doesn't store or persist any data.

### Structure of the repository

All important code lives under `apf/src`. \
Base form components (like text inputs or dropdowns) live under `apf/src/ui`. \
Pages live under `apf/src/pages`.

## Roadmap

TODO: roadmap
