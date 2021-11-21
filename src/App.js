import './App.css';
import { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: "",
      tags: "",
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
  }

  onButtonClick() {
    axios.post("http://localhost:3001/posts", {
      id: `${uuidv4()}`,
      title: this.state.title,
      tags: this.state.tags
    }).then(res => {
      console.log(res);
      let newPost = res.data;
      let newData = [...this.state.data, newPost];
      this.setState({ title: '', tags: '', posts: newData });
    }).catch(err => console.log("Hata", err));
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onTagChange(event) {
    this.setState({ tags: event.target.value });
  }



  componentDidMount() {
    fetch("http://localhost:3001/posts")
      .then(resp => resp.json())
      .then(data => {
        let posts = data && data.map((post, index) => {
          return (
            <div key={index}>
              <h3>{post.title}</h3>
              <p>Tags: {post.tags}</p>
            </div>
          );
        });

        this.setState({ posts: posts });
      })

  }

  render() {
    return (
      <div className='App'>
        <div >
          {this.state.posts}
        </div>
        <form onSubmit={this.onButtonClick}>
          <input type="text" onChange={this.onTitleChange} value={this.state.title} />
          <input type="text" onChange={this.onTagChange} value={this.state.tags} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
