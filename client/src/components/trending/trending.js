import React from "react";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import {FETCH_HASHTAGS} from '../../graphql/queries'
import {Link, } from 'react-router-dom';
import "./trending.css";

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //  userId: currentUser() ? currentUser().id : null,
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
                 if(tags[i].posts[j].user.username){
                   users.push(tags[i].posts[j].user.username)
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

                // return uniqueUsers;



                return (
                  <div className="trending-container">
                    <div className="trends-for-you-container">
                      <h1 className="trends-for-you-title">Trends For You</h1>
                      <div className="top-hash-tags-container">
                        <ul>
                          <li className="top-hash-tags">
                            {topHashtags.map(tag => (
                            <div  className="top-tag-link" onClick={()=>{
                              if(this.props.history.location.pathname !== `/hashtag/${tag.slice(1)}`){
                                this.props.history.push(`/hashtag/${tag.slice(1)}`)
                              }else{
                                this.props.history.push(
                                  `${tag.slice(1)}`
                                )
                              }                             
                            }}> 
                              {tag}
                            </div>
                            ))}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <ul>
                      {uniqueUsers.map(user => {
                        return <li>{user}</li>
                      })}
                    </ul>
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