package com.yongcheng.mlist.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.yongcheng.mlist.models.Book;
import com.yongcheng.mlist.payloads.CreateBookRequest;
import com.yongcheng.mlist.payloads.UpdateBookRequest;
import com.yongcheng.mlist.sevices.BookService;
import com.yongcheng.mlist.sevices.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/book")
public class BookController {

  @Autowired
  private BookService bookService;

  @Autowired
  private UserService userService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  private void createBook(@RequestBody @Valid CreateBookRequest body, Principal principal, HttpServletResponse res, UriComponentsBuilder uriBuilder) {
    Book book = new Book(
      body.getTitle(), 
      body.getAuthor(), 
      body.getCover(), 
      body.getLastChapterRead(),
      body.getRating(), 
      body.getLastReadDate(),
      body.getStatus(),
      body.getDaysToWait(),
      userService.getUser(principal.getName())
    );

    final String baseURL = uriBuilder.path("").toUriString();

    bookService.save(book);

    res.addHeader("Location", baseURL + "/api/book" + book.getId());
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  private void updateBook(
    @RequestBody @Valid UpdateBookRequest body, @PathVariable Long id, Principal principal) {
    // Todos:
    // - Check if body.getId() == id.
    // - Check if id exists in Book table.
    
    Book book = new Book(
      body.getId(),
      body.getTitle(), 
      body.getAuthor(), 
      body.getCover(), 
      body.getLastChapterRead(),
      body.getRating(), 
      body.getLastReadDate(),
      body.getStatus(),
      body.getDaysToWait(),
      userService.getUser(principal.getName())
    );

    bookService.update(book);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  private void deleteBook(@PathVariable Long id) {
    bookService.delete(id);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public Iterable<Book> findAllBooks() {
    return bookService.findAll();
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public Book findOneBook(@PathVariable Long id) {
    return bookService.findOne(id);
  }

}