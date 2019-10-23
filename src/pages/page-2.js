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
    this.state = {
      stateUserRegistered: false,
    }
  }

  componentDidMount() {
    //window.addEvetListen("event", this.handleEvent);
    console.log("mount")
    console.log(this.state.stateUserRegistered)
    const v = firebase
      .database()
      .ref("/username/")
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val())
      })
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  /*handleEvent(event)
  {
     ...
  }*/

  register() {
    //firebase.ref
    const username = this.refUserInput.value
    const mode = this.refModeSelect.value
    const fbpath = `${mode}/${username}`
    console.log(fbpath)
    console.log(username)
    console.log(mode)
    firebase
      .database()
      .ref(fbpath)
      .set({ opponent: 0 })
      .then(() => this.setState({ stateUserRegistered: true }))
      .catch(error => this.setState({ stateUserRegistered: false }))
  }

  unregister() {
    const username = this.refUserInput.value
    const mode = this.refModeSelect.value
    const fbpath = `${mode}/${username}`
    console.log(fbpath)
    console.log(username)
    console.log(mode)
    firebase
      .database()
      .ref(fbpath)
      .set({})
      .then(() => this.setState({ stateUserRegistered: false }))
      .catch(error => this.setState({ stateUserRegistered: true }))
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
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}
export default SecondPage
