import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class SecondPage extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.state = {}
  }

  componentDidMount() {
    //window.addEvetListen("event", this.handleEvent);
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  /*handleEvent(event)
  {
     ...
  }*/

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <p>Welcome to Match Maker</p>
        <div>
          <input type="text" id="text_id" placeholder="Username" />
          <div>
            <select name="mode">
              <option value="brawl">Brawl</option>
              <option value="jank">Jank</option>
              <option value="pauper">Pauper</option>
              <option value="singleton">Singleton</option>
            </select>
          </div>
          <div>
            <button type="button">Register</button>
            <button type="button">Unregister</button>
          </div>
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}
export default SecondPage
