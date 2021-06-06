package com.yongcheng.mlist.payloads;

import com.yongcheng.mlist.models.Book;

import java.util.List;

public class SocketRequest {

    private String from;

    private List<Book> text;

    public List<Book> getText() {
        return text;
    }

    public String getFrom() {
        return from;
    }

}
