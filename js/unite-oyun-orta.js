/* Claude tarafından hazırlanan ünite oyunları — 5, 6, 7, 8. sınıf. Biçim: unite-oyun-ilkokul.js başındaki açıklama. */
window.UOYUN = window.UOYUN || {};

UOYUN[5] = [
  [ // School Life
    { t: 'yer', ad: 'Join a club!', ikon: '🎭', y: 'Which club is it?', k: 'You can {k} in the {b}.',
      b: [['drama club', '🎭'], ['science club', '🔬'], ['sports club', '🏅'], ['chess club', '♟️']],
      o: [['act in a play', '🎬', 0], ['wear a costume', '🦸', 0], ['do experiments', '🧪', 1], ['use a microscope', '🦠', 1], ['play basketball', '🏀', 2], ['run races', '🏃', 2], ['solve puzzles', '🧩', 3], ['play in a tournament', '🏆', 3]] },
    { t: 'bil', ad: 'School riddles', ikon: '🏫', q: [['We do experiments here.', 'lab', '🧪'], ['He or she trains our school team.', 'coach', '🏅'], ['All students wear the same clothes.', 'uniform', '👔'],
      ['No shouting! No running! These are…', 'rules', '📜'], ['You can read notices here.', 'notice board', '📌'], ['We have lunch here.', 'canteen', '🍽️']] }
  ],
  [ // Classroom Life
    { t: 'yer', ad: 'Build the timetable', ikon: '🗓️', y: 'Which subject is it?', k: 'We have {b} — we {k}.',
      b: [['Maths', '➗'], ['Science', '🔬'], ['P.E.', '⚽'], ['Music', '🎵']],
      o: [['solve problems', '🔢', 0], ['use a calculator', '🧮', 0], ['learn about plants', '🌿', 1], ['look at the planets', '🪐', 1], ['play volleyball', '🏐', 2], ['run in the garden', '🏃', 2], ['sing songs', '🎤', 3], ['play the recorder', '🎶', 3]] },
    { t: 'bil', ad: 'What time is it?', ikon: '🕐', q: [['The long hand is on 12. The short hand is on 9.', 'nine o\'clock', '🕘'], ['It\'s thirty minutes after two.', 'half past two', '🕝'],
      ['The long hand is on 3. The short hand is after 4.', 'quarter past four', '🕓'], ['The bell rings. We go out and play.', 'break', '🔔'], ['Two lessons together.', 'double lesson', '📚'], ['A day with no school: Saturday or Sunday.', 'weekend', '🏖️']] }
  ],
  [ // Personal Life
    { t: 'yer', ad: 'Fashion show', ikon: '👗', y: 'Where do we wear it?', k: 'You wear {k} on your {b}.',
      b: [['head', '🙂'], ['body', '👕'], ['feet', '🦶'], ['hands', '✋']],
      o: [['a cap', '🧢', 0], ['a headscarf', '🧕', 0], ['a jacket', '🧥', 1], ['a dress', '👗', 1], ['trainers', '👟', 2], ['boots', '🥾', 2], ['gloves', '🧤', 3], ['a ring', '💍', 3]] },
    { t: 'bil', ad: 'Describe them', ikon: '🪞', q: [['Her hair is not straight. It is…', 'curly', '👩‍🦱'], ['He wears them to see better.', 'glasses', '👓'], ['Not tall, not short. He is of…', 'average height', '🧍'],
      ['You wear this when it rains.', 'raincoat', '🧥'], ['Sports shoes.', 'trainers', '👟'], ['A small bag for money.', 'wallet', '👛']] }
  ],
  [ // Family Life
    { t: 'yer', ad: 'Family weekend', ikon: '⛺', y: 'Do we do it at home or outdoors?', k: 'We {k} {b}.',
      b: [['at home', '🏠'], ['outdoors', '🏞️']],
      o: [['play board games', '🎲', 0], ['bake a cake', '🎂', 0], ['take care of our cat', '🐈', 0], ['have a picnic', '🧺', 1], ['go camping', '⛺', 1], ['go cycling', '🚴', 1], ['go fishing', '🎣', 1]] },
    { t: 'bil', ad: 'Hobby riddles', ikon: '🎯', q: [['You sleep in a tent in the forest.', 'camping', '⛺'], ['You eat sandwiches on a blanket in the park.', 'picnic', '🧺'], ['You ride a bike.', 'cycling', '🚴'],
      ['You take photos.', 'photography', '📷'], ['You play it with dice on a table.', 'board game', '🎲'], ['You catch fish at the lake.', 'fishing', '🎣']] }
  ],
  [ // Life in the Neighbourhood & City
    { t: 'yer', ad: 'City guide', ikon: '🗺️', y: 'Old or modern?', k: 'The {k} is {b}.',
      b: [['ancient', '🏺'], ['modern', '🏙️']],
      o: [['castle', '🏰', 0], ['old mosque', '🕌', 0], ['ancient theatre', '🏛️', 0], ['shopping centre', '🛍️', 1], ['sports centre', '🏟️', 1], ['new tower', '🗼', 1]] },
    { t: 'bil', ad: 'Where can you…?', ikon: '📍', q: [['You can see old things from history.', 'museum', '🏛️'], ['An old building with high walls and towers.', 'castle', '🏰'], ['Muslims pray here.', 'mosque', '🕌'],
      ['A big open place in the city centre.', 'square', '⛲'], ['You can see paintings here.', 'art gallery', '🖼️'], ['You can do sports here.', 'sports centre', '🏟️']] }
  ],
  [ // Life in the World
    { t: 'sira', ad: 'Make menemen', ikon: '🍳', y: 'Put the recipe in order!',
      d: [[['🧺', 'Wash the tomatoes and peppers.'], ['🔪', 'Slice them.'], ['🫒', 'Heat some oil in a pan.'], ['🍅', 'Cook the vegetables.'], ['🥚', 'Add two eggs and mix.'], ['😋', 'Taste it. Delicious!']],
        [['📜', 'Look at the menu.'], ['🙋', 'Order your meal.'], ['🍽️', 'Eat your food.'], ['🍮', 'Have a dessert.'], ['🧾', 'Ask for the bill.']]] },
    { t: 'bil', ad: 'Food riddles', ikon: '🍽️', q: [['A list of food in a restaurant.', 'menu', '📜'], ['Sweet food after the meal.', 'dessert', '🍮'], ['You pay it at the end.', 'bill', '🧾'],
      ['Instructions to cook a dish.', 'recipe', '📋'], ['Cook eggs in hot water.', 'boil', '♨️'], ['Very sweet Turkish dessert with nuts.', 'baklava', '🥮']] }
  ],
  [ // Life in Nature
    { t: 'yer', ad: 'Animal homes', ikon: '🌍', y: 'Where does the animal live?', k: 'The {k} lives in the {b}.',
      b: [['jungle', '🌴'], ['savanna', '🦒'], ['ocean', '🌊'], ['ice', '🧊']],
      o: [['monkey', '🐒', 0], ['parrot', '🦜', 0], ['lion', '🦁', 1], ['zebra', '🦓', 1], ['whale', '🐋', 2], ['shark', '🦈', 2], ['penguin', '🐧', 3], ['seal', '🦭', 3]] },
    { t: 'bil', ad: 'Who am I?', ikon: '🐾', q: [['I am very big. I have a long trunk.', 'elephant', '🐘'], ['I am the king of the jungle.', 'lion', '🦁'], ['I have black and white stripes.', 'zebra', '🦓'],
      ['I am a bird but I can\'t fly. I can swim.', 'penguin', '🐧'], ['I am an insect. I make honey.', 'bee', '🐝'], ['I am a reptile with a long body and no legs.', 'snake', '🐍']] }
  ],
  [ // Life in the Universe & Future
    { t: 'yer', ad: 'Pack for the trip', ikon: '🧳', y: 'Which holiday is it for?', k: 'I\'m going to the {b}. I\'m packing my {k}.',
      b: [['beach', '🏖️'], ['mountains', '🏔️']],
      o: [['swimsuit', '🩱', 0], ['sunglasses', '🕶️', 0], ['sun cream', '🧴', 0], ['warm coat', '🧥', 1], ['hiking boots', '🥾', 1], ['gloves', '🧤', 1]] },
    { t: 'bil', ad: 'Planet Earth riddles', ikon: '🌎', q: [['A lot of sand and very little water.', 'desert', '🏜️'], ['Land with water all around it.', 'island', '🏝️'], ['The biggest water on Earth.', 'ocean', '🌊'],
      ['Very high land with snow on top.', 'mountain', '🏔️'], ['Water that falls from a high place.', 'waterfall', '🌊🪨'], ['A beautiful place in Türkiye with fairy chimneys.', 'Cappadocia', '🎈']] }
  ]
];

