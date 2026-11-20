/* Claude tarafından hazırlanan ünite oyunları — 2, 3, 4. sınıf.
   yer:  {t:'yer', ad, ikon, y: yönerge, k: söylenen cümle kalıbı ({k}=kart, {b}=bölge), b: [[bölge, simge]], o: [[kart, simge, bölge no]]}
   sira: {t:'sira', ad, ikon, y, d: [[ [simge, adım], ... ], ...]}  (adımlar doğru sırada yazılır, oyunda karışır)
   bil:  {t:'bil', ad, ikon, ses: true → yalnız sesli (dinle-dokun), q: [[ipucu, cevap, simge]]}
   Kızlar ve erkekler için ortak: oyuncu kendi karakterini seçer; senaryolarda kalıp yargı yok. */
window.UOYUN = window.UOYUN || {};

UOYUN[2] = [
  [ // School Life
    { t: 'yer', ad: 'Where does it go?', ikon: '🏫', y: 'Put each picture in the right place at school!', k: 'The {k} is in the {b}.',
      b: [['classroom', '🏫'], ['library', '📚'], ['playground', '🛝'], ['garden', '🌷']],
      o: [['desk', '🪑', 0], ['pencil', '✏️', 0], ['book', '📖', 1], ['magazine', '📰', 1], ['ball', '⚽', 2], ['slide', '🎢', 2], ['tree', '🌳', 3], ['flower', '🌻', 3]] },
    { t: 'bil', ad: 'Listen and touch', ikon: '👂', ses: true,
      q: [['Hello! Hello! Touch hello!', 'hello', '👋'], ['She teaches us English. Touch the teacher!', 'teacher', '👩‍🏫'], ['We read books here. Touch the library!', 'library', '📚'],
        ['We play here. Touch the playground!', 'playground', '🛝'], ['Goodbye! See you tomorrow! Touch goodbye!', 'goodbye', '🙋'], ['Thank you! Touch thank you!', 'thank you', '🙏']] }
  ],
  [ // Classroom Life
    { t: 'yer', ad: 'Colour boxes', ikon: '🎨', y: 'Put each thing in the box with the same colour!', k: 'It is {b}.',
      b: [['red', '🟥'], ['blue', '🟦'], ['yellow', '🟨'], ['green', '🟩']],
      o: [['apple', '🍎', 0], ['heart', '❤️', 0], ['car', '🚙', 1], ['whale', '🐳', 1], ['sun', '☀️', 2], ['banana', '🍌', 2], ['frog', '🐸', 3], ['leaf', '🍃', 3]] },
    { t: 'bil', ad: 'Listen and touch', ikon: '👂', ses: true,
      q: [['Touch the pencil!', 'pencil', '✏️'], ['Touch the book!', 'book', '📕'], ['Touch the rubber!', 'rubber', '🧽'], ['Touch the desk!', 'desk', '🪑'],
        ['Touch the scissors!', 'scissors', '✂️'], ['Touch the pencil case!', 'pencil case', '👝']] }
  ],
  [ // Personal Life
    { t: 'yer', ad: 'Dress for the weather', ikon: '🌦️', y: 'Is it for a hot day or a cold day?', k: 'It is {b}. I wear my {k}.',
      b: [['hot', '☀️'], ['cold', '❄️']],
      o: [['T-shirt', '👕', 0], ['shorts', '🩳', 0], ['sunglasses', '🕶️', 0], ['cap', '🧢', 0], ['coat', '🧥', 1], ['scarf', '🧣', 1], ['gloves', '🧤', 1], ['boots', '👢', 1]] },
    { t: 'bil', ad: 'Touch your body!', ikon: '🙌', ses: true,
      q: [['Touch your head!', 'head', '🙂'], ['Touch your eyes!', 'eyes', '👀'], ['Show me your hands!', 'hands', '🙌'], ['Touch your nose!', 'nose', '👃'],
        ['Touch your ear!', 'ear', '👂'], ['Show me your feet!', 'feet', '🦶']] }
  ],
  [ // Family Life
    { t: 'yer', ad: 'Old or young?', ikon: '👨‍👩‍👧', y: 'Who is young and who is old?', k: 'The {k} is {b}.',
      b: [['young', '🍼'], ['old', '🧓']],
      o: [['baby', '👶', 0], ['sister', '👧', 0], ['brother', '👦', 0], ['grandmother', '👵', 1], ['grandfather', '👴', 1]] },
    { t: 'bil', ad: 'Listen and touch', ikon: '👂', ses: true,
      q: [['This is my mother. Touch the mother!', 'mother', '👩'], ['This is my father. Touch the father!', 'father', '👨'], ['She is my little sister. Touch the sister!', 'sister', '👧'],
        ['He is my big brother. Touch the brother!', 'brother', '👦'], ['She is my grandmother. Touch the grandmother!', 'grandmother', '👵'], ['Shh! The baby is sleeping. Touch the baby!', 'baby', '👶']] }
  ],
  [ // Homes & Houses
    { t: 'yer', ad: 'Tidy the house', ikon: '🏠', y: 'Put each thing in the right room!', k: 'The {k} is in the {b}.',
      b: [['bedroom', '🛏️'], ['kitchen', '🍳'], ['bathroom', '🛁'], ['living room', '🛋️']],
      o: [['teddy bear', '🧸', 0], ['pillow', '🛌', 0], ['cup', '☕', 1], ['fridge', '🧊', 1], ['toothbrush', '🪥', 2], ['soap', '🧼', 2], ['TV', '📺', 3], ['lamp', '💡', 3]] },
    { t: 'bil', ad: 'Pet show', ikon: '🐾', ses: true,
      q: [['Woof woof! Touch the dog!', 'dog', '🐶'], ['Meow! Touch the cat!', 'cat', '🐱'], ['It can fly. Touch the bird!', 'bird', '🐦'], ['It has long ears. Touch the rabbit!', 'rabbit', '🐰'],
        ['It lives in water. Touch the fish!', 'fish', '🐟'], ['It is small and loves cheese. Touch the mouse!', 'mouse', '🐭']] }
  ],
  [ // Life in the City & the World
    { t: 'yer', ad: 'Fruit or vegetable?', ikon: '🧺', y: 'Put the food in the right basket!', k: 'A {k} is a {b}.',
      b: [['fruit', '🍓'], ['vegetable', '🥦']],
      o: [['apple', '🍎', 0], ['banana', '🍌', 0], ['orange', '🍊', 0], ['grape', '🍇', 0], ['carrot', '🥕', 1], ['tomato', '🍅', 1], ['potato', '🥔', 1], ['pepper', '🫑', 1]] },
    { t: 'bil', ad: 'Breakfast time', ikon: '🍳', ses: true,
      q: [['I am thirsty. Touch the water!', 'water', '💧'], ['It is white and comes from a cow. Touch the milk!', 'milk', '🥛'], ['Touch the bread!', 'bread', '🍞'],
        ['Touch the egg!', 'egg', '🥚'], ['It is long and yellow. Touch the banana!', 'banana', '🍌'], ['Touch the cheese!', 'cheese', '🧀']] }
  ]
];

