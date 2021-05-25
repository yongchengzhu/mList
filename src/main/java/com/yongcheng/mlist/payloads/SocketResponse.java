package com.yongcheng.mlist.payloads;

public class SocketResponse {

    private final String from;
    private final String text;
    private final String time;

    public SocketResponse(String from, String text, String time) {
        this.from = from;
        this.text = text;
        this.time = time;
    }

    public String getText() {
        return text;
    }

    public String getTime() {
        return time;
    }

    public String getFrom() {
        return from;
    }

}
