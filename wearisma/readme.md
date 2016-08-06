# heelboy.co
## Installation
The app is already built to `index.html`, `style.css`, and `index.js`. If you want to build it yourself though, just run `npm install` and then `npm run build`. I might have missed a global dependency or two from the `package.json`, but I'm sure NPM will scream at you if I have. There's an Express server but you don't have to use that - I just used it during development.

## Testing Procedure
I've made enough dummy data that you can plug in pretty much any combination of date and time and you should have a choice of a couple of dog walkers. The date picker allows you to select any date between now and a fortnight's time. The time will let you choose any hour slot from 5am to 10pm. If you type in a postcode and hit enter, the map will centre on that location.

## Wish List
There's a few things I would have liked to do if I'd had a bit more time to spend on this.
- Have the postcode field drop in a marker for where you've selected.
- Implement a date range rather than a single selector. Unfortunately a lot of calendar pickers are really bad and I don't have time to build one.
- Do the postcodes API call without jQuery as a dependency
- Have a confirmation string at the end of the form like "I'm looking for a dog walker on 5th May at 19:00" to provide feedback.
