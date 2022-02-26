package com.ndiritu.mapper;

import com.ndiritu.Dto.SubredditDto;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.Subreddit;
import com.ndiritu.Entity.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubredditMapper {


    @Mapping(target = "numberOfPosts",expression ="java(mapPosts(subreddit.getPosts()))")
    SubredditDto mapSubredditToDto(Subreddit subreddit);
  default Integer mapPosts(List<Post> numberOfPosts){
        return numberOfPosts.size();

    }

    @InheritInverseConfiguration
    @Mapping(target = "id",source = "subredditDto.id")
    @Mapping(target = "posts",ignore = true)
    @Mapping(target = "user",source = "user")
    @Mapping(target = "description",source = "subredditDto.description")
    @Mapping(target = "name",source = "subredditDto.name")
    @Mapping(target = "createdDate",expression = "java(java.time.Instant.now())")
    Subreddit  mapDtoToSubreddit(SubredditDto subredditDto,User user);
}
