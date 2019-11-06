import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends
  };

  findFriendandIncrement = (id, a) => {
    for (let i = 0; i <a.length; i++) {
      if (a[i].id === id) {
        if (a[i].count === 0) {
          a[i].count++;
        } else if (a[i].count === 1) {
          alert("you clicked the image twice, try again")
          this.resetGame(a)

        }

      }

    }
    return a;
  }

  resetGame = (a) => {
    for (let i = 0; i <a.length; i++)  {
      a[i].count = 0
    }
    return a;
  }

  checkForWin = (a) => {
    let howManyOnes = 0;
    for (let i = 0; i <a.length; i++) {
      if (a[i].count === 1) {
        howManyOnes++;
      }
    }
    if (howManyOnes === a.length) {
      alert("you win! try again")
      this.resetGame(a)

    }
  }

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = shuffle(this.state.friends);
    this.findFriendandIncrement(id, friends)
    this.checkForWin(friends)
    console.log(friends)
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Click on an image to remove</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
