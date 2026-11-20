/* Claude tarafından hazırlanan özgün içerik — 2, 3, 4. sınıf.
   k: konuşma kelimeleri (en|tr|simge), en çok 10
   c: cümle kalıbı {k: kalıp, o: örnek cümleler}
   s: sohbet simülasyonu [[arkadaşın sözü, uygun cevap, yanlış 1, yanlış 2], ...]
   Kaynak: MEB Maarif tema içerik çerçevesi (2, 3) ve 2018 programı ünite işlevleri (4). */
window.ICERIK = window.ICERIK || {};
window.ARKADAS = {
  2: { ad: 'Emma', yer: 'London, England', yas: 7, simge: '👧🏼', ses: 'en-GB' },
  3: { ad: 'Leo', yer: 'Toronto, Canada', yas: 8, simge: '👦🏻', ses: 'en-US' },
  4: { ad: 'Mia', yer: 'Sydney, Australia', yas: 9, simge: '👧🏽', ses: 'en-AU' },
  5: { ad: 'Sam', yer: 'Boston, the USA', yas: 10, simge: '🧒🏾', ses: 'en-US' },
  6: { ad: 'Lily', yer: 'Dublin, Ireland', yas: 11, simge: '👧🏻', ses: 'en-IE' },
  7: { ad: 'Noah', yer: 'Auckland, New Zealand', yas: 12, simge: '👦🏼', ses: 'en-NZ' },
  8: { ad: 'Olivia', yer: 'Edinburgh, Scotland', yas: 13, simge: '👩🏼', ses: 'en-GB' }
};