UOYUN[3] = [
  [ // School Life
    { t: 'sira', ad: 'Birthday party plan', ikon: '🎂', y: 'Put the party steps in order!',
      d: [[['💌', 'Write the invitations.'], ['🎈', 'Blow up the balloons.'], ['🍰', 'Bring the cake.'], ['🎶', 'Sing Happy Birthday!'], ['🎁', 'Open the gifts.']]] },
    { t: 'bil', ad: 'Who or where?', ikon: '👂', ses: true,
      q: [['She helps us when we are ill. Touch the school nurse!', 'school nurse', '👩‍⚕️'], ['We do sports here. Touch the gym!', 'gym', '🏀'], ['Touch the birthday cake!', 'cake', '🎂'],
        ['It is a present for you. Touch the gift!', 'gift', '🎁'], ['It is round and full of air. Touch the balloon!', 'balloon', '🎈'], ['We sing and dance. Touch the party!', 'party', '🎉']] }
  ],
  [ // Classroom Life
    { t: 'yer', ad: 'Simon says', ikon: '🙋', y: 'Match the instruction with the picture!', k: '{k}, please!',
      b: [['open', '📖'], ['close', '📕'], ['listen', '👂'], ['write', '✍️']],
      o: [['Open your book', '📗', 0], ['Open the door', '🚪', 0], ['Close the window', '🪟', 1], ['Close your eyes', '😌', 1], ['Listen to the song', '🎵', 2], ['Listen to your friend', '🗣️', 2], ['Write your name', '📝', 3], ['Write the date', '📅', 3]] },
    { t: 'bil', ad: 'Classroom things', ikon: '👂', ses: true,
      q: [['We cut paper with them. Touch the scissors!', 'scissors', '✂️'], ['It sticks paper. Touch the glue!', 'glue', '🧴'], ['Circle it, please! Touch the circle!', 'circle', '⭕'],
        ['Touch the number twenty!', 'twenty', '2️⃣0️⃣'], ['Listen and repeat! Touch the ear!', 'listen', '👂'], ['Touch the ruler!', 'ruler', '📏']] }
  ],
  [ // Personal Life
    { t: 'yer', ad: "What's the weather?", ikon: '🌤️', y: 'What do you wear? Put it under the weather!', k: "It's {b}. I'm wearing my {k}.",
      b: [['sunny', '☀️'], ['rainy', '🌧️'], ['windy', '🌬️']],
      o: [['sunglasses', '🕶️', 0], ['shorts', '🩳', 0], ['umbrella', '☂️', 1], ['raincoat', '🧥', 1], ['boots', '👢', 1], ['jacket', '🧶', 2], ['kite', '🪁', 2]] },
    { t: 'bil', ad: 'How do they feel?', ikon: '😀', ses: true,
      q: [['She is happy! Touch happy!', 'happy', '😀'], ['He is sad. Touch sad!', 'sad', '😢'], ['She is strong! Touch strong!', 'strong', '💪'],
        ['He is tired. Touch tired!', 'tired', '🥱'], ['She is surprised! Touch surprised!', 'surprised', '😮'], ['He is angry. Touch angry!', 'angry', '😠']] }
  ],
  [ // Family Life
    { t: 'sira', ad: 'My morning', ikon: '⏰', y: 'Put the morning routine in order!',
      d: [[['⏰', 'I wake up.'], ['🪥', 'I brush my teeth.'], ['👕', 'I get dressed.'], ['🥣', 'I have breakfast.'], ['🎒', 'I go to school.']],
        [['🍽️', 'We have dinner.'], ['🧽', 'We wash the dishes.'], ['📖', 'I read a book.'], ['🛌', 'I go to bed.']]] },
    { t: 'bil', ad: 'Family jobs at home', ikon: '🏠', ses: true,
      q: [['My dad cooks soup. Touch cook!', 'cook', '👨‍🍳'], ['My sister cleans the room. Touch clean!', 'clean', '🧹'], ['My uncle plays chess. Touch chess!', 'play chess', '♟️'],
        ['My brother waters the flowers. Touch water!', 'water', '🪴'], ['My mum reads a book. Touch read!', 'read', '📖'], ['My aunt plays the guitar. Touch guitar!', 'guitar', '🎸']] }
  ],
  [ // Homes & the Neighbourhood
    { t: 'yer', ad: 'On the farm', ikon: '🚜', y: 'Where do the animals live?', k: 'The {k} lives in the {b}.',
      b: [['barn', '🛖'], ['field', '🌾'], ['pond', '🌊']],
      o: [['cow', '🐄', 0], ['horse', '🐴', 0], ['sheep', '🐑', 1], ['goat', '🐐', 1], ['duck', '🦆', 2], ['frog', '🐸', 2]] },
    { t: 'bil', ad: 'Animal sounds', ikon: '👂', ses: true,
      q: [['Moo! Touch the cow!', 'cow', '🐄'], ['Baa! Touch the sheep!', 'sheep', '🐑'], ['Cluck cluck! Touch the chicken!', 'chicken', '🐔'],
        ['Neigh! Touch the horse!', 'horse', '🐴'], ['Quack quack! Touch the duck!', 'duck', '🦆'], ['Collect the eggs! Touch the eggs!', 'eggs', '🥚']] }
  ],
  [ // Life in the City & the World
    { t: 'yer', ad: 'Three meals', ikon: '🍽️', y: 'Is it for breakfast, lunch or dinner?', k: 'I have {k} for {b}.',
      b: [['breakfast', '🌅'], ['lunch', '🕛'], ['dinner', '🌙']],
      o: [['cereal', '🥣', 0], ['olives', '🫒', 0], ['a sandwich', '🥪', 1], ['soup', '🍲', 1], ['pasta', '🍝', 2], ['rice and chicken', '🍛', 2]] },
    { t: 'bil', ad: 'At the café', ikon: '☕', ses: true,
      q: [['I want some orange juice, please. Touch the juice!', 'juice', '🧃'], ['A cheese sandwich, please! Touch the sandwich!', 'sandwich', '🥪'], ['Hot soup, please! Touch the soup!', 'soup', '🍲'],
        ['He brings the food. Touch the waiter!', 'waiter', '🤵'], ['Can I have the bill? Touch the bill!', 'bill', '🧾'], ['A slice of cake, please! Touch the cake!', 'cake', '🍰']] }
  ]
];

