package com.yongcheng.mlist.sevices;

import javax.transaction.Transactional;

import com.yongcheng.mlist.models.Book;
import com.yongcheng.mlist.models.User;
import com.yongcheng.mlist.repositories.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class BookService {

  @Autowired
  private BookRepository bookRepository;

  public void save(Book book) {
    bookRepository.save(book);
  }

  public void update(Book book) {
    bookRepository.save(book);
  }

  public void delete(Long id) {
    bookRepository.deleteById(id);
  }

  public Iterable<Book> findAll(User user) {
    return bookRepository.findAllByUser(user);
  }

  public Book findOne(Long id) {
    return bookRepository.findById(id)
      .orElseThrow(IllegalArgumentException::new);
  }

}