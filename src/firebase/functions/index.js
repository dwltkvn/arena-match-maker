const functions = require("firebase-functions")

exports.matchMaker = functions.database
  .ref("/{game}/{timestamp}")
  .onCreate((snapshot, context) => {
    const currentUsername = snapshot.val().username
    const currentTS = context.params.timestamp

    /*
            Our ref is on /brawl/username.
            Move up in the path (ref.parent) to be able to acces to every username
            Filter on the first opponent=="" (empty)
            The retrieved 
        */
    return snapshot.ref.parent
      .orderByChild("opponent")
      .equalTo("")
      .limitToFirst(2)
      .once("value")
      .then(parentSnapshot => {
        const vals = parentSnapshot.val()

        if (vals === null || vals.length === 0 || vals.length === 1)
          return snapshot.ref.child("opponent").set("")

        const keys = Object.keys(vals)

        // if currentUsername corresponds to item0, them idx is 1 . otherwise idx is 0.
        const idx = currentUsername === vals[keys[0]].username ? 1 : 0
        const opponentTS = keys[idx]
        const opponentUsername = vals[opponentTS].username

        const currentObj = {
          username: currentUsername,
          timestamp: currentTS,
        }

        const opponentObj = {
          username: opponentUsername,
          timestamp: opponentTS,
        }

        return parentSnapshot.ref
          .child(opponentTS + "/opponent")
          .set(currentObj)
          .then(() => {
            return snapshot.ref.child("opponent").set(opponentObj)
          })
      })
  })
