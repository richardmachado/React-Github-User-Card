import React from "react";
import axios from "axios";
import User from "./components/User";
import Nav from "./components/layout/Nav";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "richardmachado",
      followers: ['']
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchFollowersData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.username !== this.state.username) {
      this.fetchUserData();
      this.fetchFollowersData();
    }
  }

  fetchUserData = () => {
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then(res => {
        this.setState({
          username: res.data
        });
      })
      .catch(err => console.log(err));
  };
  fetchFollowersData = () => {
    axios
      .get(`https://api.github.com/users/${this.state.username}/followers`)
      .then(res => this.setState({ followers: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Nav />
          <User
            username={this.state.username}
            followers={this.state.followers}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;