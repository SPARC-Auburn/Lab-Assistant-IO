# AssistIO Packages

Packages allow AssistIO to do just about anything. They are like the
Amazon Alexa skills.

## Required
- `ai_info.json`
  - contains two keys
    - `names`
      - Array of names your application could go by
    - `queryHandler`
      - The function in your package that recieves the query from the user.
