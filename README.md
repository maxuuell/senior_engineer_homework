## Currency Conversion Exercise

### High Level Overview
This repo contains:
- React/Typescript Frontend created with `creat-react-app`
- A Nope API with one route, `/conversion-rates`
- A job, built with Node

The entire application is hosted on Google Cloud. The React app is hosted on Google App Engine. The Node API and job are hosted on Google Cloud Run, as a Service and a Job, respectively. The API and job read and write data to a Postgres Cloud SQL instance.

The job is triggered by a scheduler (cron) that fires the first minute of every hour.

The API fetch the latest records, with a limit set by the user, or defaults to 24 (the last 24 hours).

The React app leverages Material-UI's data table to display the records, and offers a single input field to change the limit to request and display.

### App Details
All environment variables are hosted in their respective platform, either Cloud Run Job or Service.

Deployments were done with `gcloud` cli that managed building and registering the containers that would be used in Google Cloud. There are no docker files in this repo.

The entire application is open to the public internet. Nothing is authenticated. This was done for the sake of time. All of these services will be depricated after the assessment.

The db is not accessible locally, without first setting up a Google Cloud Proxy. Also skipped for the sake of time.

