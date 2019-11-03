import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import firebase from "../components/myfb"

class SecondPage extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.register = this.register.bind(this)
    this.unregister = this.unregister.bind(this)
    this.debug = this.debug.bind(this)
    this.state = {
      stateUserRegistered: false,
    }
  }

  componentDidMount() {
    /* ... */
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  register() {
    const username = this.refUserInput.value
    const mode = this.refModeSelect.value
    const fbpath = `${mode}/${username}`

    firebase
      .database()
      .ref(fbpath)
      .set({ opponent: "" })
      .then(() => {
        //this.waitForOpponent()
        firebase
          .database()
          .ref(fbpath + "/opponent/")
          .on(
            "value",
            snapshot => (this.refOpponentInput.value = snapshot.val())
          )
        this.setState({ stateUserRegistered: true })
      })
      .catch(error => this.setState({ stateUserRegistered: false }))
  }

  unregister() {
    const username = this.refUserInput.value
    const mode = this.refModeSelect.value
    const fbpath = `${mode}/${username}`

    firebase
      .database()
      .ref(fbpath + "/opponent/")
      .off()
    firebase
      .database()
      .ref(fbpath)
      .set({})
      .then(() => {
        this.setState({ stateUserRegistered: false })
        this.refOpponentInput.value = ""
      })
      .catch(error => this.setState({ stateUserRegistered: true }))
  }

  debug() {
    console.log("debug")

    const username = this.refUserInput.value
    const mode = this.refModeSelect.value
    const fbpath = `${mode}/${username}`

    firebase
      .database()
      .ref(fbpath)
      .once("value")
      .then(snapshot => {
        //const v = snapshot.val()
        //const v = snapshot
        //console.log(v)
        //console.log(v.ref.parent)
        //snapshot.ref.parent.once("value").then(snap => {
        snapshot.ref.parent
          .orderByChild("opponent")
          .equalTo("")
          .limitToFirst(1)
          .once("value")
          .then(snap => {
            const vals = snap.val()
            const keys = Object.keys(vals)
            const max = keys.length
            const r = Math.floor(Math.random() * Math.floor(max))

            console.log(vals)
            //console.log(r, keys[r])
          })
        //console.log(v.ref.parent)
      })
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <p>Welcome to Match Maker</p>
        <div>
          <input
            type="text"
            id="text_id"
            placeholder="Username"
            ref={input => (this.refUserInput = input)}
            disabled={this.state.stateUserRegistered}
          />
          <div>
            <select
              name="mode"
              ref={select => (this.refModeSelect = select)}
              disabled={this.state.stateUserRegistered}
            >
              <option value="brawl">Brawl</option>
              <option value="jank">Jank</option>
              <option value="pauper">Pauper</option>
              <option value="singleton">Singleton</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={() => this.register()}
              disabled={this.state.stateUserRegistered}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => this.unregister()}
              disabled={!this.state.stateUserRegistered}
            >
              Unregister
            </button>
          </div>
          <input
            type="text"
            id="text_id"
            placeholder="OpponentName"
            ref={input => (this.refOpponentInput = input)}
            disabled={true}
          />
          <button type="button" onClick={() => this.debug()}>
            Debug
          </button>
        </div>
        <Link to="/">Go back to the homepage1</Link>
      </Layout>
    )
  }
}
export default SecondPage