ICERIK[2] = [
  { // School Life
    k: ['hello|merhaba|👋', 'teacher|öğretmen|👩‍🏫', 'friend|arkadaş|🧑‍🤝‍🧑', 'classroom|sınıf|🏫', 'library|kütüphane|📚', 'garden|bahçe|🌳', 'playground|oyun alanı|🛝', 'Monday|pazartesi|1️⃣', 'thank you|teşekkürler|🙏', 'goodbye|hoşça kal|👋🏻'],
    c: { k: 'My name is ___.', o: ['My name is Ali.', 'This is my teacher.', 'She is in the garden.', 'It is Monday today.', 'Nice to meet you!'] },
    s: [['Hello! I\'m Emma. What\'s your name?', 'Hi! My name is Ece.', 'I am seven garden.', 'Monday, please.'],
        ['Nice to meet you!', 'Nice to meet you, too!', 'Goodbye, teacher.', 'It is a library.'],
        ['Who is she?', 'She is my English teacher.', 'She is Monday.', 'Yes, thank you.'],
        ['What day is it today?', 'It\'s Monday today.', 'It\'s a classroom.', 'I\'m fine, garden.']] },
  { // Classroom Life
    k: ['pencil|kurşun kalem|✏️', 'book|kitap|📕', 'desk|sıra|🪑', 'rubber|silgi|🧽', 'red|kırmızı|🔴', 'blue|mavi|🔵', 'yellow|sarı|🟡', 'green|yeşil|🟢', 'one|bir|1️⃣', 'ten|on|🔟'],
    c: { k: 'What colour is it? It\'s ___.', o: ['What is it? It\'s a pencil.', 'What colour is it? It\'s red.', 'The book is blue.', 'I have got ten pencils.', 'Open your book, please.'] },
    s: [['Look! What is it?', 'It\'s a pencil.', 'It\'s Monday.', 'I\'m Emma.'],
        ['What colour is it?', 'It\'s yellow.', 'It\'s a desk.', 'Thank you, ten.'],
        ['How many books? Count them!', 'One, two, three... ten books!', 'Red, please.', 'Goodbye, book.'],
        ['Can I have your rubber, please?', 'Sure! Here you are.', 'It\'s green garden.', 'My name is rubber.']] },
  { // Personal Life
    k: ['head|baş|🙂', 'eyes|gözler|👀', 'hands|eller|🙌', 'big|büyük|🐘', 'small|küçük|🐭', 'T-shirt|tişört|👕', 'shoes|ayakkabı|👟', 'hat|şapka|🧢', 'cold|soğuk|🥶', 'hot|sıcak|🥵'],
    c: { k: 'I\'m ___ years old.', o: ['I\'m seven years old.', 'My eyes are big.', 'This is my hat.', 'It\'s cold today.', 'Happy birthday!'] },
    s: [['How old are you?', 'I\'m seven.', 'I\'m a T-shirt.', 'It\'s blue eyes.'],
        ['It\'s my birthday today!', 'Happy birthday, Emma!', 'Goodbye, hat.', 'It\'s a head.'],
        ['Is it hot or cold in your city?', 'It\'s cold today.', 'It\'s my shoes.', 'I\'m small hands.'],
        ['I like my red shoes. And you?', 'I like my blue T-shirt.', 'I am seven shoes.', 'It\'s Monday hat.']] },
  { // Family Life
    k: ['family|aile|👨‍👩‍👧', 'mother|anne|👩', 'father|baba|👨', 'sister|kız kardeş|👧', 'brother|erkek kardeş|👦', 'grandmother|büyükanne|👵', 'grandfather|büyükbaba|👴', 'baby|bebek|👶', 'tall|uzun boylu|🦒', 'nice|hoş, iyi|😊'],
    c: { k: 'This is my ___.', o: ['This is my mother.', 'He is my father.', 'She is my sister.', 'My grandfather is tall.', 'I love my family.'] },
    s: [['Look at my photo! This is my family.', 'Wow! Who is she?', 'I am a baby.', 'It\'s yellow.'],
        ['She is my mother. Who is in your photo?', 'This is my brother.', 'This is my desk.', 'It is cold.'],
        ['Is your brother tall?', 'Yes, he is tall.', 'Yes, it is Monday.', 'No, it\'s a pencil.'],
        ['I have got a baby sister!', 'Oh, nice!', 'Goodbye, mother.', 'It\'s ten.']] },
  { // Homes & Houses & Neighbourhoods
    k: ['house|ev|🏠', 'bedroom|yatak odası|🛏️', 'kitchen|mutfak|🍳', 'bathroom|banyo|🛁', 'sofa|kanepe|🛋️', 'pet|evcil hayvan|🐾', 'dog|köpek|🐶', 'cat|kedi|🐱', 'in|içinde|📦', 'on|üstünde|⬆️'],
    c: { k: 'We\'ve got a ___.', o: ['We\'ve got a house.', 'I\'ve got a cat.', 'The cat is on the sofa.', 'Mum is in the kitchen.', 'My bedroom is small.'] },
    s: [['Have you got a pet?', 'Yes, I\'ve got a cat.', 'Yes, it\'s a kitchen.', 'No, I\'m seven.'],
        ['Where is your cat now?', 'It\'s on the sofa.', 'It\'s my grandmother.', 'It\'s blue, thanks.'],
        ['My dog is in the garden. Where is your mum?', 'She is in the kitchen.', 'She is a sofa.', 'Ten dogs, please.'],
        ['I love my bedroom!', 'Me too!', 'Goodbye, bathroom.', 'It\'s a cat hat.']] },
  { // Life in the City & the World
    k: ['water|su|💧', 'milk|süt|🥛', 'apple|elma|🍎', 'banana|muz|🍌', 'bread|ekmek|🍞', 'egg|yumurta|🥚', 'carrot|havuç|🥕', 'tomato|domates|🍅', 'chicken|tavuk|🍗', 'yummy|çok lezzetli|😋'],
    c: { k: 'I\'ve got some ___.', o: ['I\'ve got some apples.', 'She\'s got some bread.', 'I like milk.', 'Bananas are yummy!', 'Water, please.'] },
    s: [['I\'m hungry! What have you got?', 'I\'ve got some apples.', 'I\'ve got a bedroom.', 'I am in the garden.'],
        ['Do you like carrots?', 'Yes, I do! Yummy!', 'Yes, it\'s a dog.', 'It\'s Monday.'],
        ['Here you are. Some milk!', 'Thank you!', 'Hello, sofa!', 'I\'m tall.'],
        ['In London we eat fish and chips. And you?', 'We eat bread and eggs for breakfast.', 'We are a family hat.', 'It\'s cold shoes.']] }
];

