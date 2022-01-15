const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const personsGraphQL = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    _id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
]

const users100 = [
  {
    username: 'Crawford_Renner',
    name: 'Pat Skiles',
    password: 'BFL7a9ZKSQlmS10',
  },
  {
    username: 'Timothy.Kemmer29',
    name: 'Tatum Schumm',
    password: 'elbyPgElOd3dREr',
  },
  {
    username: 'Mitchel.Lubowitz',
    name: 'Jevon Zieme',
    password: '7zBiGXeBXrWmn9C',
  },
  {
    username: 'Pearline_Kemmer11',
    name: 'Audreanne Koch',
    password: 'YY8NzoOQY2uTOFA',
  },
  {
    username: 'Rhoda71',
    name: 'Emelia Funk',
    password: 'rOZ7DSQKf0sHAz5',
  },
  {
    username: 'Rudolph.Haag74',
    name: 'Ramon Gulgowski',
    password: 'EG6fWiVpRXvpx5j',
  },
  {
    username: 'Jamal_Kovacek20',
    name: 'Jany Olson',
    password: '30ujy2FkO8S792D',
  },
  {
    username: 'Eva22',
    name: 'Stella Shields',
    password: 'd__WfFVczh8atq9',
  },
  {
    username: 'Terry38',
    name: 'Rae Paucek',
    password: '611agLC7Fy60kqa',
  },
  {
    username: 'Ursula.Tillman',
    name: 'Marjory Jenkins',
    password: 'uggfdSivADfxGON',
  },
  {
    username: 'Dee_Parisian',
    name: 'Tanner Kozey',
    password: '4hdQgrY8uC5QOjr',
  },
  {
    username: 'Olin_Beahan88',
    name: 'Ayla Thompson',
    password: 'RNJrc3mp7KqMdbE',
  },
  {
    username: 'Salma_Kuhn25',
    name: 'Reed Kertzmann',
    password: 'iOPpHMZ76e7yeDe',
  },
  {
    username: 'Donnell_Bechtelar',
    name: 'Jefferey Luettgen',
    password: '7UcAZmkJdTyB9ph',
  },
  {
    username: 'Anthony_Renner',
    name: 'Jayden Champlin',
    password: 'fPjv5hELioLpJ3r',
  },
  {
    username: 'Jensen_Waelchi',
    name: 'Broderick Bauch',
    password: 'xD8b1pJRQ76INKe',
  },
  {
    username: 'Reese87',
    name: 'Jazmin Jacobi',
    password: 'faxQomFkRJl0pqz',
  },
  {
    username: 'Sheila.Crist82',
    name: 'Helga Marquardt',
    password: 'ZuqcmziCCXWEriL',
  },
  {
    username: 'Santos_Kautzer',
    name: 'Enrico Kub',
    password: 'WkdiC0C4ZwEOPsX',
  },
  {
    username: 'Hazle.Runte77',
    name: 'Aurelie Oberbrunner',
    password: '5ss4QL2NUWZtYzX',
  },
  {
    username: 'Harmon_Kemmer',
    name: 'Peyton Carter',
    password: '0TqXFpJCffCaw7U',
  },
  {
    username: 'Vincenza43',
    name: 'Kelsie McCullough',
    password: 'HLHjabnK6tLrg6P',
  },
  {
    username: 'Dejuan.Schulist',
    name: 'Krista Bins',
    password: 'nBrNQoDGGlxOeve',
  },
  {
    username: 'Melyna92',
    name: 'Christa Conroy',
    password: '1P4Z0XuzWJaYGTS',
  },
  {
    username: 'Abagail_Stokes57',
    name: 'Efrain Gislason',
    password: 'Kz9YxuRNcA9Nzmq',
  },
  {
    username: 'Chaya74',
    name: 'General Frami',
    password: 'kWC3wcz9dcyoYcx',
  },
  {
    username: 'Verna68',
    name: 'Tate Schowalter',
    password: 'y1T5ixrDEHWruT0',
  },
  {
    username: 'Beulah.Steuber28',
    name: 'Freida Hamill',
    password: 'AJfCmBVzZFTb7Ua',
  },
  {
    username: 'Turner.McLaughlin',
    name: 'Caleigh Simonis',
    password: 'SkeBuoi7r9PwRwr',
  },
  {
    username: 'Tyrell.Halvorson44',
    name: 'Delpha Predovic',
    password: 'YjmR8MFi5HazhTW',
  },
  {
    username: 'Florencio_Yost30',
    name: 'Kasandra Schulist',
    password: 'HwvyO1hPY6mYn8g',
  },
  {
    username: 'Abner67',
    name: 'Toni Carroll',
    password: 'apnWyvHtYb3vlDA',
  },
  {
    username: 'Trudie.Gutmann99',
    name: 'Ken Toy',
    password: 'mWtvaXL3EeQlpfZ',
  },
  {
    username: 'Verona.Romaguera43',
    name: 'Alessia Hilll',
    password: '3pxK8FeCmItUSuE',
  },
  {
    username: 'Evans_Kihn',
    name: 'Christine Predovic',
    password: 'LYotKhJQTtsLnAK',
  },
  {
    username: 'Anastacio_Halvorson19',
    name: 'Lily Stanton',
    password: 'kPjgWk4q7ayTZmP',
  },
  {
    username: 'Chanelle92',
    name: 'Rupert Powlowski',
    password: 'knTUzXqZHMMBs4i',
  },
  {
    username: 'Kaycee.Sauer88',
    name: 'Braxton Kuphal',
    password: 'Enaojo6hA4YaVDo',
  },
  {
    username: 'Kade.Mraz75',
    name: 'Karolann Sawayn',
    password: '7_Ie8sAcVzLSXRk',
  },
  {
    username: 'Billy_Batz31',
    name: 'Nannie Jaskolski',
    password: 'qpfC1weLC7vlfWQ',
  },
  {
    username: 'Greyson_Konopelski29',
    name: 'Reggie Roob',
    password: 'lbzJmtoHsAc1O4r',
  },
  {
    username: 'Johnathon_Turcotte80',
    name: 'Cornell Champlin',
    password: 'OABHvatz5b4w8eN',
  },
  {
    username: 'Mckenna81',
    name: 'Turner Friesen',
    password: '_ZMcUsDGAXOu0lQ',
  },
  {
    username: 'Kiera.Dare94',
    name: 'Natalie Armstrong',
    password: 'mtny3xr5Xh79zKI',
  },
  {
    username: 'Vallie.Welch',
    name: 'Clinton Kutch',
    password: 'sZ1IMdgf0zIlkEE',
  },
  {
    username: 'Hudson_Moore44',
    name: 'Filiberto Collins',
    password: 'WXE_5IWrfr1hYjX',
  },
  {
    username: 'Nathanael.Harris5',
    name: 'Katelyn Muller',
    password: '5SO8IDRaAXqw8iA',
  },
  {
    username: 'Aniyah_Veum',
    name: 'Ericka Beer',
    password: 'xsPXoPukLYklEJo',
  },
  {
    username: 'Marshall.Bosco',
    name: 'Shaniya Kihn',
    password: 'BCnLz5e_8k7eKXP',
  },
  {
    username: 'Randi64',
    name: 'Manuela Pfannerstill',
    password: 'avi_vvYLhac9QXu',
  },
  {
    username: 'Moises.Dare',
    name: 'Francisca Zemlak',
    password: 'W2JxMHnS6UQwznQ',
  },
  {
    username: 'Joesph.Pouros37',
    name: 'Alexander Wuckert',
    password: 'ItsPribvuNqdCXE',
  },
  {
    username: 'Michele.Bogan',
    name: 'Jade Hoeger',
    password: '3he1QX_xoTSqEEk',
  },
  {
    username: 'Kameron.Runolfsson98',
    name: 'Jacynthe Zulauf',
    password: 'a_8mfbmMb98_Bbx',
  },
  {
    username: 'Kristoffer.Lubowitz',
    name: 'Bernadette Stamm',
    password: '5FCRx2rPze1Lrfq',
  },
  {
    username: 'Mack49',
    name: 'Caleigh Borer',
    password: 'i_sZhBBWicKpwat',
  },
  {
    username: 'Agustina33',
    name: 'Candelario Douglas',
    password: 'yX_iR0ETC7YjqbZ',
  },
  {
    username: 'Adriana_Kunze',
    name: 'Estelle Murray',
    password: '4H1_hz5tp_dcXGI',
  },
  {
    username: 'Roma.Powlowski50',
    name: 'Boris Pouros',
    password: '519mdjpRDCJd5Q8',
  },
  {
    username: 'Kennedi.Hyatt',
    name: 'Queen Bauch',
    password: 'N_RwyiQUuUA9Skt',
  },
  {
    username: 'Adriel8',
    name: 'Elsie Kilback',
    password: '2ibhfjqjBDBHuFZ',
  },
  {
    username: 'Lucius36',
    name: 'Arielle Lehner',
    password: 'd3uIGxLWPq_2xcA',
  },
  {
    username: 'Gregorio_Stark89',
    name: 'Antonetta Weissnat',
    password: '8DwRR7ChPkVi4Ty',
  },
  {
    username: 'Catharine.Smith10',
    name: 'Ona Feeney',
    password: 'vCwsIVKDriv2kU6',
  },
  {
    username: 'Dewayne64',
    name: 'Antwon Sporer',
    password: 'KI7yRTBtzs9Iyfm',
  },
  {
    username: 'Sandy10',
    name: 'Rosie Shanahan',
    password: '874c8oiFHjaqlhJ',
  },
  {
    username: 'Gladys_Turcotte',
    name: 'Blair Beier',
    password: 'lZ5atGPCBfClu1g',
  },
  {
    username: 'Christian80',
    name: 'Xzavier Little',
    password: 'ghHTlqk7CFmeO8g',
  },
  {
    username: 'Easter.Grady50',
    name: 'Viviane Walter',
    password: 'hSstRZ_6RiDOVn7',
  },
  {
    username: 'Jasper.Legros',
    name: 'Ocie Cormier',
    password: 'qZHR5ELbA3wGMmq',
  },
  {
    username: 'Kenyatta.Tremblay92',
    name: 'Kenny Little',
    password: 'yJ5YdbsP6OgQpYn',
  },
  {
    username: 'Brionna.Becker96',
    name: 'Tracy Williamson',
    password: 'IzBW57qIc7dFlbx',
  },
  {
    username: 'Joy.Thiel1',
    name: 'Elton Boehm',
    password: 'lFEhteK1rdPwLza',
  },
  {
    username: 'Aglae24',
    name: 'Sandra Lynch',
    password: 'Q9danj6fnMRFrJf',
  },
  {
    username: 'Art76',
    name: 'Raymond Hickle',
    password: '_0NcDAl6gLt4LNV',
  },
  {
    username: 'Devon96',
    name: 'Samantha Christiansen',
    password: '91iAGi609Zb0UPH',
  },
  {
    username: 'Armando21',
    name: 'Richard Braun',
    password: 'YumEXD9u3on1XLT',
  },
  {
    username: 'Javier_Goyette',
    name: 'Ida Borer',
    password: 'x7pTwXF2XjGuThE',
  },
  {
    username: 'Kaleb_Kiehn61',
    name: 'Gisselle Frami',
    password: '8XarXqlwwiOeDcm',
  },
  {
    username: 'Mark70',
    name: 'Bert Weimann',
    password: 'Ovk_Nd29sbMQr4A',
  },
  {
    username: 'Foster57',
    name: 'Rebecca Wintheiser',
    password: '9kwUH_z4VcdnW_U',
  },
  {
    username: 'Destiney_Collier',
    name: 'Lowell Padberg',
    password: 'EcmYH2MsFzpJVDc',
  },
  {
    username: 'Kristin9',
    name: 'Omer Hammes',
    password: '9ttNae4Y0uidn55',
  },
  {
    username: 'Charley42',
    name: 'Kyla Lesch',
    password: 'ij4lZfqF81Y1Tvo',
  },
  {
    username: 'Lester.Schimmel27',
    name: 'Damion Wuckert',
    password: 'EhBE47QhGAejP0U',
  },
  {
    username: 'Roxanne.MacGyver60',
    name: 'Earnestine Crooks',
    password: 'xh3y5RbtDEJqnbu',
  },
  {
    username: 'Carrie.Bogisich43',
    name: 'Cielo Rutherford',
    password: '2P30jFne4eB1Cpc',
  },
  {
    username: 'Vivien.Bradtke41',
    name: 'Rodger Kirlin',
    password: 'F59wzHp5Q56OD6m',
  },
  {
    username: 'Adrienne_Robel',
    name: 'Ali Cartwright',
    password: 'nKy43sZX6cQKuT8',
  },
  {
    username: 'Elmore_Steuber',
    name: 'Mckenna Hessel',
    password: 'dzUTkCCjXCndB71',
  },
  {
    username: 'David.Graham31',
    name: 'Keara Roob',
    password: 'ZbVynB5sWQxlxev',
  },
  {
    username: 'Colin25',
    name: 'Emmalee Haley',
    password: 'GTynEfE5AGyuL7j',
  },
  {
    username: 'April.Leannon',
    name: 'Ivy Farrell',
    password: '9C60chWgoLzoKFJ',
  },
  {
    username: 'Tyra.Gerhold88',
    name: 'Johathan Christiansen',
    password: 'sTEF0jOoeTgOKey',
  },
  {
    username: 'Enos.Jacobson81',
    name: "Ricky O'Kon",
    password: 'GlYNk1AX2NDPtLD',
  },
  {
    username: 'Hilma_Veum',
    name: 'Cade Donnelly',
    password: 'WEYtfAzqBFF_8YU',
  },
  {
    username: 'Maxie.Waelchi',
    name: 'Marlin Heaney',
    password: 'feKKn8ojhq6XTY3',
  },
  {
    username: 'Keara16',
    name: 'Cornell Mills',
    password: 'ma4Fpaz6ZYp5cSF',
  },
  {
    username: 'Myrna_Green66',
    name: 'Annette Klocko',
    password: 'N6AgLWNzc5gohXR',
  },
  {
    username: 'Alexandre37',
    name: 'Theodora Brekke',
    password: 'fqhYF9be1xZ9uoT',
  },
]

module.exports = {persons, personsGraphQL, users100}
