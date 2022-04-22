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
    ('1', 'u1game3'),
    ('1', 'u1game4'),
    ('2', 'u2game1'),
    ('2', 'u2game2');

insert into lists
  ("userID", "listName")
  values
    ('1', 'u1list1-numbersD'),
    ('1', 'u1list2-numbersF'),
    ('1', 'u1list3-numbersS'),
    ('1', 'u1list4-colorsD'),
    ('1', 'u1list5-colorsF'),
    ('1', 'u1list6-colorsS'),
    ('2', 'u2list1-colorsD'),
    ('2', 'u2list2-colorsF'),
    ('2', 'u2list3-colorsS');

insert into gamelist
  ("gameID", "listID")
  values
    ('1', '1'),
    ('1', '3'),
    ('2', '2'),
    ('2', '3'),
    ('3', '4'),
    ('3', '5'),
    ('4', '5'),
    ('4', '6'),
    ('5', '4'),
    ('5', '5'),
    ('6', '5'),
    ('6', '6');

insert into listwords
  ("listID", "word")
  values
    ('1', 'eins'),
    ('1', 'zwei'),
    ('1', 'drei'),
    ('1', 'vier'),
    ('1', 'funf'),
    ('2', 'un'),
    ('2', 'deux'),
    ('2', 'trois'),
    ('2', 'quatre'),
    ('2', 'cinq'),
    ('3', 'uno'),
    ('3', 'dos'),
    ('3', 'tres'),
    ('3', 'cuatro'),
    ('3', 'cinco'),
    ('4', 'rot'),
    ('4', 'orange'),
    ('4', 'gelb'),
    ('4', 'grun'),
    ('4', 'blau'),
    ('5', 'rouge'),
    ('5', 'orange'),
    ('5', 'jaune'),
    ('5', 'vert'),
    ('5', 'bleu'),
    ('6', 'rojo'),
    ('6', 'anaranjado'),
    ('6', 'amarillo'),
    ('6', 'verde'),
    ('6', 'azul');
