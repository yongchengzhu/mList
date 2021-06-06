package com.yongcheng.mlist.models;

import com.microsoft.playwright.options.LoadState;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static com.yongcheng.mlist.constants.WebsiteConstants.BILIBILI;

public class Website {

    public static final Set<String> SPA_DOMAINS = new HashSet<>(Collections.singletonList(
            BILIBILI
    ));

    private final String domain;

    private final String searchbar;

    private final String searchButton;

    private final String searchResults;

    private final String chapters;

    private final String order;

    private final LoadState loadState;

    public Website(
            String domain,
            String searchbar,
            String searchButton,
            String searchResults,
            String chapters,
            String order
    ) {
        this.domain = domain;
        this.searchbar = searchbar;
        this.searchButton = searchButton;
        this.searchResults = searchResults;
        this.chapters = chapters;
        this.order = order;
        this.loadState = SPA_DOMAINS.contains(domain)? LoadState.LOAD : LoadState.DOMCONTENTLOADED;
    }

    public String getDomain() {
        return domain;
    }

    public String getSearchbar() {
        return searchbar;
    }

    public String getSearchButton() {
        return searchButton;
    }

    public String getSearchResults() {
        return searchResults;
    }

    public String getChapters() {
        return chapters;
    }

    public String getOrder() {
        return order;
    }

    public LoadState getLoadState() { return loadState; }

}
