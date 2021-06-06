package com.yongcheng.mlist.sevices;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.WaitUntilState;
import com.yongcheng.mlist.models.Book;
import com.yongcheng.mlist.models.Website;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import static com.yongcheng.mlist.constants.WebsiteConstants.*;

public class WebCrawlerService implements Callable {
//    private final List<Book> books;
//
//    private final ConcurrentHashMap<String, Integer> updates;
//
//    public WebCrawlerService(List<Book> books, ConcurrentHashMap<String, Integer> updates) {
//        this.books = books;
//        this.updates = updates;
//    }
//
//    @Override
//    public Object call() throws Exception {
//        try (Playwright playwright = Playwright.create()) {
//            try (Browser browser = playwright.chromium().launch()) {
//                BrowserContext context = browser.newContext();
//                Page page = context.newPage();
//
//                Page.NavigateOptions navigationOptions =
//                        new Page.NavigateOptions().setWaitUntil(WaitUntilState.DOMCONTENTLOADED);
//                for (final Website website : WEBSITES) {
//                    boolean done = false;
//                    System.out.println("Navigating to: " + website.getDomain());
//                    page.navigate(website.getDomain(), navigationOptions);
//                    for (final Book book : books) {
//                        String title = book.getTitle();
//                        String chapter = book.getLastChapterRead();
//                        System.out.println("Clicking on searchbar");
//                        page.click(website.getSearchbar());
//                        System.out.println("Typing title: " + title);
//                        page.keyboard().type(title);
//                        System.out.println("Clicking on search button");
//                        page.click(website.getSearchButton());
//                        System.out.println("Waiting for search results");
//                        page.waitForLoadState(website.getLoadState());
//                        List<ElementHandle> searchResults = page.querySelectorAll(website.getSearchResults());
//                        System.out.println("Search results: " + searchResults.stream().map(ElementHandle::innerText).collect(Collectors.toList()));
//                        for (ElementHandle searchResult : searchResults) {
//                            String resultTitle = website.getDomain().equals(BILIBILI)
//                                    ? searchResult.innerText()
//                                    : searchResult.innerHTML();
//                            System.out.println("Result title: " + resultTitle);
//                            System.out.println("Title: " + title);
//                            if (resultTitle.contains(title)) {
//                                System.out.println("Clicking on search result and waiting for page to load");
//                                Page bookPage = context.waitForPage(searchResult::click);
//                                bookPage.waitForLoadState(website.getLoadState());
//                                System.out.println(bookPage.title());
//                                List<ElementHandle> chapters = bookPage.querySelectorAll(website.getChapters());
//                                System.out.println("Looking for new chapters");
//                                for (int j = chapters.size() - 1; j >= 0; --j) {
//                                    String resultChapter = chapters.get(j).innerHTML();
//                                    if (resultChapter.contains(chapter) || chapter.contains(resultChapter)) {
//                                        updates.put(title, website.getOrder().equals("desc") ? j : chapters.size() - 1 - j);
//                                        System.out.println("Result Chapter: " + resultChapter + ", Chapter: " + chapter + ", j = " + j + ", n = " + chapters.size());
//                                        System.out.println("Done");
//                                        done = true;
//                                        break;
//                                    }
//                                }
//                                bookPage.close();
//                                if (done) break;
//                            }
//                        }
//                    }
//                }
//            }
//        }
//
//        return null;
//    }

    private final String title;

    private final String chapter;

    private final ConcurrentHashMap<String, Integer> updates;

    public WebCrawlerService(String title, String chapter, ConcurrentHashMap<String, Integer> updates) {
        this.title = title;
        this.chapter = chapter;
        this.updates = updates;
    }

    @Override
    public Object call() throws Exception {
        try (Playwright playwright = Playwright.create()) {
            try (Browser browser = playwright.chromium().launch()) {
                BrowserContext context = browser.newContext();
                Page page = context.newPage();

                Page.NavigateOptions navigationOptions =
                        new Page.NavigateOptions().setWaitUntil(WaitUntilState.DOMCONTENTLOADED);
                for (final Website website : WEBSITES) {
                    boolean done = false;
                    System.out.println("Navigating to: " + website.getDomain());
                    page.navigate(website.getDomain() + this.title, navigationOptions);
//                    System.out.println("Clicking on searchbar");
//                    page.click(website.getSearchbar());
//                    System.out.println("Typing title: " + title);
//                    page.keyboard().type(title);
//                    System.out.println("Clicking on search button");
//                    page.click(website.getSearchButton());
                    System.out.println("Waiting for search results");
                    page.waitForLoadState(website.getLoadState());
                    List<ElementHandle> searchResults = page.querySelectorAll(website.getSearchResults());
                    System.out.println("Search results: " + searchResults.stream().map(ElementHandle::innerText).collect(Collectors.toList()));
                    for (ElementHandle searchResult : searchResults) {
                        String resultTitle = website.getDomain().equals(BILIBILI)
                                ? searchResult.innerText()
                                : searchResult.innerHTML();
                        System.out.println("Result title: " + resultTitle);
                        System.out.println("Title: " + title);
                        if (resultTitle.contains(title)) {
                            System.out.println("Clicking on search result and waiting for page to load");
                            Page bookPage = context.waitForPage(searchResult::click);
                            bookPage.waitForLoadState(website.getLoadState());
                            System.out.println(bookPage.title());
                            List<ElementHandle> chapters = bookPage.querySelectorAll(website.getChapters());
                            System.out.println("Looking for new chapters");
                            for (int j = chapters.size() - 1; j >= 0; --j) {
                                String resultChapter = chapters.get(j).innerHTML();
                                if (resultChapter.contains(chapter) || chapter.contains(resultChapter)) {
                                    updates.put(title, website.getOrder().equals("desc") ? j : chapters.size() - 1 - j);
                                    System.out.println("Result Chapter: " + resultChapter + ", Chapter: " + chapter + ", j = " + j + ", n = " + chapters.size());
                                    System.out.println("Done");
                                    done = true;
                                    break;
                                }
                            }
                            if (done) break;
                        }
                    }
                    if (done) break;
                }
            }
        }

        return null;
    }

}
