import React from 'react';
import { Query } from "react-apollo";
import { SEARCH_USERS, SEARCH_HASHTAGS } from "../../graphql/queries";
import { Link } from "react-router-dom";
import "./search.css"
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.update = this.update.bind(this);
    this.getResults = this.getResults.bind(this);
  }
  update(e) {
    e.preventDefault();
    this.setState({ search: e.currentTarget.value });
    this.getResults();
  }
  getResults() {
    return this.state.search ? (
      <div>
        <Query query={SEARCH_HASHTAGS} variables={{ search: this.state.search }}>
          {({ loading, error, data }) => {
            if (loading) return <div className="tag-search-list">Loading...</div>;
            if (error) return `Error! ${error.message}`;
            let tags;
            tags = data.searchHashtags;
            if (tags.length === 0) {
              return <div className="tag-search-list">No tags match your search.</div>
            } else {
              return (
                <div className="tag-search-list">
                  {tags.map(tag => <Link to={`/hashtag/${tag.tag.slice(1)}`}><p className="search-hashtag" key={tag._id}>{tag.tag}</p></Link>)}
                </div>
              )
            };
          }}
        </Query>
        <Query query={SEARCH_USERS} variables={{ search: this.state.search }}>
          {({ loading, error, data }) => {
            if (loading) return <div className="user-search-list">Loading...</div>;
            if (error) return `Error! ${error.message}`;
            let users;
            users = data.searchUsers;
            if (users.length === 0) {
              return <div className="user-search-list">No users match your search.</div>
            } else {
              return (
                <div className="user-search-list">
                  {users.map(user => <Link to={`/user/${user._id}`}>
                    <div className="search-user">
                      {user.image ? <img className="user-search-pic" src={user.image}></img> : <img className="user-search-pic" src={"/light_blue_back_guy.png"}></img>}
                      <div className="search-info" key={user._id}><p>{user.username}</p><p>{user.fullname}</p></div></div></Link>)}
                </div>
              )
            };
          }}
        </Query>
      </div>
    ) : <div></div>
  }
  render() {
    return (
      <div className="search-bar">
        <i className="fas fa-search search-glass"></i>
        <input
          className='search-input'
          placeholder='Search Bitter'
          value={this.state.search}
          onChange={(e) => this.update(e)}
        />
        {this.getResults()}
      </div>
    )
  };
};
export default Search; 