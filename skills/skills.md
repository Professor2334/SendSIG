# General skills rules
This file defines baseline engineering and product standards applied across this repository

## code organization
Readable and maintainable code is prioritized

large files are avoided .feature are organized into modules with such as 

- leads
- templates
- campaigns
- analytics
- settings
- 
## Naming conventions

- files are named in kebab-case
- components are named in PascalCase
- functions are named in camelCase
- constants are named in UPPER_SNAKE_CASE
- variables are named in camelCase


## Data Validation
Client input is treated as untrustworthy.All input is validated and sanitized before use.

Validation occurs on server side before data becomes persistent or before message is sent out to user

Phone numbers are normalized before storage 

Messaging operations include idempotency safeguards.

## Compliance enforcement
Messaging operations must respect opt-in and unsubscribe requirements.

Unsubscribe keywords are to be recognized and enforced

Duplicate messages are yet to be prevented

## User Interface rules
UI styling follows the design tokens defined in design-tokens.json

Color usage must reference tokens defined in design-tokens.css

Typography must reference tokens defined in design-tokens.css

Spacings, border, radial, shadows, will make use of Tailwind CSS utility classes.

Color and typography must reference tokens defined in design-tokens.css and not use Tailwind Css utility classes

Direct hex color code is prohibited.

Arbitrary font sizes are prohibited.All font sizes must be defined in design-tokens.css


## Product safety rules 
Large message sends must require user confirmation

Campaign execution will have controls for 
- pause
- stop
- resume
- cancel
- see progress review

## Testing expectations
Each feature included verification of 

- successful primary workflow
- invalid input behaviour
- compliance behaviour
- edge case behaviour

 