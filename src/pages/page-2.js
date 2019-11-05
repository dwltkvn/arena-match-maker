import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import firebase from "../components/myfb"

import { withStyles } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress"
import LinearProgress from "@material-ui/core/LinearProgress"

import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    //width: 400,
  },
  input: {
    marginLeft: 1 /*theme.spacing(1),*/,
    flex: 1,
    borderColor: "green",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}

class SecondPage extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.register = this.register.bind(this)
    this.unregister = this.unregister.bind(this)
    this.debug = this.debug.bind(this)
    this.ts = 0
    this.state = {
      stateUserRegistered: false,
      stateModeSelect: "brawl",
      stateOpponentUsername: "",
      stateSearchingForOpponent: false,
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
    //const mode = this.refModeSelect.value
    const mode = this.state.stateModeSelect
    this.ts = Date.now()
    const fbpath = `${mode}/${this.ts}`

    const obj = {
      username: username,
      opponent: null,
    }
    firebase
      .database()
      .ref(fbpath)
      .set(obj)
      .then(() => {
        //this.waitForOpponent()
        firebase
          .database()
          .ref(fbpath)
          .on(
            "value",
            snapshot =>
              (snapshot.val() &&
                snapshot.val().opponent &&
                snapshot.val().opponent.username &&
                this.setState({
                  stateOpponentUsername: snapshot.val().opponent.username,
                  stateSearchingForOpponent: false,
                })) ||
              ""
          )
        this.setState({
          stateUserRegistered: true,
          stateSearchingForOpponent: true,
        })
      })
      .catch(error => this.setState({ stateUserRegistered: false }))
  }

  unregister() {
    const mode = this.state.stateModeSelect
    const fbpath = `${mode}/${this.ts}`

    firebase
      .database()
      .ref(fbpath)
      .off()
    firebase
      .database()
      .ref(fbpath)
      .set({})
      .then(() => {
        this.setState({
          stateUserRegistered: false,
          stateOpponentUsername: "",
          stateSearchingForOpponent: false,
        })
        this.ts = 0
      })
      .catch(error =>
        this.setState({
          stateUserRegistered: true,
        })
      )
  }

  debug() {
    console.log("debug")
    console.log(this.email)
    return

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
    //const { classes } = this.props
    const classes = styles

    return (
      <Layout>
        <SEO title="Page two" />
        <Container maxWidth="sm">
          <TextField
            id="filled-basic"
            label="Your MTGA Tag"
            margin="normal"
            variant="filled"
            inputRef={el => (this.refUserInput = el)}
            disabled={this.state.stateUserRegistered}
            fullWidth
          />

          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="age-native-helper">MTGA Mode</InputLabel>
            <Select
              onChange={e => this.setState({ stateModeSelect: e.target.value })}
              disabled={this.state.stateUserRegistered}
              value={this.state.stateModeSelect}
            >
              <MenuItem value="brawl">Brawl</MenuItem>
              <MenuItem value="jank">Jank</MenuItem>
              <MenuItem value="pauper">Pauper</MenuItem>
              <MenuItem value="artisan">Artisan</MenuItem>
            </Select>
          </FormControl>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => this.register()}
              disabled={this.state.stateUserRegistered}
              color="primary"
            >
              Register
            </Button>
            <Button
              variant="contained"
              onClick={() => this.unregister()}
              disabled={!this.state.stateUserRegistered}
              color="secondary"
            >
              Unregister
            </Button>
          </Box>
          {this.state.stateSearchingForOpponent ? <LinearProgress /> : null}
          <Box style={classes.root}>
            <TextField
              style={classes.input}
              id="filled-read-only-input"
              label="Opponent MTGA Tag"
              value={this.state.stateOpponentUsername}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={false}
              variant="outlined"
            />
            {this.state.stateUserRegistered &&
            !this.state.stateSearchingForOpponent ? (
              <Button>Copy</Button>
            ) : null}
          </Box>
        </Container>
      </Layout>
    )
  }
}
export default withStyles(styles)(SecondPage)
