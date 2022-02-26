package com.ndiritu.mapper;

import com.ndiritu.Dto.SubredditDto;
import com.ndiritu.Dto.SubredditDto.SubredditDtoBuilder;
import com.ndiritu.Entity.Subreddit;
import com.ndiritu.Entity.Subreddit.SubredditBuilder;
import com.ndiritu.Entity.User;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-02-05T23:00:47+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 16.0.1 (Oracle Corporation)"
)
@Component
public class SubredditMapperImpl implements SubredditMapper {

    @Override
    public SubredditDto mapSubredditToDto(Subreddit subreddit) {
        if ( subreddit == null ) {
            return null;
        }

        SubredditDtoBuilder subredditDto = SubredditDto.builder();

        subredditDto.id( subreddit.getId() );
        subredditDto.name( subreddit.getName() );
        subredditDto.description( subreddit.getDescription() );

        subredditDto.numberOfPosts( mapPosts(subreddit.getPosts()) );

        return subredditDto.build();
    }

    @Override
    public Subreddit mapDtoToSubreddit(SubredditDto subredditDto, User user) {
        if ( subredditDto == null && user == null ) {
            return null;
        }

        SubredditBuilder subreddit = Subreddit.builder();

        if ( subredditDto != null ) {
            subreddit.id( subredditDto.getId() );
            subreddit.description( subredditDto.getDescription() );
            subreddit.name( subredditDto.getName() );
        }
        if ( user != null ) {
            subreddit.user( user );
        }
        subreddit.createdDate( java.time.Instant.now() );

        return subreddit.build();
    }
}