UOYUN[6] = [
  [ // School Life
    { t: 'sira', ad: 'Republic Day ceremony', ikon: '🇹🇷', y: 'Put the ceremony in order!',
      d: [[['🧍', 'Students line up in the garden.'], ['🇹🇷', 'We raise the flag.'], ['🎶', 'We sing the national anthem.'], ['🎤', 'A student gives a speech.'], ['📜', 'Students read poems.'], ['👏', 'Everyone celebrates!']]] },
    { t: 'bil', ad: 'Who is responsible?', ikon: '🧭', q: [['She leads the class and helps the teacher.', 'class leader', '🧑‍✈️'], ['He offers to help without pay.', 'volunteer', '🙋'], ['A talk in front of people.', 'speech', '🎤'],
      ['We sing the İstiklal Marşı.', 'national anthem', '🎶'], ['A special event with flags and poems.', 'ceremony', '🎖️'], ['She always helps others. She is…', 'helpful', '🤝']] }
  ],
  [ // Classroom Life
    { t: 'yer', ad: 'Good habit or bad habit?', ikon: '🔄', y: 'Is it a good study habit?', k: '{k}: {b}.',
      b: [['good habit', '👍'], ['bad habit', '👎']],
      o: [['Revise a little every day', '📖', 0], ['Work in pairs', '👫', 0], ['Focus on the task', '🎯', 0], ['Sleep early before exams', '😴', 0], ['Study all night', '🌙', 1], ['Play games during homework', '🎮', 1], ['Forget your books', '🙈', 1]] },
    { t: 'bil', ad: 'Classroom words', ikon: '🏫', q: [['Two students work together.', 'pair work', '👫'], ['You study the lesson again before an exam.', 'revise', '📖'], ['You write about your day in it.', 'diary', '📔'],
      ['You read without making a sound.', 'read silently', '🤫'], ['Doing something again and again to get better.', 'practise', '🏋️'], ['Number after 299.', 'three hundred', '3️⃣']] }
  ],
  [ // Personal Life
    { t: 'yer', ad: 'Personality puzzle', ikon: '🧠', y: 'Positive or negative personality?', k: 'Being {k} is {b}.',
      b: [['positive', '😊'], ['negative', '😕']],
      o: [['polite', '🎩', 0], ['patient', '⏳', 0], ['caring', '💗', 0], ['tidy', '🧺', 0], ['lazy', '🦥', 1], ['rude', '😤', 1], ['selfish', '🙅', 1]] },
    { t: 'bil', ad: 'Who is like this?', ikon: '🔍', q: [['She always says "please" and "thank you".', 'polite', '🎩'], ['He waits and doesn\'t get angry.', 'patient', '⏳'], ['She solves puzzles very quickly.', 'clever', '🦉'],
      ['He never does his homework. He sleeps a lot.', 'lazy', '🦥'], ['She looks after her little brother with love.', 'caring', '💗'], ['His room is always in order.', 'tidy', '🧺']] }
  ],
  [ // Family Life
    { t: 'yer', ad: 'Workplace match', ikon: '🏢', y: 'Where does this person work?', k: 'A {k} works in a {b}.',
      b: [['clinic', '🦷'], ['newspaper office', '📰'], ['construction site', '🏗️'], ['restaurant', '🍴']],
      o: [['dentist', '🧑‍⚕️', 0], ['assistant', '🧑‍💼', 0], ['journalist', '✍️', 1], ['reporter', '🎙️', 1], ['engineer', '👷', 2], ['builder', '🧱', 2], ['cook', '🧑‍🍳', 3], ['waiter', '🤵', 3]] },
    { t: 'bil', ad: 'At home', ikon: '🏠', q: [['You cook on it in the kitchen.', 'cooker', '🍳'], ['It covers the window.', 'curtain', '🪟'], ['You look at yourself in it.', 'mirror', '🪞'],
      ['Tables, chairs and sofas.', 'furniture', '🛋️'], ['You put your head on it in bed.', 'pillow', '🛌'], ['A flat in a tall building.', 'apartment', '🏢']] }
  ],
  [ // Life in the Neighbourhood & City
    { t: 'yer', ad: 'Transport race', ikon: '🚇', y: 'Where does it travel?', k: 'The {k} travels {b}.',
      b: [['on the road', '🛣️'], ['on rails', '🛤️'], ['on water', '🌊'], ['in the air', '☁️']],
      o: [['bus', '🚌', 0], ['bicycle', '🚲', 0], ['tram', '🚋', 1], ['underground', '🚇', 1], ['ship', '🚢', 2], ['ferry', '⛴️', 2], ['plane', '✈️', 3], ['helicopter', '🚁', 3]] },
    { t: 'bil', ad: 'City riddles', ikon: '🏙️', q: [['People watch a show. They are the…', 'audience', '👏'], ['A train under the city.', 'underground', '🚇'], ['You wait here for the bus.', 'bus stop', '🚏'],
      ['Too many cars on the road.', 'traffic', '🚦'], ['A big event with music and fun.', 'festival', '🎪'], ['He plays the guitar on stage.', 'musician', '🎸']] }
  ],
  [ // Life in the World & Culture
    { t: 'yer', ad: 'World tour', ikon: '🌐', y: 'Which country is it from?', k: '{k} is from {b}.',
      b: [['Italy', '🇮🇹'], ['Spain', '🇪🇸'], ['Japan', '🇯🇵'], ['Türkiye', '🇹🇷']],
      o: [['pizza', '🍕', 0], ['the Colosseum', '🏛️', 0], ['paella', '🥘', 1], ['flamenco', '💃', 1], ['sushi', '🍣', 2], ['kimono', '👘', 2], ['Turkish tea', '🫖', 3], ['the evil eye bead', '🧿', 3]] },
    { t: 'bil', ad: 'Culture riddles', ikon: '🧿', q: [['The main city of a country.', 'capital', '🏙️'], ['People in Spain speak it.', 'Spanish', '🇪🇸'], ['Something people do for many years.', 'tradition', '🎎'],
      ['Ankara is the capital of…', 'Türkiye', '🇹🇷'], ['Not from your country.', 'foreign', '✈️'], ['Old buildings and customs from the past.', 'heritage', '🏛️']] }
  ],
  [ // Life in Nature & Global Problems
    { t: 'yer', ad: 'Recycle it!', ikon: '♻️', y: 'Put the rubbish in the right bin!', k: 'Put the {k} in the {b} bin.',
      b: [['paper', '📦'], ['plastic', '🧴'], ['glass', '🫙'], ['food', '🍂']],
      o: [['newspaper', '📰', 0], ['box', '🗃️', 0], ['bottle cap', '🔵', 1], ['yogurt pot', '🥣', 1], ['jam jar', '🍯', 2], ['glass bottle', '🍾', 2], ['apple core', '🍎', 3], ['banana peel', '🍌', 3]] },
    { t: 'bil', ad: 'Save the planet', ikon: '🌍', q: [['Making things dirty: air, water, soil.', 'pollution', '🏭'], ['Use old things to make new things.', 'recycle', '♻️'], ['Use less of something.', 'reduce', '📉'],
      ['Walking long distances in nature.', 'hiking', '🥾'], ['Turn off the tap to … water.', 'save', '💧'], ['Things we throw away.', 'rubbish', '🗑️']] }
  ],
  [ // Life in the Universe & Future
    { t: 'sira', ad: 'Planets in order', ikon: '🪐', y: 'Put the planets in order from the Sun!',
      d: [[['☀️', 'The Sun'], ['⚫', 'Mercury'], ['🟡', 'Venus'], ['🌍', 'Earth'], ['🔴', 'Mars'], ['🟠', 'Jupiter']]] },
    { t: 'bil', ad: 'Space & future', ikon: '🚀', q: [['The red planet.', 'Mars', '🔴'], ['The biggest planet.', 'Jupiter', '🟠'], ['It goes around the Earth at night.', 'Moon', '🌙'],
      ['A machine that can work like a person.', 'robot', '🤖'], ['Strong wind and heavy rain.', 'storm', '⛈️'], ['Too much water covers the land.', 'flood', '🌊']] }
  ]
];