ICERIK[3] = [
  { // School Life
    k: ['classmate|sınıf arkadaşı|🧑‍🎓', 'school nurse|okul hemşiresi|👩‍⚕️', 'gym|spor salonu|🏀', 'corridor|koridor|🚪', 'birthday|doğum günü|🎂', 'party|parti|🎉', 'cake|pasta|🍰', 'balloon|balon|🎈', 'gift|hediye|🎁', 'October|ekim|🍂'],
    c: { k: 'When\'s your birthday? It\'s in ___.', o: ['When\'s your birthday? It\'s in October.', 'How old are you? I\'m eight years old.', 'Who\'s this? This is our school nurse.', 'You mustn\'t run in the corridor.', 'Let\'s decorate the classroom!'] },
    s: [['Hi! I\'m Leo from Canada. How old are you?', 'I\'m eight years old.', 'It\'s in the gym.', 'I\'m a balloon.'],
        ['When\'s your birthday?', 'It\'s in October.', 'It\'s a cake.', 'She\'s my classmate.'],
        ['My party is on Saturday. Can you come?', 'Cool! I can come.', 'It\'s the corridor.', 'Good night, cake!'],
        ['Oh no, I can\'t find the gym!', 'It\'s next to the music room. Come on!', 'Happy birthday, gym!', 'I\'m eight balloons.']] },
  { // Classroom Life
    k: ['open|açmak|📖', 'close|kapatmak|📕', 'listen|dinlemek|👂', 'repeat|tekrar etmek|🔁', 'circle|daire içine almak|⭕', 'match|eşleştirmek|🔗', 'scissors|makas|✂️', 'glue|yapıştırıcı|🧴', 'twenty|yirmi|2️⃣0️⃣', 'please|lütfen|🙏'],
    c: { k: 'Can I ___, please?', o: ['Can I come in, please?', 'Open your book, please.', 'Listen and repeat, please.', 'There are twenty pupils in my class.', 'Can I borrow your scissors, please?'] },
    s: [['Our teacher says "Open your books!" What does your teacher say?', '"Listen and repeat, please!"', '"It\'s a gift!"', '"I\'m eight!"'],
        ['How many pupils are there in your class?', 'There are twenty pupils.', 'It\'s scissors.', 'Open the cake.'],
        ['Can I borrow your glue, please?', 'Sure, here you are.', 'Yes, it\'s October.', 'No, I\'m a corridor.'],
        ['Great job today!', 'Thank you! You too!', 'Close the twenty.', 'Circle my nurse.']] },
  { // Personal Life
    k: ['curly|kıvırcık|〰️', 'straight|düz (saç)|📏', 'strong|güçlü|💪', 'happy|mutlu|😀', 'sad|üzgün|😢', 'jacket|ceket|🧥', 'jeans|kot pantolon|👖', 'boots|bot|🥾', 'sunny|güneşli|☀️', 'windy|rüzgârlı|🌬️'],
    c: { k: 'I\'m wearing ___ today.', o: ['I\'m wearing jeans today.', 'She has got curly hair.', 'I like my new boots.', 'It\'s sunny and warm.', 'He is strong and happy.'] },
    s: [['What are you wearing today?', 'I\'m wearing a jacket and jeans.', 'I\'m wearing sunny.', 'It\'s my classmate.'],
        ['What\'s the weather like in your city?', 'It\'s windy and cold.', 'It\'s curly.', 'It\'s my boots.'],
        ['I\'ve got straight hair. What about you?', 'I\'ve got curly hair.', 'I\'ve got a windy jacket.', 'I\'m in October.'],
        ['You look happy today!', 'Yes! I love sunny days.', 'Yes, I am jeans.', 'No, it\'s a glue.']] },
  { // Family Life
    k: ['cousin|kuzen|🧒', 'aunt|teyze/hala|👩‍🦰', 'uncle|amca/dayı|👨‍🦱', 'wake up|uyanmak|⏰', 'brush teeth|diş fırçalamak|🪥', 'have breakfast|kahvaltı yapmak|🥣', 'cook|yemek pişirmek|👩‍🍳', 'clean|temizlemek|🧹', 'play chess|satranç oynamak|♟️', 'can|-ebilmek|✅'],
    c: { k: 'My ___ can ___.', o: ['My father can cook.', 'My aunt can\'t play chess.', 'I wake up at seven every morning.', 'My cousin is nine years old.', 'Could you help me, please?'] },
    s: [['I\'ve got three cousins. Have you got any cousins?', 'Yes, I\'ve got two cousins.', 'Yes, I can brush.', 'No, it\'s windy.'],
        ['What do you do every morning?', 'I wake up and have breakfast.', 'I am an uncle.', 'It\'s curly.'],
        ['My dad can cook pancakes! Can your dad cook?', 'Yes, he can. He cooks soup.', 'Yes, he is a jacket.', 'No, it\'s sunny.'],
        ['Can you play chess?', 'Yes, I can. Let\'s play!', 'Yes, I\'m my aunt.', 'Clean the October.']] },
  { // Homes & Houses & the Neighbourhood
    k: ['farm|çiftlik|🚜', 'village|köy|🏡', 'cow|inek|🐄', 'horse|at|🐴', 'sheep|koyun|🐑', 'chicken|tavuk|🐔', 'feed|beslemek|🌾', 'water|sulamak|🪴', 'collect eggs|yumurta toplamak|🥚', 'there are|... var|👉'],
    c: { k: 'There is / There are ___ on the farm.', o: ['There is a farmhouse on the farm.', 'There are five cows.', 'I feed the chickens every day.', 'Grandpa is watering the plants now.', 'My grandma lives in a village.'] },
    s: [['My grandpa has got a farm! What is there on a farm?', 'There are cows, horses and sheep.', 'There is a jacket.', 'It\'s Monday.'],
        ['What do you do on a farm?', 'I feed the animals.', 'I am a village.', 'I wear boots, thanks.'],
        ['What is your grandma doing now?', 'She is collecting eggs.', 'She is a horse.', 'She can twenty.'],
        ['I love horses. Do you like animals?', 'Yes! I love sheep.', 'Yes, I\'m a farm.', 'No, it\'s sunny.']] },
  { // Life in the City & the World
    k: ['breakfast|kahvaltı|🍳', 'lunch|öğle yemeği|🥪', 'dinner|akşam yemeği|🍽️', 'cheese|peynir|🧀', 'soup|çorba|🍲', 'juice|meyve suyu|🧃', 'sandwich|sandviç|🥙', 'restaurant|restoran|🍴', 'waiter|garson|🤵', 'order|sipariş vermek|📝'],
    c: { k: 'I want some ___, please.', o: ['I want some soup, please.', 'Have you got any cheese?', 'I have breakfast at eight.', 'Can I have the bill, please?', 'Let\'s have lunch at a café.'] },
    s: [['Welcome to our café! What do you want?', 'I want a sandwich, please.', 'I want a farm, please.', 'I\'m eight, please.'],
        ['Would you like some juice?', 'Yes, please. Orange juice.', 'Yes, I\'m a waiter.', 'No, I\'m a cow.'],
        ['Have you got any olives in Türkiye?', 'Yes, we\'ve got lots of olives!', 'Yes, it\'s dinner.', 'No, he is my uncle.'],
        ['In Canada we eat pancakes for breakfast. What do you eat?', 'We eat cheese, olives and eggs.', 'We eat restaurant.', 'We are lunch.']] }
];

