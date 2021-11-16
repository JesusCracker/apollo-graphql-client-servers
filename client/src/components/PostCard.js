import React, { Component } from 'react';
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostCard = ({ post: { username, body, id, createdAt, likeCount, commentCount, likes } }) => {

    // const {post: { username, body, id, createdAt, likeCount, commentCount, likes }}=props;

    const likePost=(id)=>{

    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>{username} </Card.Header>
                <Card.Meta as={Link} to={`posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>x
            </Card.Content>

            <Card.Content extra>
                <div>
                    <Button as='div' labelPosition='right' onClick={likePost}>
                        <Button color='teal' basic>
                            <Icon name='heart'/>
                            喜欢
                        </Button>
                        <Label as='a' basic color='teal' pointing='left'>
                            {likeCount}
                        </Label>
                    </Button>
                    <Button as='div' labelPosition='right'>
                        <Button basic color='blue'>
                            <Icon name='comment'/>
                            评论
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
}

export default PostCard;