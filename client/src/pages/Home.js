import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`query getPosts{
    getPosts{
        id,
        body,
        username,
        createAt,
        likes{
            username,
        },
        likeCount,
        comments{
            id,
            username,
            #                        createAt,
            body
        },
        commentCount
    }
}`

const Home = () => {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
    // console.dir(loading);

    // return''
    return (
        <Grid columns={3}>
            <Grid.Row className={'page-title'}>
                <h1>聊天室</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>loading...</h1>
                ) : (
                    data.getPosts && data.getPosts.map((item, index) => {

                        return <Grid.Column key={item.id} style={{ marginBottom: "20px" }}>
                            <PostCard post={item}/>
                        </Grid.Column>
                    })
                )
                }
            </Grid.Row>
        </Grid>
    );
}

export default Home;