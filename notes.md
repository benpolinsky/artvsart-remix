# Backlog

## TODO

[ ] - Main Battle

[x] - Main Simple Layout

[ ] - Screenshots - try bing api so it's somewhat automated

[ ] - Importer using openai

[x] - Importer from json (fed from manual open ai to seed?)

[ ] - Importer - Figure out how to automate finding of images

[x] - Database Choice

[ ] - Backend Layout

[ ] - Auth for Admin

[ ] - Cache Random/new user

[ ] - slugs for arts

[ ] - some styles

[ ] - Decide if user auth is even needed. If we can prevent otherwise against bots maybe.. (the remix "stacks" have some bots handling)

[ ] - Stats for art

[ ] - basic elo for art

[ ] - Stats for users

[ ] - Sentiment analysis

### More experimental

[ ] - BYO Art (p2p)

## Remix love/hate

Some thoughts on Remix as I work through it.

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
