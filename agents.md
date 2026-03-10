# SendSIG - Agent coordination Document

## 1. Product Definition 
Send signal is a web application designed to manage and automate personalised whatsapp outreach to potential customers.  

The system enables businesses to import leads, organize contacts, create message templates and send personalised whatsapp messages to their leads using the whatsapp business API.

The platform also provides message trackcing, reply monitoring, and campaign analytics.

Primary user groups include:
- solo founders running marketing outreach
- educational institutions running bootcamps following up with applicants
- agencies managing outreach campaigns for clients

Core user outcomes : 
- Importing leads via csv
- Organizing and segmenting contacts 
- creating reusable message templates with placeholders
- sending personalised messages at scale
- tracking message delivery and replies
- managing conversations and follow-ups
- analyzing campaign performance 
- respecting opt-in and unsubscribe requirements  


## 2. Compliance principles
All messaging activity follows communication compliance requirements especially from the Whatsapp Business API

Key principles include : 

Opt-in requirement
Messaging must only occur for contacts with a valid opt-in or lawful communication basis 

Unsubscribe support 
The app must recognize and enforce unsubscribe keywords such as

- STOP
- UNSUBSCRIBE
- CANCEL
- END
- QUIT

Contacts marked as unsubscribed are excluded from all future messaging unless they explicitly re-opt-in.

Duplicate prevention
Campaign execution must prevent duplicate messages being sent to the same lead

Rate-limit awareness
Outbound messaging must respect platform rate limits and safe send sending intervals 

## 3. Product Scope

### Authentication and Onboarding
The onboarding flow will consist of : 
1. User Authentication
2. Whatsapp business API connection
3. CSV lead import and validation
4. Dashboard Orientation

### Lead Management
The lead database supports
- CSV import
- Phone validation
- Tagging and segmentation
- Column mapping
- Duplicate detection

lead data fields include :
- phone number (required)
- first name (optional)
- last name (optional)
- email (optional)
- tags (optional)
- custom fields (optional)
- unsubscribed (boolean)
- opt-in (boolean)

lead status include
- New
- Contacted
- Replied
- Interested
- Not Interested
- Unsubscribed
- Converted
- Bounced

### Message Templates
Templates enable reusable outreach messgaes with placeholders for dynamic content.

Templates are to be stored and reused across campaigns.

Template capabilities include :
- placeholder such as first name, last name, full name, source.
- Preview  generation using sample leads 
- Validation of placeholder usage.

### Campaign Execution
Campaign creation inclused :
- Selectiong a template
- Selecting leads and lead 
- Scheduling a send time
- Defining batch size and delay time inbetween messages 

Message delivery occurs through a server side queue system and each message will receive a delivery status which can be
- Queued
- Sending
- Sent
- Delivered
- Failed
- Unsubscribed
- Replied
- Converted
- Bounced
- Read

### Analytics
Campaign Analytics include :
- queued messages
- Sent messages
- Delivered messages
- read messages
- conversions
- replies

lead activity timeline will record communications events

### 4. Technical Guardrails

- All outbound WhatsApp communication must occur from the server-side using the WhatsApp Business API
- Frontend must never expose API credentials

## Database model
minimum database entities include : 

- users
- templates 
- Whatsapp accounts
- messages 
- leads
- campaigns
- Analytics data

### Idempotent messaging 

Campaign messaging requires idemptent behaviour.

Each message will be uniquely identified by a lead id and a campaign id. 

Repeated campaign triggers do not result in duplicate messages being sent to the same lead. 

## 5. User experience principles for lead import
Csv import behavior priortizes flexibility and validation

Features include 
- flexible column mapping
- phone number validation
- duplicate detection

Campaign confirmation screen
- total recipients

## 6. Implimentation workflow
Feature implementation should follow this sequence
1. clarify user story
2. verify compliance with product and technical guardrails
3. define data structure
4. define database schema
5. define  api endpoints
6. define frontend components
7. define backend logic
8. perform manual and automated testing


## 7. Definition of completion
A feature is considered complete when the followwing conditions are satisfied :

- the primary workflow is fully implemneted
- all edge cases are handled
- all error states are gracefully handled
- all accessibility requirements are met
- all performance requirements are met
- all security requirements are met
- all compliance requirements are met
- all userflow are tested