UOYUN[4] = [
  [ // 1 Classroom Rules
    { t: 'yer', ad: 'Rule or not?', ikon: '📜', y: 'Is it a good classroom rule? Yes or no?', k: '{k}: {b}!',
      b: [['Yes, good rule', '✅'], ['No, not OK', '❌']],
      o: [['Raise your hand', '🙋', 0], ['Be quiet in the library', '🤫', 0], ['Say please and thank you', '🙏', 0], ['Throw rubbish in the bin', '🗑️', 0], ['Shout in class', '📢', 1], ['Run in the corridor', '🏃', 1], ['Eat during the lesson', '🍔', 1]] },
    { t: 'bil', ad: 'What do you say?', ikon: '💬', q: [['You want to enter the classroom. What do you say?', 'May I come in?', '🚪'], ['You didn\'t hear the teacher.', 'Say that again, please.', '🔁'],
      ['You give a book to your friend.', 'Here you are.', '🤲'], ['You are late.', 'Sorry, I\'m late.', '⏰'], ['Your teacher says "Stand up". You…', 'stand up', '🧍'], ['The class is noisy. The teacher says…', 'Be quiet, please.', '🤫']] }
  ],
  [ // 2 Nationality
    { t: 'yer', ad: 'Flags and countries', ikon: '🌍', y: 'Match the flag with the nationality!', k: 'This is the flag of {k}. People are {b}.',
      b: [['Turkish', '🇹🇷'], ['British', '🇬🇧'], ['Japanese', '🇯🇵'], ['German', '🇩🇪']],
      o: [['Türkiye', '🌙', 0], ['Ankara', '🏛️', 0], ['the UK', '💂', 1], ['London', '🎡', 1], ['Japan', '🗻', 2], ['Tokyo', '🗼', 2], ['Germany', '🥨', 3], ['Berlin', '🐻', 3]] },
    { t: 'bil', ad: 'Where are they from?', ikon: '🗺️', q: [['Hi! I\'m Kenji. I\'m from Japan. I am…', 'Japanese', '🇯🇵'], ['I\'m Emily. I\'m from London. I am…', 'British', '🇬🇧'],
      ['I\'m Elif. I\'m from İzmir. I am…', 'Turkish', '🇹🇷'], ['I\'m Jack from New York. I am…', 'American', '🇺🇸'], ['I\'m Lena from Berlin. I am…', 'German', '🇩🇪'], ['I\'m Sofia from Rome. I am…', 'Italian', '🇮🇹']] }
  ],
  [ // 3 Cartoon Characters
    { t: 'yer', ad: 'Can or can\'t?', ikon: '🦸', y: 'Can the animal do it?', k: 'A {k}: {b}!',
      b: [['It can', '✅'], ['It can\'t', '❌']],
      o: [['fish – swim', '🐟', 0], ['bird – fly', '🐦', 0], ['monkey – climb', '🐒', 0], ['kangaroo – jump', '🦘', 0], ['cat – fly', '🐱', 1], ['elephant – jump', '🐘', 1], ['penguin – fly', '🐧', 1]] },
    { t: 'bil', ad: 'Who am I?', ikon: '🦸‍♀️', q: [['I can fly. I am a big bird. I love the sky.', 'eagle', '🦅'], ['I can swim. I can\'t walk. I live in the sea.', 'fish', '🐠'],
      ['I can ride a bike to school.', 'ride a bike', '🚲'], ['I can jump very high. I live in Australia.', 'kangaroo', '🦘'], ['I am very strong. I help people. I am a…', 'hero', '🦸'], ['I can climb trees and I love bananas.', 'monkey', '🐒']] }
  ],
  [ // 4 Free Time
    { t: 'yer', ad: 'Indoors or outdoors?', ikon: '🏡', y: 'Do we do it inside or outside?', k: 'I like {k} {b}.',
      b: [['inside', '🏠'], ['outside', '🌳']],
      o: [['reading', '📖', 0], ['playing chess', '♟️', 0], ['painting', '🎨', 0], ['watching cartoons', '📺', 0], ['cycling', '🚴', 1], ['playing football', '⚽', 1], ['flying a kite', '🪁', 1]] },
    { t: 'bil', ad: 'Free time riddles', ikon: '🎨', q: [['You need a book for this.', 'reading', '📖'], ['You move to music.', 'dancing', '💃'], ['You use colours and a brush.', 'painting', '🎨'],
      ['You need a board and a king.', 'playing chess', '♟️'], ['You use your voice and a microphone.', 'singing', '🎤'], ['You watch funny animals on TV.', 'watching cartoons', '📺']] }
  ],
  [ // 5 My Day
    { t: 'sira', ad: 'Ece\'s day', ikon: '🗓️', y: 'Put Ece\'s day in order!',
      d: [[['⏰', 'She wakes up at seven.'], ['🥣', 'She has breakfast.'], ['🎒', 'She goes to school.'], ['🤝', 'She meets her friends.'], ['📝', 'She does her homework.'], ['🛌', 'She goes to bed at night.']],
        [['🌅', 'In the morning, Can goes jogging.'], ['🏫', 'At noon, he has lunch at school.'], ['⚽', 'In the afternoon, he plays football.'], ['🌙', 'At night, he reads a story.']]] },
    { t: 'bil', ad: 'What time of day?', ikon: '🕐', q: [['The sun rises. You wake up.', 'morning', '🌅'], ['You come home from school.', 'afternoon', '🌤️'], ['The moon and the stars are in the sky.', 'at night', '🌙'],
      ['No school today! Family breakfast day.', 'on Sundays', '📅'], ['You do it after school with your books.', 'do homework', '📝'], ['You put on your pyjamas.', 'go to bed', '🛌']] }
  ],
  [ // 6 Fun with Science
    { t: 'sira', ad: 'Grow a bean', ikon: '🌱', y: 'Put the science steps in order!',
      d: [[['🥤', 'Take a cup.'], ['🪨', 'Put some soil in the cup.'], ['🫘', 'Plant the bean.'], ['💧', 'Water it.'], ['☀️', 'Put it next to the window.'], ['🌱', 'Watch it grow!']],
        [['📄', 'Take a piece of paper.'], ['📐', 'Fold it in half.'], ['✂️', 'Cut a shape.'], ['🦋', 'Open it. It\'s a butterfly!']]] },
    { t: 'bil', ad: 'Where is it?', ikon: '📦', q: [['The ball is IN the box.', 'in', '📦'], ['The cat is UNDER the table.', 'under', '⬇️'], ['The cup is ON the desk.', 'on', '⬆️'],
      ['The lamp is NEXT TO the bed.', 'next to', '↔️'], ['Mix blue and yellow. You get…', 'green', '🟢'], ['Mix red and white. You get…', 'pink', '🩷']] }
  ],
  [ // 7 Jobs
    { t: 'yer', ad: 'Where do they work?', ikon: '💼', y: 'Match the job with the workplace!', k: 'A {k} works at a {b}.',
      b: [['hospital', '🏥'], ['school', '🏫'], ['farm', '🚜'], ['airport', '🛫']],
      o: [['doctor', '🧑‍⚕️', 0], ['nurse', '💉', 0], ['teacher', '🧑‍🏫', 1], ['farmer', '🧑‍🌾', 2], ['vet', '🐄', 2], ['pilot', '🧑‍✈️', 3]] },
    { t: 'bil', ad: 'Guess the job', ikon: '🤔', q: [['I help sick people. I work at a hospital.', 'doctor', '🧑‍⚕️'], ['I fly planes.', 'pilot', '🧑‍✈️'], ['I help sick animals.', 'vet', '🐕‍🦺'],
      ['I cook food at a restaurant.', 'cook', '🧑‍🍳'], ['I grow vegetables and feed animals.', 'farmer', '🧑‍🌾'], ['I put out fires.', 'firefighter', '🧑‍🚒']] }
  ],
  [ // 8 My Clothes
    { t: 'yer', ad: 'Pack your bag', ikon: '🎒', y: 'What do you need for this weather?', k: 'It\'s {b}. I need my {k}.',
      b: [['rainy', '🌧️'], ['snowy', '❄️'], ['sunny', '☀️']],
      o: [['umbrella', '☂️', 0], ['raincoat', '🧥', 0], ['gloves', '🧤', 1], ['scarf', '🧣', 1], ['sunglasses', '🕶️', 2], ['sun hat', '👒', 2], ['swimsuit', '🩱', 2]] },
    { t: 'bil', ad: 'Weather report', ikon: '🌦️', q: [['Put on your coat. It\'s white outside!', 'snowy', '❄️'], ['Take your umbrella!', 'rainy', '🌧️'], ['Wear your sunglasses.', 'sunny', '☀️'],
      ['Hold your hat! It\'s…', 'windy', '🌬️'], ['Grey sky, no sun.', 'cloudy', '☁️'], ['Put on your gloves. It\'s very…', 'cold', '🥶']] }
  ],
  [ // 9 My Friends
    { t: 'yer', ad: 'Describe your friend', ikon: '🧑‍🤝‍🧑', y: 'Is it about looks or personality?', k: '{k} — that is about {b}.',
      b: [['looks', '🪞'], ['personality', '💛']],
      o: [['tall', '🦒', 0], ['blonde hair', '👱', 0], ['dark hair', '🧑🏻', 0], ['glasses', '👓', 0], ['funny', '😂', 1], ['kind', '🤗', 1], ['helpful', '🤝', 1]] },
    { t: 'bil', ad: 'Who is it?', ikon: '🔍', q: [['She has got blonde hair. She is tall.', 'Emma', '👱‍♀️'], ['He has got a beard and glasses.', 'Mr Ali', '🧔'], ['She has got curly hair.', 'Nehir', '👩‍🦱'],
      ['He has got red hair.', 'Harry', '👨‍🦰'], ['She has got white hair. She is my grandmother.', 'Grandma', '👵'], ['He is a baby. He hasn\'t got hair!', 'baby Can', '👶']] }
  ],
  [ // 10 Food and Drinks
    { t: 'yer', ad: 'Hungry or thirsty?', ikon: '🍽️', y: 'Do you eat it or drink it?', k: 'I am {b}. I want some {k}.',
      b: [['hungry – eat', '🍔'], ['thirsty – drink', '🥤']],
      o: [['pizza', '🍕', 0], ['sandwich', '🥪', 0], ['pasta', '🍝', 0], ['köfte', '🧆', 0], ['lemonade', '🍋', 1], ['water', '💧', 1], ['ayran', '🥛', 1]] },
    { t: 'bil', ad: 'Would you like…?', ikon: '🙋', q: [['It is round with cheese and tomato.', 'pizza', '🍕'], ['A yellow, sour drink.', 'lemonade', '🍋'], ['A sweet, cold dessert.', 'ice cream', '🍦'],
      ['Turkish meatballs.', 'köfte', '🧆'], ['A white drink. Turkish people love it with food.', 'ayran', '🥛'], ['A red fruit. It keeps the doctor away!', 'apple', '🍎']] }
  ]
];
