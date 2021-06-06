package com.yongcheng.mlist.components;

import com.microsoft.playwright.Playwright;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class StartupApplicationListener implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        Playwright playwright = Playwright.create();
        playwright.close();
    }

}