UOYUN[7] = [
  [ // 1 Appearance and Personality
    { t: 'yer', ad: 'Looks or personality?', ikon: '🪞', y: 'Does it describe appearance or personality?', k: '"{k}" describes {b}.',
      b: [['appearance', '👀'], ['personality', '💭']],
      o: [['curly hair', '👩‍🦱', 0], ['slim', '🧍', 0], ['freckles', '🌟', 0], ['green eyes', '🟢', 0], ['outgoing', '🥳', 1], ['shy', '😳', 1], ['generous', '🎁', 1], ['honest', '🤝', 1]] },
    { t: 'bil', ad: 'Who is who?', ikon: '🔍', q: [['She talks to everyone and loves parties.', 'outgoing', '🥳'], ['He doesn\'t like talking to new people.', 'shy', '😳'], ['She always shares her things.', 'generous', '🎁'],
      ['He never tells lies.', 'honest', '🤝'], ['She only thinks about herself.', 'selfish', '🙅'], ['He makes everyone laugh.', 'funny', '😂']] }
  ],
  [ // 2 Sports
    { t: 'yer', ad: 'How often?', ikon: '📊', y: 'Match Defne\'s week to the frequency word!', k: 'Defne {b} {k}.',
      b: [['always', '💯'], ['usually', '🔁'], ['sometimes', '🌗'], ['never', '🚫']],
      o: [['drinks water after training (7 days)', '💧', 0], ['goes to volleyball (5 days)', '🏐', 1], ['plays tennis (2 days)', '🎾', 2], ['goes skiing (0 days)', '⛷️', 3]] },
    { t: 'bil', ad: 'Sport riddles', ikon: '🏆', q: [['You play it with a racket and a small ball.', 'tennis', '🎾'], ['You do it in a pool.', 'swimming', '🏊'], ['A team of 6 players and a high net.', 'volleyball', '🏐'],
      ['You run slowly in the park in the morning.', 'go jogging', '🏃'], ['The winner of a competition.', 'champion', '🏆'], ['A Turkish sport with two wrestlers and oil.', 'oil wrestling', '🤼']] }
  ],
  [ // 3 Biographies
    { t: 'sira', ad: 'Life timeline', ikon: '📜', y: 'Put the life events in order!',
      d: [[['👶', 'Aziz Sancar was born in Mardin in 1946.'], ['🎓', 'He studied medicine in İstanbul.'], ['✈️', 'He moved to the USA.'], ['🔬', 'He did research on DNA.'], ['🏅', 'He won the Nobel Prize in 2015.']],
        [['👶', 'Halide Edib was born in İstanbul in 1884.'], ['📚', 'She studied at college.'], ['✍️', 'She became a famous writer.'], ['🇹🇷', 'She supported the War of Independence.']]] },
    { t: 'bil', ad: 'Famous people', ikon: '🌟', q: [['He founded the Republic of Türkiye.', 'Atatürk', '🇹🇷'], ['She was the first Turkish woman pilot in the military.', 'Sabiha Gökçen', '✈️'], ['He won the Nobel Prize in Chemistry.', 'Aziz Sancar', '🔬'],
      ['He was a famous Turkish mathematician.', 'Cahit Arf', '➗'], ['She is a Turkish volleyball champion.', 'Eda Erdem', '🏐'], ['He wrote the National Anthem.', 'Mehmet Akif Ersoy', '📜']] }
  ],
  [ // 4 Wild Animals
    { t: 'yer', ad: 'Protect wildlife', ikon: '🦓', y: 'Should we do it or shouldn\'t we?', k: 'We {b} {k}.',
      b: [['should', '✅'], ['shouldn\'t', '❌']],
      o: [['protect forests', '🌳', 0], ['clean the beaches', '🏖️', 0], ['support animal shelters', '🐾', 0], ['hunt endangered animals', '🏹', 1], ['throw plastic in the sea', '🧴', 1], ['cut down trees', '🪓', 1]] },
    { t: 'bil', ad: 'Animal facts', ikon: '🐆', q: [['It is extinct. It lived millions of years ago.', 'dinosaur', '🦖'], ['An endangered big cat in Anatolia.', 'Anatolian leopard', '🐆'], ['They lay eggs on Turkish beaches.', 'sea turtles', '🐢'],
      ['A black and white bear from China.', 'panda', '🐼'], ['The natural home of an animal.', 'habitat', '🌳'], ['The biggest animal in the ocean.', 'blue whale', '🐋']] }
  ],
  [ // 5 Television
    { t: 'yer', ad: 'TV guide', ikon: '📺', y: 'What type of programme is it?', k: '"{k}" is a {b}.',
      b: [['documentary', '🎥'], ['cartoon', '🐭'], ['quiz show', '❓'], ['news', '📰']],
      o: [['Life of Lions', '🦁', 0], ['Deep Oceans', '🐙', 0], ['Funny Bunny', '🐰', 1], ['Space Kids', '👾', 1], ['Who Knows?', '🏆', 2], ['Brain Battle', '🧠', 2], ['Evening Report', '🗞️', 3], ['Weather Today', '🌦️', 3]] },
    { t: 'bil', ad: 'TV riddles', ikon: '📡', q: [['A programme about nature and science facts.', 'documentary', '🎥'], ['People answer questions and win prizes.', 'quiz show', '❓'], ['A story with many episodes.', 'series', '🎬'],
      ['Animated characters for children.', 'cartoon', '🐭'], ['It tells us what happened today.', 'news', '📰'], ['You use it to change the channel.', 'remote control', '🎛️']] }
  ],
  [ // 6 Celebrations
    { t: 'sira', ad: 'Plan a surprise party', ikon: '🎉', y: 'Put the party plan in order!',
      d: [[['📝', 'First, make a guest list.'], ['💌', 'Then, invite the guests.'], ['🛒', 'Next, buy food and drinks.'], ['🎊', 'After that, decorate the room.'], ['🎂', 'Finally, bring out the cake. Surprise!']]] },
    { t: 'bil', ad: 'Celebration riddles', ikon: '🎊', q: [['A person who comes to your party.', 'guest', '🧑‍🤝‍🧑'], ['A card that asks people to come.', 'invitation', '💌'], ['We visit our elders and eat sweets.', 'Eid', '🍬'],
      ['Children\'s Day in Türkiye.', '23 April', '🎈'], ['Fireworks on 31 December.', 'New Year', '🎆'], ['You don\'t know about it before. It\'s a…', 'surprise', '🎁']] }
  ],
  [ // 7 Dreams
    { t: 'yer', ad: 'Sure or maybe?', ikon: '💭', y: 'Is it a sure plan or a possibility?', k: 'I {b} {k}.',
      b: [['will definitely', '✔️'], ['may', '🤷']],
      o: [['finish secondary school', '🎓', 0], ['learn English well', '🗣️', 0], ['become an astronaut', '👩‍🚀', 1], ['live abroad', '✈️', 1], ['win a gold medal', '🥇', 1]] },
    { t: 'bil', ad: 'Future jobs', ikon: '🚀', q: [['I will travel to space.', 'astronaut', '👩‍🚀'], ['I will design buildings.', 'architect', '📐'], ['I will write computer programs.', 'software developer', '💻'],
      ['I will help sick animals.', 'vet', '🐕'], ['I will study at a…', 'university', '🎓'], ['I will make a world without wars. A … world.', 'peaceful', '🕊️']] }
  ],
  [ // 8 Public Buildings
    { t: 'yer', ad: 'Go there to…', ikon: '🏛️', y: 'Why do you go there?', k: 'You go to the {b} to {k}.',
      b: [['hospital', '🏥'], ['library', '📚'], ['post office', '📮'], ['bank', '🏦']],
      o: [['see a doctor', '🩺', 0], ['get medicine', '💊', 0], ['borrow books', '📖', 1], ['study quietly', '🤫', 1], ['send a letter', '✉️', 2], ['post a parcel', '📦', 2], ['save money', '💰', 3], ['change money', '💱', 3]] },
    { t: 'bil', ad: 'Which building?', ikon: '📍', q: [['You call them when there is a fire.', 'fire station', '🚒'], ['You report a lost wallet here.', 'police station', '🚓'], ['The mayor works here.', 'town hall', '🏛️'],
      ['A big place with many shops.', 'shopping mall', '🛍️'], ['You watch films on a big screen.', 'cinema', '🎬'], ['You take a train here.', 'train station', '🚉']] }
  ],
  [ // 9 Environment
    { t: 'sira', ad: 'Plant a tree', ikon: '🌳', y: 'Put the steps in order!',
      d: [[['🛒', 'First, get a young tree.'], ['⛏️', 'Then, dig a hole.'], ['🌱', 'Next, put the tree in the hole.'], ['🪨', 'After that, cover it with soil.'], ['💧', 'Finally, water it every week.']]] },
    { t: 'bil', ad: 'Green riddles', ikon: '♻️', q: [['Buses, trams and the metro.', 'public transport', '🚌'], ['Leave the room? … the lights!', 'turn off', '💡'], ['Factories make the air dirty. They…', 'pollute', '🏭'],
      ['Energy from the sun.', 'solar energy', '☀️'], ['Energy from the wind.', 'wind energy', '🌬️'], ['Don\'t … water! Close the tap.', 'waste', '🚰']] }
  ],
  [ // 10 Planets
    { t: 'yer', ad: 'Bigger or smaller than Earth?', ikon: '🪐', y: 'Compare with the Earth!', k: '{k} is {b} the Earth.',
      b: [['larger than', '⬆️'], ['smaller than', '⬇️']],
      o: [['Jupiter', '🟠', 0], ['Saturn', '🪐', 0], ['Neptune', '🔵', 0], ['Mars', '🔴', 1], ['Mercury', '⚫', 1], ['the Moon', '🌙', 1]] },
    { t: 'bil', ad: 'Space quiz', ikon: '🔭', q: [['The largest planet.', 'Jupiter', '🟠'], ['The planet with beautiful rings.', 'Saturn', '🪐'], ['The planet we live on.', 'Earth', '🌍'],
      ['It pulls things down. Apples fall because of it.', 'gravity', '🍎'], ['A scientist looks at stars with it.', 'telescope', '🔭'], ['A person who travels to space.', 'astronaut', '👨‍🚀']] }
  ]
];

