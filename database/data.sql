insert into users
  ("userID", "username", "email", "hashedPassword")
  values
    ('1', 'user1', 'user1@email.com', 'pw1'),
    ('2', 'user2', 'user2@email.com', 'pw2');

insert into games
  ("userID", "gameID", "gameName")
  values
    ('1', '1', 'u1game1'),
    ('1', '3', 'u1game2'),
    ('2', '2', 'u2game1'),
    ('2', '4', 'u2game2');

insert into lists
  ("userID", "listID", "listName")
  values
    ('1', '1', 'u1list1-numbersD'),
    ('1', '3', 'u1list2-numbersF'),
    ('1', '5', 'u1list3-numbersS'),
    ('2', '2', 'u2list1-colorsD'),
    ('2', '4', 'u2list2-colorsF'),
    ('2', '6', 'u2list3-colorsS');

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
  ("listID", "listWordID", "word")
  values
    ('1', '1', 'eins'),
    ('1', '2', 'zwei'),
    ('1', '3', 'drei'),
    ('1', '4', 'vier'),
    ('1', '5', 'funf'),
    ('3', '6', 'un'),
    ('3', '7', 'deux'),
    ('3', '8', 'trois'),
    ('3', '9', 'quatre'),
    ('3', '10', 'cinq'),
    ('5', '11', 'uno'),
    ('5', '12', 'dos'),
    ('5', '13', 'tres'),
    ('5', '14', 'cuatro'),
    ('5', '15', 'cinco'),
    ('2', '16', 'rot'),
    ('2', '17', 'orange'),
    ('2', '18', 'gelb'),
    ('2', '19', 'grun'),
    ('2', '20', 'blau'),
    ('4', '21', 'rouge'),
    ('4', '22', 'orange'),
    ('4', '23', 'jaune'),
    ('4', '24', 'vert'),
    ('4', '25', 'bleu'),
    ('6', '26', 'rojo'),
    ('6', '27', 'anaranjado'),
    ('6', '28', 'amarillo'),
    ('6', '29', 'verde'),
    ('6', '30', 'azul');
