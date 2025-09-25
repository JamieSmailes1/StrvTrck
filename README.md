# StrvTrck
StrvTrck (Strava Tracker) is a local performance analysis tool inspired by some Strava Premium features.

Requirements
- Node.js 18.18+ (20+ LTS recommended)
- npm
- Git

# Quick start:

# Clone the repository
'git clone https://github.com/JamieSmailes1/StrvTrck.git'

'cd your-project-folder'

# Install dependencies
'npm ci' or if you’re actively developing: 'npm install'

# Set up local environment variables
'cp .env.example .env.local' then edit .env.local and set your access token value (docs on how to aquire below)

# Start the development server
'npm run dev'

# Aquiring an access token for your strava account

# Step 1 - Create a Strava app

1.  Go to https://www.strava.com/settings/api
2.	Click “Create & Manage your App”.
3.	Fill out the app name, category, and website (can be placeholder).
4.	Set Authorization Callback Domain — e.g. http://localhost:3000/exchange_token.
5.	Save → you’ll get a Client ID and Client Secret.

# Step 2 - Build your authorize URL
Open this in a browser (replace CLIENT_ID and REDIRECT_URI):

https://www.strava.com/oauth/authorize?
  client_id=CLIENT_ID&
  response_type=code&
  redirect_uri=REDIRECT_URI&
  scope=activity:read_all,profile:read_all&
  approval_prompt=auto

After you approve, Strava redirects you to:

REDIRECT_URI?code=AUTH_CODE&scope=activity:read_all,profile:read_all&state=...

Copy the code parameter — you’ll need it next.

# Step 3 - Exchange code for tokens

POST to https://www.strava.com/oauth/token.

In Postman, set:
- Method: POST
- Headers: Content-Type: application/json
- Body → Raw JSON:
  
```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "code": "AUTH_CODE_FROM_CALLBACK",
  "grant_type": "authorization_code"
}
```

Response will include:
- access_token (short-lived, ~6 hours)
- refresh_token (long-lived, keep a hold of this)
- expires_at

You now have a valid read-all access token use this in your .env.local file

# Step 4 — Refresh expired tokens

When your access_token expires, call the same endpoint with grant_type=refresh_token:

POST https://www.strava.com/oauth/token

```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "grant_type": "refresh_token",
  "refresh_token": "YOUR_REFRESH_TOKEN"
}
```

Response gives you a new access_token (and sometimes a new refresh_token).
  
