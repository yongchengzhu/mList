package com.yongcheng.mlist.exceptions;

public class UsernameAlreadyExistException extends RuntimeException {

    public UsernameAlreadyExistException() {
        super();
    }

    public UsernameAlreadyExistException(final String message, final Throwable cause) {
        super(message, cause);
    }

    public UsernameAlreadyExistException(final String message) {
        super(message);
    }

    public UsernameAlreadyExistException(final Throwable cause) {
        super(cause);
    }

}
