package com.yongcheng.mlist.controllers;

import com.yongcheng.mlist.payloads.SocketRequest;
import com.yongcheng.mlist.payloads.SocketResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class ChatController {

//    @Autowired
//    private SimpMessagingTemplate simpMessagingTemplate;

//    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
//    public SocketResponse send(SocketRequest message) {
//        String time = new SimpleDateFormat("HH:mm").format(new Date());
//        return new SocketResponse(message.getFrom(), message.getText(), time);
//    }

    @MessageMapping("/chat")
    @SendToUser("/queue/messages")
    public SocketResponse send(SocketRequest message, Principal user) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        return new SocketResponse(message.getFrom(), message.getText(), time);
    }

}
