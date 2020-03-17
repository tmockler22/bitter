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


  hande


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
                              // <Link
                              //   to={`hashtag/${tag.slice(1)}`}
                              //   className="top-tag-link"
                              // >
                              //   {tag}
                              // </Link>
                            ))}
                          </li>
                        </ul>
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