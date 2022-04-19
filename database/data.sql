insert into users
  ("username", "email", "hashedPassword")
  values
    ('user1', 'user1@email.com', 'pw1'),
    ('user2', 'user2@email.com', 'pw2');

insert into games
  ("userID", "gameName")
  values
    ('1', 'u1game1'),
    ('1', 'u1game2'),
    ('2', 'u2game1'),
    ('2', 'u2game2');

insert into lists
  ("userID", "listName")
  values
    ('1', 'u1list1-numbersD'),
    ('1', 'u1list2-numbersF'),
    ('1', 'u1list3-numbersS'),
    ('2', 'u2list1-colorsD'),
    ('2', 'u2list2-colorsF'),
    ('2', 'u2list3-colorsS');

insert into gamelist
  ("gameID", "listID")
  values
    ('1', '1'),
    ('1', '3'),
    ('3', '3'),
    ('3', '5'),
    ('2', '2'),
    ('2', '4'),
    ('4', '4'),
    ('4', '6');

insert into listwords
  ("listID", "word")
  values
    ('1', 'eins'),
    ('1', 'zwei'),
    ('1', 'drei'),
    ('1', 'vier'),
    ('1', 'funf'),
    ('3', 'un'),
    ('3', 'deux'),
    ('3', 'trois'),
    ('3', 'quatre'),
    ('3', 'cinq'),
    ('5', 'uno'),
    ('5', 'dos'),
    ('5', 'tres'),
    ('5', 'cuatro'),
    ('5', 'cinco'),
    ('2', 'rot'),
    ('2', 'orange'),
    ('2', 'gelb'),
    ('2', 'grun'),
    ('2', 'blau'),
    ('4', 'rouge'),
    ('4', 'orange'),
    ('4', 'jaune'),
    ('4', 'vert'),
    ('4', 'bleu'),
    ('6', 'rojo'),
    ('6', 'anaranjado'),
    ('6', 'amarillo'),
    ('6', 'verde'),
    ('6', 'azul');