ICERIK[4] = [
  { // 1 Classroom Rules
    k: ['come in|içeri girmek|🚪', 'go out|dışarı çıkmak|🏃', 'be quiet|sessiz ol|🤫', 'sit down|otur|🪑', 'stand up|ayağa kalk|🧍', 'say again|tekrar söyle|🔁', 'here you are|buyurun|🤲', 'sure|tabii|👍', 'sorry|üzgünüm, pardon|🙇', 'may I|... yapabilir miyim|🙋'],
    c: { k: 'May I ___?', o: ['May I come in?', 'Can I go out, please?', 'Be quiet, please.', 'Give me the book, please.', 'Sorry, not right now.'] },
    s: [['Knock knock! May I come in?', 'Sure, come in!', 'Here you are, sit down.', 'Be quiet, cheese.'],
        ['Can you give me the pencil, please?', 'Here you are.', 'Stand up, please.', 'I\'m from Australia.'],
        ['Can I go out, teacher?', 'Sorry, not right now.', 'Sure, it\'s red.', 'May I nine?'],
        ['What\'s your favourite classroom rule?', 'Raise your hand!', 'Go out the book!', 'Sorry, sandwich.']] },
  { // 2 Nationality
    k: ['country|ülke|🌍', 'where|nerede, nereli|❓', 'from|-den, -li|📍', 'Turkish|Türk|🇹🇷', 'British|İngiliz|🇬🇧', 'Japanese|Japon|🇯🇵', 'German|Alman|🇩🇪', 'American|Amerikalı|🇺🇸', 'flag|bayrak|🚩', 'maybe|belki|🤔'],
    c: { k: 'Where are you from? I\'m from ___.', o: ['Where are you from? I\'m from Türkiye.', 'I\'m Turkish.', 'Is she from Japan? Maybe.', 'He is German.', 'This is my flag.'] },
    s: [['G\'day! I\'m Mia. I\'m from Australia. Where are you from?', 'I\'m from Türkiye. I\'m Turkish.', 'I\'m from sit down.', 'Maybe pencil.'],
        ['Is your teacher British?', 'No, she isn\'t. She\'s Turkish.', 'Yes, I\'m a flag.', 'Sure, come in.'],
        ['My friend Yuki is from Japan. What is she?', 'She is Japanese.', 'She is German flag.', 'She is from Monday.'],
        ['What colour is your flag?', 'It\'s red and white.', 'It\'s Japanese.', 'It\'s a country.']] },
  { // 3 Cartoon Characters
    k: ['can|-ebilmek|✅', 'can\'t|-emez|❌', 'jump|zıplamak|🦘', 'swim|yüzmek|🏊', 'fly|uçmak|🦸', 'run|koşmak|🏃‍♀️', 'climb|tırmanmak|🧗', 'ride a bike|bisiklet sürmek|🚲', 'strong|güçlü|💪', 'hero|kahraman|🦸‍♀️'],
    c: { k: 'He / She can ___, but he / she can\'t ___.', o: ['My hero can fly.', 'She can swim, but she can\'t ride a bike.', 'Can you jump? Yes, I can.', 'He is very strong.', 'I can\'t climb a tree.'] },
    s: [['Who is your favourite cartoon character?', 'It\'s Keloğlan!', 'It\'s Japanese.', 'May I come in?'],
        ['What can he do?', 'He can run fast and jump.', 'He can Turkish.', 'He is a flag.'],
        ['Can you swim?', 'Yes, I can.', 'Yes, I\'m swim.', 'No, it\'s a bike.'],
        ['I can\'t ride a bike. Can you teach me?', 'Sure! It\'s easy.', 'Sure, be quiet.', 'Maybe British.']] },
  { // 4 Free Time
    k: ['free time|boş zaman|🕒', 'like|sevmek|👍', 'dislike|sevmemek|👎', 'reading|okumak|📖', 'dancing|dans etmek|💃', 'painting|resim yapmak|🎨', 'playing chess|satranç oynamak|♟️', 'singing|şarkı söylemek|🎤', 'watching cartoons|çizgi film izlemek|📺', 'pardon|efendim, anlamadım|❔'],
    c: { k: 'I like ___ing. I dislike ___ing.', o: ['I like reading.', 'I dislike singing.', 'Do you like dancing? Yes, I do.', 'Do you like painting? No, I don\'t.', 'Can you say that again, please?'] },
    s: [['What do you do in your free time?', 'I like playing chess.', 'I like be quiet.', 'I\'m from Japan.'],
        ['Do you like watching cartoons?', 'Yes, I do!', 'Yes, I can fly.', 'No, it\'s a flag.'],
        ['I dislike singing. What about you?', 'I like singing, but I dislike dancing.', 'I am singing a country.', 'Sit down, please.'],
        ['Let\'s go swimming in the sea!', 'Pardon? Can you say that again, please?', 'Here you are, sea.', 'Maybe jump.']] },
  { // 5 My Day
    k: ['wake up|uyanmak|⏰', 'have breakfast|kahvaltı yapmak|🥣', 'go to school|okula gitmek|🎒', 'meet friends|arkadaşlarla buluşmak|🤝', 'do homework|ödev yapmak|📝', 'go to bed|yatmak|🛌', 'morning|sabah|🌅', 'afternoon|öğleden sonra|🌤️', 'at night|gece|🌙', 'on Sundays|pazar günleri|📅'],
    c: { k: 'I ___ in the morning / afternoon / at night.', o: ['I wake up in the morning.', 'I do my homework in the afternoon.', 'I go to bed at night.', 'I have breakfast with my family on Sundays.', 'I meet my friends at school.'] },
    s: [['What do you do in the morning?', 'I wake up and have breakfast.', 'I go to bed at night morning.', 'I like British.'],
        ['When do you do your homework?', 'In the afternoon.', 'On the flag.', 'Yes, I can.'],
        ['On Sundays I go to the beach. What do you do on Sundays?', 'I go shopping with my mum.', 'I am Sunday.', 'I can fly.'],
        ['Good night! I go to bed now.', 'Good night, Mia! See you tomorrow.', 'Good morning, homework!', 'Pardon, breakfast.']] },
  { // 6 Fun with Science
    k: ['cut|kesmek|✂️', 'fold|katlamak|📄', 'mix|karıştırmak|🥄', 'plant|dikmek|🌱', 'water|sulamak|💦', 'paper|kâğıt|📃', 'cup|bardak|🥤', 'in|içinde|📥', 'under|altında|⬇️', 'next to|yanında|↔️'],
    c: { k: '___ it. Don\'t ___ it!', o: ['Cut the paper.', 'Fold it. Don\'t cut it now!', 'Mix black and white, and you get grey.', 'What is in the cup? Water!', 'The seed is under the soil.'] },
    s: [['Let\'s do a science experiment! First, take a cup.', 'OK! What\'s next?', 'I go to bed.', 'I\'m Japanese.'],
        ['Mix blue and yellow. What do you get?', 'You get green!', 'You get a paper.', 'You get Sunday.'],
        ['Where is the pencil?', 'It\'s next to the cup.', 'It\'s in Australia.', 'Fold it, please hero.'],
        ['Plant the seed and water it every day.', 'Cool! I can do it.', 'Don\'t like dancing.', 'Under my breakfast.']] },
  { // 7 Jobs
    k: ['job|meslek|💼', 'doctor|doktor|👨‍⚕️', 'teacher|öğretmen|👩‍🏫', 'farmer|çiftçi|👩‍🌾', 'cook|aşçı|👨‍🍳', 'pilot|pilot|👩‍✈️', 'vet|veteriner|🐕‍🦺', 'hospital|hastane|🏥', 'work|çalışmak|🏢', 'want to be|olmak istemek|🌟'],
    c: { k: 'What does he / she do? He / She is a ___.', o: ['What does she do? She is a doctor.', 'She works at a hospital.', 'He is a farmer. He likes animals.', 'I want to be a pilot.', 'What is your job?'] },
    s: [['My mum is a vet. What does your mum do?', 'She is a teacher.', 'She is a cup.', 'She can fold.'],
        ['Where does a doctor work?', 'At a hospital.', 'At a flag.', 'At night.'],
        ['What do you want to be?', 'I want to be a pilot.', 'I want to be Tuesday.', 'I want to be paper.'],
        ['Cool! Why?', 'Because I like planes.', 'Because I am mix.', 'Because sit down.']] },
  { // 8 My Clothes
    k: ['weather|hava durumu|🌦️', 'rainy|yağmurlu|🌧️', 'snowy|karlı|❄️', 'sunny|güneşli|☀️', 'windy|rüzgârlı|🌬️', 'umbrella|şemsiye|☂️', 'coat|mont|🧥', 'gloves|eldiven|🧤', 'put on|giymek|👕', 'need|ihtiyaç duymak|🙏'],
    c: { k: 'It\'s ___. I need my ___.', o: ['What\'s the weather like? It\'s rainy.', 'I need my umbrella.', 'It\'s cold and snowy. Put on your gloves.', 'Wear your coat!', 'It\'s sunny in Sydney today.'] },
    s: [['It\'s sunny and hot in Sydney! What\'s the weather like in your city?', 'It\'s cold and snowy.', 'It\'s my doctor.', 'It\'s a cup.'],
        ['Oh! What do you need?', 'I need my coat and gloves.', 'I need a pilot.', 'I need fold.'],
        ['It\'s rainy here now.', 'Take your umbrella!', 'Put on your hospital!', 'Mix the weather!'],
        ['What do you wear on sunny days?', 'I wear a T-shirt and a cap.', 'I wear the snowy.', 'I want to be gloves.']] },
  { // 9 My Friends
    k: ['look like|benzemek, görünmek|🪞', 'tall|uzun boylu|🦒', 'short|kısa boylu|📏', 'slim|ince|🧍‍♀️', 'blonde hair|sarı saç|👱‍♀️', 'dark hair|koyu saç|🧑🏻', 'eyes|gözler|👀', 'funny|komik|😂', 'kind|nazik|🤗', 'best friend|en iyi arkadaş|💛'],
    c: { k: 'He / She has got ___. He / She is ___.', o: ['What does she look like?', 'She is tall and slim.', 'He has got dark hair and brown eyes.', 'My best friend is funny and kind.', 'Does she have blonde hair? Yes, she does.'] },
    s: [['Who is your best friend?', 'My best friend is Zeynep.', 'My best friend is rainy.', 'It\'s a coat.'],
        ['What does she look like?', 'She is tall. She has got dark hair.', 'She looks a hospital.', 'She is snowy gloves.'],
        ['Is she funny?', 'Yes, she is very funny and kind.', 'Yes, she can umbrella.', 'No, it\'s sunny.'],
        ['My best friend has got blonde hair and blue eyes.', 'She sounds nice!', 'Put on your eyes!', 'I need tall.']] },
  { // 10 Food and Drinks
    k: ['hungry|aç|🤤', 'thirsty|susamış|🥵', 'full|tok|😌', 'would you like|ister misin|🍽️', 'yes, please|evet, lütfen|👍', 'no, thanks|hayır, teşekkürler|✋', 'sandwich|sandviç|🥪', 'pizza|pizza|🍕', 'lemonade|limonata|🍋', 'maybe later|belki sonra|⏳'],
    c: { k: 'Would you like ___? Yes, please. / No, thanks.', o: ['Would you like a sandwich?', 'Yes, please.', 'No, thanks. I\'m full.', 'I\'m thirsty. I want some lemonade.', 'How about an apple? Maybe later.'] },
    s: [['I\'m hungry! Are you hungry?', 'Yes, I am!', 'Yes, it\'s windy.', 'No, she is tall.'],
        ['Would you like some pizza?', 'Yes, please!', 'Yes, I\'m a pizza.', 'No, I\'m from Japan.'],
        ['How about some lemonade?', 'No, thanks. Maybe later.', 'I need a coat.', 'It\'s dark hair.'],
        ['What\'s your favourite food?', 'I love köfte!', 'I\'m full gloves.', 'Thirsty, please.']] }
];
