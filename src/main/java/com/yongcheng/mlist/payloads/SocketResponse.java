package com.yongcheng.mlist.payloads;

import com.yongcheng.mlist.models.Book;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class SocketResponse {

    private final String from;
    private final ConcurrentHashMap<String, Integer> text;
    private final String time;

    public SocketResponse(String from, ConcurrentHashMap<String, Integer> text, String time) {
        this.from = from;
        this.text = text;
        this.time = time;
    }

    public ConcurrentHashMap<String, Integer> getText() {
        return text;
    }

    public String getTime() {
        return time;
    }

    public String getFrom() {
        return from;
    }

}