UOYUN[8] = [
  [ // 1 Friendship
    { t: 'yer', ad: 'Accept or refuse?', ikon: '💌', y: 'Is the answer accepting or refusing?', k: '"{k}" — {b}.',
      b: [['accepting', '👍'], ['refusing', '🙅']],
      o: [['I\'d love to!', '😍', 0], ['Sure, that sounds fun!', '🎉', 0], ['Why not?', '🙂', 0], ['Sorry, but I can\'t.', '😔', 1], ['I\'m afraid I\'m busy.', '⏰', 1], ['Maybe another time.', '📅', 1]] },
    { t: 'bil', ad: 'Good friend riddles', ikon: '🤝', q: [['You say sorry. You…', 'apologize', '🙏'], ['You believe your friend. You … them.', 'trust', '🤝'], ['A card for a party.', 'invitation', '💌'],
      ['You help your friend when they are sad.', 'support', '💪'], ['You visit a friend\'s house. You…', 'come over', '🏠'], ['A friend you know from the internet.', 'online friend', '💻']] }
  ],
  [ // 2 Teen Life
    { t: 'yer', ad: 'Teen survey', ikon: '📊', y: 'Is it a like or a dislike?', k: 'Ece {b} {k}.',
      b: [['enjoys', '😍'], ['can\'t stand', '😖']],
      o: [['going to concerts', '🎸', 0], ['hanging out with friends', '🛹', 0], ['reading comics', '📚', 0], ['waiting in queues', '⏳', 1], ['loud noise', '🔊', 1], ['getting up early at weekends', '⏰', 1]] },
    { t: 'bil', ad: 'Teen riddles', ikon: '🎧', q: [['Money your parents give you.', 'pocket money', '💵'], ['Spend free time with friends.', 'hang out', '🛹'], ['Live music on a stage.', 'concert', '🎸'],
      ['Very, very good!', 'terrific', '🤩'], ['"I think…" means…', 'in my opinion', '💬'], ['You buy clothes at the mall.', 'go shopping', '🛍️']] }
  ],
  [ // 3 In the Kitchen
    { t: 'sira', ad: 'Make an omelette', ikon: '🍳', y: 'Put the recipe steps in order!',
      d: [[['🫒', 'First, put some oil into a pan and heat it.'], ['🥚', 'Second, mix two eggs in a bowl.'], ['🧂', 'Then, add some salt.'], ['🧀', 'After that, add some cheese and milk.'], ['🍳', 'Finally, pour the mixture into the pan.']],
        [['🍅', 'Chop the tomatoes.'], ['🥒', 'Chop the cucumbers.'], ['🥗', 'Put them in a bowl.'], ['🍋', 'Add lemon juice and olive oil.'], ['😋', 'Mix and serve. Delicious!']]] },
    { t: 'bil', ad: 'Kitchen words', ikon: '🔪', q: [['Cut into small pieces.', 'chop', '🔪'], ['Cook in an oven.', 'bake', '🧁'], ['Heat water until it bubbles.', 'boil', '♨️'],
      ['Put liquid from a jug into a glass.', 'pour', '🫗'], ['All the things you need for a recipe.', 'ingredients', '🧂'], ['Very tasty!', 'delicious', '😋']] }
  ],
  [ // 4 On the Phone
    { t: 'sira', ad: 'Phone call', ikon: '📞', y: 'Put the phone conversation in order!',
      d: [[['📞', 'Hello, this is Deniz. May I speak to Olivia?'], ['⏳', 'Hang on a minute, please.'], ['😕', 'I\'m sorry, she isn\'t available.'], ['📝', 'Can I leave a message?'], ['✅', 'Sure. I\'ll tell her to call you back.'], ['👋', 'Thanks. Bye!']]] },
    { t: 'bil', ad: 'Phone language', ikon: '📱', q: [['Please wait a little.', 'hang on', '⏳'], ['The person can\'t talk now. They are not…', 'available', '🔴'], ['Phone again later.', 'call back', '🔁'],
      ['You called the wrong person.', 'wrong number', '❌'], ['Write what the caller says.', 'take a message', '📝'], ['A short written message on a phone.', 'text message', '💬']] }
  ],
  [ // 5 The Internet
    { t: 'yer', ad: 'Safe or not safe?', ikon: '🛡️', y: 'Is it safe online behaviour?', k: '{k}: {b}.',
      b: [['safe', '✅'], ['not safe', '⚠️']],
      o: [['Use a strong password', '🔑', 0], ['Tell an adult about bullying', '🧑‍🏫', 0], ['Log out on shared computers', '🚪', 0], ['Share your password', '🔓', 1], ['Talk to strangers', '🕵️', 1], ['Post your home address', '🏠', 1]] },
    { t: 'bil', ad: 'Internet words', ikon: '🌐', q: [['Get a file from the internet.', 'download', '⬇️'], ['Put a photo on the internet.', 'upload', '⬆️'], ['A secret word to open your account.', 'password', '🔑'],
      ['Being unkind to someone online.', 'cyberbullying', '🚫'], ['Talking with friends by writing messages.', 'chat', '💬'], ['Connected to the internet.', 'online', '🌐']] }
  ],
  [ // 6 Adventures
    { t: 'yer', ad: 'Land, water or air?', ikon: '🧗', y: 'Where do you do this adventure sport?', k: 'You do {k} {b}.',
      b: [['on land', '⛰️'], ['in water', '🌊'], ['in the air', '☁️']],
      o: [['rock climbing', '🧗', 0], ['mountain biking', '🚵', 0], ['rafting', '🛶', 1], ['scuba diving', '🤿', 1], ['skydiving', '🪂', 2], ['paragliding', '🪁', 2]] },
    { t: 'bil', ad: 'Adventure riddles', ikon: '⚡', q: [['You jump from a plane with a parachute.', 'skydiving', '🪂'], ['You go down a river in a boat.', 'rafting', '🛶'], ['You swim under the sea with oxygen.', 'scuba diving', '🤿'],
      ['You jump from a bridge with a rope.', 'bungee jumping', '🪢'], ['Very exciting!', 'thrilling', '⚡'], ['You fly with a big wing in Ölüdeniz.', 'paragliding', '🪁']] }
  ],
  [ // 7 Tourism
    { t: 'yer', ad: 'Travel guide', ikon: '🧳', y: 'Historical site or natural beauty?', k: '{k} is a {b}.',
      b: [['historical site', '🏛️'], ['natural beauty', '🏞️']],
      o: [['Ephesus', '🏺', 0], ['Topkapı Palace', '🕌', 0], ['Troy', '🐴', 0], ['Pamukkale', '♨️', 1], ['Uzungöl', '🌲', 1], ['Ölüdeniz', '🏝️', 1]] },
    { t: 'bil', ad: 'Tourism riddles', ikon: '🗺️', q: [['Something you buy to remember a trip.', 'souvenir', '🧿'], ['A place to stay: a hotel or a hostel.', 'accommodation', '🏨'], ['In another country.', 'abroad', '✈️'],
      ['Visiting famous places in a city.', 'sightseeing', '📸'], ['Very old. From long ago.', 'ancient', '🏺'], ['A document you need to travel abroad.', 'passport', '🛂']] }
  ],
  [ // 8 Chores
    { t: 'yer', ad: 'Which room?', ikon: '🧹', y: 'Where do you do this chore?', k: 'I {k} in the {b}.',
      b: [['kitchen', '🍳'], ['bedroom', '🛏️'], ['living room', '🛋️']],
      o: [['do the dishes', '🧽', 0], ['set the table', '🍽️', 0], ['make the bed', '🛌', 1], ['fold my clothes', '👕', 1], ['vacuum the carpet', '🧹', 2], ['dust the shelves', '🪶', 2]] },
    { t: 'bil', ad: 'Chore riddles', ikon: '🏠', q: [['Wash plates and glasses.', 'do the dishes', '🧽'], ['Put plates and forks on the table.', 'set the table', '🍽️'], ['Wash the clothes.', 'do the laundry', '🧺'],
      ['Clean the carpet with a machine.', 'vacuum', '🧹'], ['Take the bin bag outside.', 'take out the rubbish', '🗑️'], ['Tidy your bed in the morning.', 'make the bed', '🛌']] }
  ],
  [ // 9 Science
    { t: 'yer', ad: 'Who invented it?', ikon: '💡', y: 'Match the invention with the inventor!', k: 'The {k} was invented by {b}.',
      b: [['Alexander Graham Bell', '📞'], ['Thomas Edison', '💡'], ['the Wright brothers', '✈️'], ['Al-Jazari', '⚙️']],
      o: [['telephone', '☎️', 0], ['light bulb', '💡', 1], ['aeroplane', '🛩️', 2], ['elephant clock', '🐘', 3]] },
    { t: 'bil', ad: 'Science riddles', ikon: '🔬', q: [['A test to find out something new.', 'experiment', '🧪'], ['A room for science experiments.', 'laboratory', '🥼'], ['A new thing that someone creates.', 'invention', '💡'],
      ['You look at very small things with it.', 'microscope', '🔬'], ['Find something for the first time.', 'discover', '🔍'], ['A famous science festival in Türkiye.', 'TEKNOFEST', '🚀']] }
  ],
  [ // 10 Natural Forces
    { t: 'sira', ad: 'Earthquake safety', ikon: '🧰', y: 'What do you do in an earthquake? Put it in order!',
      d: [[['🧰', 'Prepare an emergency kit before.'], ['🫣', 'During the earthquake: Drop!'], ['🪑', 'Cover under a strong table!'], ['✋', 'Hold on!'], ['🚪', 'After it stops, go out calmly.'], ['📍', 'Go to the meeting point.']]] },
    { t: 'bil', ad: 'Natural forces', ikon: '🌋', q: [['The ground shakes.', 'earthquake', '🌋'], ['No rain for a long time.', 'drought', '🏜️'], ['Too much water covers the land.', 'flood', '🌊'],
      ['A very strong spinning wind.', 'tornado', '🌪️'], ['The Earth is getting hotter.', 'global warming', '🌡️'], ['A bag with water, a torch and a whistle.', 'emergency kit', '🧰']] }
  ]
];
