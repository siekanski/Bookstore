/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  siekan
 * Created: 2017-02-25
 */

CREATE TABLE IF NOT EXISTS Books (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255)  NOT NULL,
  description text,
  author varchar(255),
  PRIMARY KEY (id)
)

INSERT INTO Books (id, name, description, author) VALUES
(1, 'Harry Potter', 'czary mary', 'J.K. Rowling'),
(2, 'Wladca Pierscieni', 'o malych stworkach', 'J. R.R. Tolkien');
