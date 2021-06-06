package com.yongcheng.mlist.constants;

import com.yongcheng.mlist.models.Website;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class WebsiteConstants {

    public static final String TENCENT = "https://ac.qq.com/Comic/searchList?search=";

    public static final String KUAIKAN = "https://www.kuaikanmanhua.com/";

    public static final String BILIBILI = "https://manga.bilibili.com/search?";

    public static final List<Website> WEBSITES = new ArrayList<>(Arrays.asList(
            new Website(
                    TENCENT,
                    "#top-search-input",
                    ".mod-search-submit",
                    ".mod_book_name > a",
                    ".works-chapter-item > a",
                    "asc"
            )/*,
            new Website(
                    BILIBILI,
                    ".search-input",
                    ".confirm-btn",
                    ".manga-title",
                    ".list-item > div[class='title']",
                    "asc"
            ),
            new Website(
                    KUAIKAN,
                    ".search",
                    ".searchBtn",
                    ".itemTitle",
                    ".title > a > span",
                    "desc"
            )*/
    ));

}
