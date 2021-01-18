package com.yongcheng.mlist.repositories;

import com.yongcheng.mlist.models.Book;

import com.yongcheng.mlist.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Iterable<Book> findAllByUser(User user);

}