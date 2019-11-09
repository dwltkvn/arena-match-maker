import React from "react"
//import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

import firebase from "../components/myfb"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import LinearProgress from "@material-ui/core/LinearProgress"
import Fade from "@material-ui/core/Fade"

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

class MAMMPage extends React.Component {
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
      stateComponentMounted: false,
    }
  }

  componentDidMount() {
    this.setState({ stateComponentMounted: true })
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      const prevUsername = localStorage.getItem("username")
      if (prevUsername) this.refUserInput.value = prevUsername

      const prevGamemode = localStorage.getItem("gamemode")
      if (prevGamemode) this.setState({ stateModeSelect: prevGamemode })
    }
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

    localStorage.setItem("username", username)
    localStorage.setItem("gamemode", mode)

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
          .on("value", snapshot => {
            if (snapshot.val() && snapshot.val().opponent) {
              if (snapshot.val().opponent.username) {
                this.setState({
                  // opponent/username valid
                  stateUserRegistered: true,
                  stateOpponentUsername: snapshot.val().opponent.username,
                  stateSearchingForOpponent: false,
                })
              } else {
                // no username
                this.setState({
                  stateUserRegistered: true,
                  stateOpponentUsername: "",
                  stateSearchingForOpponent: true,
                })
              }
            } else {
              // no opponent field
              this.setState({
                stateUserRegistered: true,
                stateOpponentUsername: "",
                stateSearchingForOpponent: true,
              })
            }
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
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    //const { classes } = this.props
    const classes = styles

    return (
      <Layout>
        <SEO title="MAMM" />
        <Fade in={true} timeout={500}>
          <Container maxWidth="sm">
            <TextField
              style={classes.input}
              id="filled-basic"
              label="Your MTGA Tag"
              margin="normal"
              variant="outlined"
              placeholder="Type your MTG Arean TAG here"
              inputRef={el => (this.refUserInput = el)}
              disabled={this.state.stateUserRegistered}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />

            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="age-native-helper">MTGA Mode</InputLabel>
              <Select
                onChange={e =>
                  this.setState({ stateModeSelect: e.target.value })
                }
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
        </Fade>
      </Layout>
    )
  }
}
export default MAMMPage
