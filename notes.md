# Backlog

## TODO

[ ] - Main Battle
    [x] - initial implementation

[ ] - Names (battle, competition (combatant v art is okay... different roles))

[ ] - types for db art

[x] - Main Simple Layout

[x] - art image - try bing api so it's somewhat automated

[x] - art image - After json bulk import, automatically set a image by searching

[x] - throttle image search by a half second or something to avoid hitting free account limits (3 tps)

[ ] - Basic CRUD Delete, Edit, Update

[ ] - Get some high level playwright tests

[ ] - Unit test non-components for now.

[ ] - Importer using openai
    - have to add verified boolean field to art 

[x] - Importer from json (fed from manual open ai to seed?)

[ ] - Importer - Figure out how to automate finding of images
    - This now seems straightforward, we'll include the medium, creator and such to try to get the best image.
    - Initially we can do the job with Promise.All, but workers would be cool.
    - Need to add copyright information and probably disclaimer in the about page.

[ ] - AJV JSON Validation

[x] - Database Choice

[x] - Backend Layout

[ ] - deploy somewhere

[ ] - Auth for Admin

[ ] - Cache Random/new user

[ ] - slugs for arts

[ ] - some styles

[ ] - Decide if user auth is even needed. If we can prevent otherwise against bots maybe..

[ ] - Stats for art

[ ] - basic elo for art

[ ] - Stats for users

[ ] - Sentiment analysis

[ ] - Image storage instead of url links?

### More experimental

[ ] - BYO Art (p2p)

## Remix love/hate

Some thoughts on Remix as I work through it.
V2 Project -> https://github.com/orgs/remix-run/projects/14

### love

- In general, it's much more enjoyable to write than 'vanilla' React.
- nice readable error messages with common sense solutions - missing file.. asks to make it external to bundle perhaps...
- kind of like the css scoping instead of css modules...
- very rapid development
- I like the idea of just exporting functions which will act as callbacks instead of importing a remix function which contains a callback you implement.
- the loader function makes sense.
- obviously the gains in performance and perceived performance

### hate

- the hand waving away of csrf tokens!
[https://github.com/remix-run/remix/discussions/2906](GH Discussion)
- the 'stacks' are too much.

## design ideas

- keep routes thin? then you can structure your components as you please and pull them into the routes.
- with the above you have more of a chance of being able to test the app without the ui. This is big because "everything is colocated" can lead to a mess/ui coupled with logic.
- this also allows us to cleanly 'quararntine' major dependencies we may want to ditch or need to update frequently - for instance, prisma. It's nice to get started, but even getting random records calls for writing your own raw query. Might want to move to better-sqlite or a completely different db + adapter and this makes it easier to switch.
- they do have a programmatic route option which feels a bit more at home, but I'll see how file-based routing turns out first since it's recommended.

## Art v Art General Ideas

- This can be sandbox for development, p2p, whatever. It's an open enough concept.
