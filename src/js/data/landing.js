export default {
  subscriptionForm: {
    email: '',
    message: {
      text: '',
      isError: false,
      isSuccess: false,
    },
  },
  examination: {
    isStarted: false,
    isRead: false,
    isFinished: false,
    startedTime: 0,
    finishedTime: 0,
    testError: '',
    test: [
      {
        id: 1,
        question: 'В 21 веке стало сложнее создавать и распространять информацию.',
        answer: false,
        userAnswer: undefined,
      },
      {
        id: 2,
        question: 'Ключевые моменты истории, ускорившие распространение информации по миру, – это создание печатного станка и изобретение интернета.',
        answer: true,
        userAnswer: undefined,
      },
      {
        id: 3,
        question: 'Главным недостатком информационного взрыва является дублирование одной и той же информации.',
        answer: true,
        userAnswer: undefined,
      },
      {
        id: 4,
        question: 'Исследования головного мозга подтверждают способность быстро и качественно обрабатывать информацию',
        answer: true,
        userAnswer: undefined,
      },
      {
        id: 5,
        question: 'Развитие востребованного навыка работы с текстами повышает концентрацию, развивает память, а также дает уверенность при работе с книгой',
        answer: true,
        userAnswer: undefined,
      },
    ],
  },
  people: [
    {
      id: 1,
      name: 'Владимир Ленин',
      image: '/images/people/lenin.jpg',
      text: 'Вот что рассказывает один из ближайших сотрудников В.И. Ленина В.Д. Бонч-Бруевич: «Читал Владимир Ильич совершенно по-особому. Когда я видел читающего Ленина, мне казалось, что он не прочитывает строку за строкой, а смотрит страницу за страницей и быстро усваивает все поразительно глубоко и точно: через некоторое время он цитировал на память отдельные фразы и абзацы, как будто он долго и специально изучал только что прочитанное. Именно это и дало возможность Владимиру Ильичу прочесть такое громадное количество книг и статей, которому нельзя не изумиться»',
      chosen: false,
    },
    {
      id: 2,
      name: 'Джон Кеннеди',
      image: '/images/people/kennedi.jpg',
      text: 'До начала своей президентской компании Кеннеди удавалось читать немногим больше 280 слов в минуту, но вот в бытность президента скорость его чтения увеличилась до тысячи слов. Однако, он редко читал с подобной скоростью документы. Кеннеди легко управлял своей техникой чтения и отводил максимум внимания важным материалам. Уборщица кабинета президента не понимала, зачем Кеннеди десятки газет каждое утро, если он все равно их не читает. На самом деле тот каждое утро прочитывал каждую из них.',
      chosen: true,
    },
    {
      id: 3,
      name: 'Томас Эдисон',
      image: '/images/people/edison.jpg',
      text: 'Этот величайший изобретатель читал гигантское количество научных статей, исследований, диссертаций и многотомных трудов. Прежде чем приступать к очередной разработке, он окружал себя целой баррикадой из книг и старался в течение нескольких недель проштудировать всё, что только можно было отыскать по интересующей его теме. Досконально изучив исследования всех предшественников, он давал своему мозгу некоторое время на «переваривание сырья», а потом делал рывок, мощнейший переход от количества к качеству.',
      chosen: false,
    },
    {
      id: 4,
      name: 'Александр Пушкин',
      image: '/images/people/pushkin.jpg',
      text: 'Александр Сергеевич читал много, запоем, мог целыми сутками не отрываться от книг. Памятью обладал исключительной. Запоминал всё: цифры, даты, имена, фамилии и родословные, географические места и исторические события. Знал сотни биографий знаменитых людей, великолепно ориентировался в истории.',
      chosen: false,
    },
    {
      id: 5,
      name: 'Максим Горький',
      image: '/images/people/gorky.jpg',
      text: 'Вот так, по воспоминаниям А.С. Новикова-Прибоя, читал журналы Максим Горький: “Взяв первый журнал, Алексей Максимович разрезал его и начинал не то читать, не то просматривать: Горький не читал, а, казалось, просто скользил по страницам взглядом, сверху вниз, по вертикали. Покончив с первым журналом, Горький принялся за второй, и все повторилось: он открывал страницу, сверху вниз, как по ступеням, спускался по ней взглядом, на что у него уходило меньше минуты, и так снова и снова, пока не добрался до последней страницы. Откладывал журнал и принимался за очередной”.',
      chosen: false,
    },
    {
      id: 6,
      name: 'Джек Лондон',
      image: '/images/people/london.jpg',
      text: '«В узеньком стенном шкафу висела одежда, и лежали книги, которые не помещались уже ни на столе, ни под столом. Читая, Мартин имел обыкновение делать заметки, и их накопилось так много, что пришлось протянуть через всю комнату веревки и развесить на них тетрадки наподобие сохнущего белья. Вследствие этого передвигаться по комнате стало довольно затруднительно. Мартин нередко стряпал, сидя, так как, пока кипела вода или жарилось мясо, он успевал прочитать две-три страницы». Из романа Джека Лондона «Мартин Иден».',
      chosen: false,
    },
  ],
};
