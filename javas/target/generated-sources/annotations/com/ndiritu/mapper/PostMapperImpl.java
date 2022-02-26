package com.ndiritu.mapper;

import com.ndiritu.Dto.PostRequest;
import com.ndiritu.Dto.PostResponse;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.Post.PostBuilder;
import com.ndiritu.Entity.Subreddit;
import com.ndiritu.Entity.User;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-02-06T09:54:48+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 16.0.1 (Oracle Corporation)"
)
@Component
public class PostMapperImpl extends PostMapper {

    @Override
    public Post mapDtoToPost(PostRequest postRequest, Subreddit subreddit, User user) {
        if ( postRequest == null && subreddit == null && user == null ) {
            return null;
        }

        PostBuilder post = Post.builder();

        if ( postRequest != null ) {
            post.id( postRequest.getId() );
            post.description( postRequest.getDescription() );
            post.name( postRequest.getPostName() );
            post.url( postRequest.getUrl() );
        }
        if ( subreddit != null ) {
            post.subreddit( subreddit );
        }
        if ( user != null ) {
            post.user( user );
        }
        post.createdDate( java.time.Instant.now() );
        post.voteCount( 0 );

        return post.build();
    }

    @Override
    public PostResponse mapPostToDto(Post post) {
        if ( post == null ) {
            return null;
        }

        PostResponse postResponse = new PostResponse();

        postResponse.setId( post.getId() );
        postResponse.setName( post.getName() );
        postResponse.setDescription( post.getDescription() );
        postResponse.setUrl( post.getUrl() );
        postResponse.setSubreddit( postSubredditName( post ) );
        postResponse.setUsername( postUserUsername( post ) );
        postResponse.setVoteCount( post.getVoteCount() );

        postResponse.setCommentCount( commentCount(post) );
        postResponse.setDuration( getDuration(post) );

        return postResponse;
    }

    private String postSubredditName(Post post) {
        if ( post == null ) {
            return null;
        }
        Subreddit subreddit = post.getSubreddit();
        if ( subreddit == null ) {
            return null;
        }
        String name = subreddit.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String postUserUsername(Post post) {
        if ( post == null ) {
            return null;
        }
        User user = post.getUser();
        if ( user == null ) {
            return null;
        }
        String username = user.getUsername();
        if ( username == null ) {
            return null;
        }
        return username;
    }
}
