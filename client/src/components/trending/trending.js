import React from "react";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import {FETCH_HASHTAGS} from '../../graphql/queries'
import {Link, } from 'react-router-dom';
import { currentUser } from "../../util/util";
import "./trending.css";
import Search from "../Search/Search";

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: currentUser() ? currentUser().id : null,
    };
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_HASHTAGS}>
            {({ data }) => {
              if (data) {
               let hashtag = []
               let hashtags = Object.values(data.tags);
               let sortedHashes = hashtags.sort(function(x,y){
                 return y.posts.length - x.posts.length;
               })
               for(let i = 0 ; i < sortedHashes.length; i++){
                 hashtag.push(sortedHashes[i].tag);
               }
               let topHashtags = hashtag.slice(0,3);
               let tags = Object.values(data.tags)
               let users = [];
               for (let i = 0; i < tags.length; i++) {
                 for(let j = 0; j < 1; j++){
                 if(tags[i].posts[j].user.username && tags[i].posts[j].user._id !== this.state.userId){
                   users.push(tags[i].posts[j].user)
                  }
                }
               }
               let uniqueUsers = [];
               users.forEach(user =>{
                 if(!uniqueUsers.includes(user)){

                   uniqueUsers.push(user)
                 }
               })
                 let counter = uniqueUsers.length;

                 while (counter > 0) {
                   // Pick a random index
                   let index = Math.floor(Math.random() * counter);
                   // Decrease counter by 1
                   counter--;
                   // And swap the last element with it
                   let temp = uniqueUsers[counter];
                   uniqueUsers[counter] = uniqueUsers[index];
                   uniqueUsers[index] = temp;
                 }

                let threeUniqueUsers = uniqueUsers.slice(0,4);
                return (
                  <div className="trending-container">
                    <div className="trending-scroll">
                    <Search />
                    <div className="trends-for-you-container trends-one">
                      <h1 className="trends-for-you-title">Trends For You</h1>
                      <div className="top-hash-tags-container">
                        <ul>
                          <li className="top-hash-tags">
                            {topHashtags.map(tag => (
                              <div
                                className="top-tag-link"
                                onClick={() => {
                                  if (
                                    this.props.history.location.pathname !==
                                    `/hashtag/${tag.slice(1)}`
                                  ) {
                                    this.props.history.push(
                                      `/hashtag/${tag.slice(1)}`
                                    );
                                  } else {
                                    this.props.history.push(`${tag.slice(1)}`);
                                  }
                                }}
                              >
                                {tag}
                              </div>
                            ))}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="top-users-container">
                      <div className="trends-for-you-container">
                        <h1 className="trends-for-you-title">Top Users</h1>
                        <ul>
                          {threeUniqueUsers.map((user, idx) => {
                              return (
                                <div className="top-users-wrapper">
                                <Link className="top-users-link" 
                                to={this.props.history.location.pathname.includes("/user") ? `${user._id}` : `user/${user._id}`}>
                                  <li className="top-users-username-link">
                                    <div
                                      className="post-item-profile-picture"
                                      style={{ backgroundImage: `url(${user.image})` }}></div>
                                    <div className="user-full-name">{user.fullname}
                                      <div className="top-user-username">{`@${user.username}`}</div>
                                    </div>
                                  </li>
                                </Link>
                              </div>
                              );
                            }
                          )}
                        </ul>
                        </div>
                        <div className="trends-for-you-container">
                        <h1 className="trends-for-you-title">Creators</h1>
                        <a className="top-users-link" 
                        href="https://www.linkedin.com/in/tristan-mockler-bb2360173/"
                        target="_">
                        <div className="top-users-wrapper">
                          <li className="top-users-username-link">
                                <div className="post-item-profile-picture" style={{ backgroundImage: `url(./tristan.jpeg)` }}></div>
                            <div className="user-full-name"> Tristan Mockler
                              <div className="top-user-username">tmocklercoding@gmail.com</div>
                            </div>
                          </li>
                        </div>
                        </a>
                        <a className="top-users-link"
                          href="https://www.linkedin.com/in/garon-hock-15770327/"
                          target="_">
                        <div className="top-users-wrapper">
                          <li className="top-users-username-link">
                                <div className="post-item-profile-picture" style={{ backgroundImage: `url(./garon.jpeg)` }}></div>
                            <div className="user-full-name"> Garon Hock
                              <div className="top-user-username">garonhock@gmail.com</div>
                            </div>
                          </li>
                        </div>
                        </a>
                          <a className="top-users-link"
                          href="https://www.linkedin.com/in/michael-giering-3079901a2/"
                            target="_">
                        <div className="top-users-wrapper">
                          <li className="top-users-username-link">
                                <div className="post-item-profile-picture" style={{ backgroundImage: `url(./avatar.jpg)` }}></div>
                            <div className="user-full-name"> Michael Giering
                              <div className="top-user-username">gieringmj@gmail.com</div>
                            </div>
                          </li>
                        </div>
                        </a>
                      </div>
                    </div>
                    
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}
export default Trending; 