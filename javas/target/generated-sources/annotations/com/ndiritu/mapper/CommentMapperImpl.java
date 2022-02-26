package com.ndiritu.mapper;

import com.ndiritu.Dto.CommentDto;
import com.ndiritu.Dto.CommentDto.CommentDtoBuilder;
import com.ndiritu.Entity.Comment;
import com.ndiritu.Entity.Comment.CommentBuilder;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.User;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-02-05T23:34:55+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 16.0.1 (Oracle Corporation)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment map(CommentDto commentDto, Post post, User user) {
        if ( commentDto == null && post == null && user == null ) {
            return null;
        }

        CommentBuilder comment = Comment.builder();

        if ( commentDto != null ) {
            comment.text( commentDto.getText() );
        }
        if ( post != null ) {
            comment.post( post );
        }
        if ( user != null ) {
            comment.user( user );
        }
        comment.createdDate( java.time.Instant.now() );

        return comment.build();
    }

    @Override
    public CommentDto mapToDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentDtoBuilder commentDto = CommentDto.builder();

        commentDto.id( comment.getId() );
        commentDto.createdDate( comment.getCreatedDate() );
        commentDto.text( comment.getText() );

        commentDto.postId( comment.getPost().getId() );
        commentDto.username( comment.getUser().getUsername() );

        return commentDto.build();
    }
}
