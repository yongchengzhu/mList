package com.yongcheng.mlist.controllers;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import com.yongcheng.mlist.payloads.SocketRequest;
import com.yongcheng.mlist.payloads.SocketResponse;
import com.yongcheng.mlist.sevices.WebCrawlerService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.*;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendToUser("/queue/messages")
    public SocketResponse send(SocketRequest message, Principal user) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());

        ConcurrentHashMap<String, Integer> response = new ConcurrentHashMap<>();
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        CompletionService<Integer> executorCompletionService= new ExecutorCompletionService<>(executorService);
        List<Future<Integer>> futures = new ArrayList<>();
//        futures.add(executorCompletionService.submit(new WebCrawlerService(message.getText(), response)));
        message.getText().forEach(book -> {
            futures.add(executorCompletionService.submit(new WebCrawlerService(book.getTitle(), book.getLastChapterRead(), response)));
        });
        for (int i=0; i<futures.size(); i++) {
            try {
                Integer result = executorCompletionService.take().get();
                System.out.println("Done: " + i + ", " + result);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        executorService.shutdown();

        return new SocketResponse(message.getFrom(), response, time);
    }

}
