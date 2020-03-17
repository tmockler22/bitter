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
                return (
                  <ul>
                  <li className='top-hash-tags'>{topHashtags.map(tag => <Link to={`hashtag/${tag.slice(1)}`}>{tag}</Link>)}</li>
                  </ul>
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