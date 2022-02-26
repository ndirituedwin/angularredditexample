package com.ndiritu.Exceptions;

public class SubredditNotFoundException extends RuntimeException {
    public SubredditNotFoundException(String s) {
        super(s);
    }
}
