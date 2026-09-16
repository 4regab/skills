---
name: talk-to-real-people
description: Gate feature work on real conversations or a paid signal. Use when someone wants to keep building after finding existing apps, add features nobody asked for, launch on Product Hunt, or treat likes as validation. Strong-recommend 5 to 10 talks before expanding scope. Pair with find-existing-apps and why-this-is-different.
---

# Talk to Real People

Shipping is easy. Testing is the part people skip. This skill keeps the agent from spending the next week on features that have no names attached.

Strong recommend, not a hard stop. If they insist on coding, shrink the build to the wedge sentence and keep the interview list in the repo.

## When to fire

- After `find-existing-apps` and `why-this-is-different`, before a second feature
- "then we add auth / payments / AI / admin"
- launch, Product Hunt, waitlist, "validate this idea"
- "my friends said it looks cool"
- zero named users in the conversation so far

## What counts as a user talk

A talk counts when all of these are true

- a real person with the problem, not a teammate and not the agent
- they described their current workaround in their own words
- you asked what they did last time the problem happened
- you wrote notes, not vibes

A talk does not count when it is

- a like, upvote, or "looks nice"
- a parent or roommate being kind
- a survey with hypothetical 1–10 scores
- "I would use this" with no calendar time or money
- posting the idea on Reddit and calling comments research

Paid signal beats compliments. A preorder, deposit, signed letter of intent, or a calendar hold to use a hideous prototype is evidence. "Cool idea" is not.

Do not invent interviews, customers, willingness to pay, or traction. Do not contact people or publish anything without the user's authorization. Do not demand revenue proof for learning or personal tools. When demand is uncertain, propose the smallest test with a measurable success and a stop condition — label those thresholds as experiment choices, not facts.

## The 5–10 rule

Default ask

1. List 10 people who showed the problem in public (posts, complaints, support threads, "does anyone have a tool for").
2. Talk to at least 5 before adding a second surface (new platform, auth wall, AI layer).
3. After 5 talks, keep only the requests that appeared unprompted from 3+ people.

If they cannot name 10 people, they do not have a market yet. Help them find hangouts (subreddit, Discord, forum, association, shift room). Do not invent personas.

## Questions that reveal the job

Use these. Do not pitch during the first pass.

- Last time this happened, what did you do?
- What did that workaround cost you (time, money, embarrassment, risk)?
- What have you already paid for or installed to deal with it?
- If I took your current ugly fix away, what breaks this week?
- Who else gets blamed when this fails?

Write answers into a `research.md` in their project — the same file `references/outreach.md` names. Names can be first-name only. Never write into this skill's own `references` folder.

## How the agent should behave

- Before adding features, ask for the count: "How many people have you heard this from, by name?"
- If the answer is 0–2, recommend talks over code. Offer to draft outreach messages and a note template.
- If they still want to build, implement only the wedge job. No second platform. No custom admin. No extra AI.
- Distribution starts now. The 10-person list is the first launch channel.

See `references/outreach.md` for message and notes templates.

## Product Hunt and launch theater

A launch is not research. If the next request is a PH asset, changelog, or "show HN" and they have no users, say so. Help them pick 10 people to message instead of polishing OG images.

## Strong recommend

Never refuse to write code after they have seen this gate. Do refuse to silently add a feature they cannot attach to a named conversation. When they insist, tag the feature `unrequested` in the plan and keep it tiny.
