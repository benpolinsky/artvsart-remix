# Backlog

## TODO

[ ] - Mobile styles/testing

[ ] - Reproduce possible Remix v2 issues (odd styles behavior, back button causes page to throw? - could be my implementation of course)

[ ] - Add more info to art and overlay panel (creation data, medium, genre/category, maybe longer description)

[ ] - Basic stats (Most people agreed with you etc)

[ ] - Set up some lint rules - your casing is all over the place for css :)

[ ] - Way for users to add art

[ ] - suspense or preloading for image loading

[ ] - Get some high level playwright tests

[ ] - slugs for arts

[ ] - GH Actions Deploy rather than local/ lock down main once ready

[ ] - AJV JSON Validation

[ ] - Probably postgres for production over sqlite now that deployed.

[ ] - Production analytics - fly provides basic but could look at ga.

[ ] - Production uptime monitoring (seems like fly has some support)
    - Might want to ping every so often to prevent it from sleeping

[ ] - Names (battle, competition (combatant v art is okay... different roles))

[ ] - types for db art, I've been relying on prisma, but we need to establish our own boundaries

[ ] - add bulk arts rejection (or even success) report

[ ] - Decide if user auth is even needed. If we can prevent otherwise against bots maybe not.

[ ] - Basic CRUD Delete, Edit, Update

[ ] - Either prepare competition in memory or run a clean up script for unvoted competitions...

[ ] - Unit test non-components for now <- still a bit early..

[ ] - Importer using openai
    - have to add verified boolean field to art

[ ] - Importer - Figure out how to automate finding of images
    - This now seems straightforward, we'll include the medium, creator and such to try to get the best image.
    - Initially we can do the job with Promise.All, but workers would be cool.
    - Need to add copyright information and probably disclaimer in the about page.

[ ] - Form auth package documentation could be improved - they only show findCreate and no find with compare - it's unclear that salt is included etc, though they want to stay crypto-algo agnostic.

[ ] - Figure out useFetcher for battle...

[ ] - Cache Random/new user

[ ] - basic elo for art

[ ] - Stats for users

[ ] - Sentiment analysis

[ ] - Image storage instead of url links?
    - if sticking with links 
        - you absolutely need to credit 
        - add checker that ensures we can access it (cors)

[ ] - more error boundaries
        - in progress but ran into issue: https://github.com/remix-run/remix/discussions/6086

[x] - Production logging - fly provides basic logging

[x] - Main Battle
    [x] - initial implementation
    [x] - home battle but also on battle route

[x] - About Page

[x] - Info panel (description)

[x] - tolerable front styles

[x] - deploy to fly.io

[x] - Main Simple Layout

[x] - art image - try bing api so it's somewhat automated

[x] - art image - After json bulk import, automatically set a image by searching

[x] - throttle image search by a half second or something to avoid hitting free account limits (3 tps)

[x] - Root error boundary

[x] - Importer from json (fed from manual open ai to seed?)

[x] - Database Choice

[x] - Backend Layout

[x] - Auth for Admin

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
- wondering now about component styles. If styles are attached to routes, when extracting components, they won't carry their styles. I could see this be an advantage or disadvantage, but right now don't like it.
- filesystem based routes are quickly getting out of control. The inability to throw them into folders is absurd.
- deployment instructions should be in the docs. Having to use a template's Readme to see the documentation (or follow Kent's tutorial) is again inexcusable. Also need to dig through comments/gh issues to figure everything out. I understand it's a complex and customizable process, but that's only the more reason for some good documentation.

## design ideas

- keep routes thin? then you can structure your components as you please and pull them into the routes.
- with the above you have more of a chance of being able to test the app without the ui. This is big because "everything is colocated" can lead to a mess/ui coupled with logic.
- this also allows us to cleanly 'quararntine' major dependencies we may want to ditch or need to update frequently - for instance, prisma. It's nice to get started, but even getting random records calls for writing your own raw query. Might want to move to better-sqlite or a completely different db + adapter and this makes it easier to switch.
- they do have a programmatic route option which feels a bit more at home, but I'll see how file-based routing turns out first since it's recommended.

## Art v Art General Ideas

- This can be sandbox for development, p2p, whatever. It's an open enough concept.
