import m from 'mithril';

class People {
  constructor() {
    this.name = m.prop('People');
  }

  view() {
    return (
      <div className="People">

        <div className="People__static-container">
          <h2 className="People__title">Просвещенные умы</h2>

          <ul className="People__switcher">
            <li className="People__switcher-item">
              <img
                src="/images/people/kennedi.jpg"
                className="People__switcher-photo"
                alt="Владимир Ленин"
              />
            </li>
            <li className="People__switcher-item People__switcher-item--chosen">
              <img
                src="/images/people/kennedi.jpg"
                className="People__switcher-photo"
                alt="Джон Кеннеди"
              />
            </li>
            <li className="People__switcher-item">
              <img
                src="/images/people/kennedi.jpg"
                className="People__switcher-photo"
                alt="Томас Эдисон"
              />
            </li>
            <li className="People__switcher-item">
              <img
                src="/images/people/kennedi.jpg"
                className="People__switcher-photo"
                alt="Александр Пушкин"
              />
            </li>
            <li className="People__switcher-item">
              <img
                src="/images/people/kennedi.jpg"
                className="People__switcher-photo"
                alt="Максим Горький"
              />
            </li>
            <li className="People__switcher-item">
              <img
                src="/images/people/kennedi.jpg"
                className="People__switcher-photo"
                alt="Джек Лондон"
              />
            </li>
          </ul>
        </div>

        <div className="People__person-container">
          <section className="People__person">
            <img
              src="/images/people/kennedi.jpg"
              className="People__person-photo"
              alt="Владимир Ленин"
            />
            <div className="People__person-name">Владимир Ленин</div>
            <div className="People__person-text">Вот что рассказывает один из ближайших сотрудников В.И. Ленина В.Д. Бонч-Бруевич: «Читал Владимир Ильич совершенно по-особому. Когда я видел читающего Ленина, мне казалось, что он не прочитывает строку за строкой, а смотрит страницу за страницей и быстро усваивает все поразительно глубоко и точно: через некоторое время он цитировал на память отдельные фразы и абзацы, как будто он долго и специально изучал только что прочитанное. Именно это и дало возможность Владимиру Ильичу прочесть такое громадное количество книг и статей, которому нельзя не изумиться»</div>
          </section>

          <section className="People__person People__person--shown People__person--visible">
            <img
              src="/images/people/kennedi.jpg"
              className="People__person-photo"
              alt="Джон Кеннеди"
            />
            <div className="People__person-name">Джон Кеннеди</div>
            <div className="People__person-text">До начала своей президентской компании Кеннеди удавалось читать немногим больше 280 слов в минуту, но вот в бытность президента скорость его чтения увеличилась до тысячи слов. Однако, он редко читал с подобной скоростью документы. Кеннеди легко управлял своей техникой чтения и отводил максимум внимания важным материалам. Уборщица кабинета президента не понимала, зачем Кеннеди десятки газет каждое утро, если он все равно их не читает. На самом деле тот каждое утро прочитывал каждую из них.</div>
          </section>

          <section className="People__person">
            <img
              src="/images/people/kennedi.jpg"
              className="People__person-photo"
              alt="Томас Эдисон"
            />
            <div className="People__person-name">Томас Эдисон</div>
            <div className="People__person-text">Этот величайший изобретатель читал гигантское количество научных статей, исследований, диссертаций и многотомных трудов. Прежде чем приступать к очередной разработке, он окружал себя целой баррикадой из книг и старался в течение нескольких недель проштудировать всё, что только можно было отыскать по интересующей его теме. Досконально изучив исследования всех предшественников, он давал своему мозгу некоторое время на «переваривание сырья», а потом делал рывок, мощнейший переход от количества к качеству.</div>
          </section>

          <section className="People__person">
            <img
              src="/images/people/kennedi.jpg"
              className="People__person-photo"
              alt="Александр Пушкин"
            />
            <div className="People__person-name">Александр Пушкин</div>
            <div className="People__person-text">Александр Сергеевич читал много, запоем, мог целыми сутками не отрываться от книг. Памятью обладал исключительной. Запоминал всё: цифры, даты, имена, фамилии и родословные, географические места и исторические события. Знал сотни биографий знаменитых людей, великолепно ориентировался в истории.</div>
          </section>

          <section className="People__person">
            <img
              src="/images/people/kennedi.jpg"
              className="People__person-photo"
              alt="Максим Горький"
            />
            <div className="People__person-name">Максим Горький</div>
            <div className="People__person-text">Вот так, по воспоминаниям А.С. Новикова-Прибоя, читал журналы Максим Горький: “Взяв первый журнал, Алексей Максимович разрезал его и начинал не то читать, не то просматривать: Горький не читал, а, казалось, просто скользил по страницам взглядом, сверху вниз, по вертикали. Покончив с первым журналом, Горький принялся за второй, и все повторилось: он открывал страницу, сверху вниз, как по ступеням, спускался по ней взглядом, на что у него уходило меньше минуты, и так снова и снова, пока не добрался до последней страницы. Откладывал журнал и принимался за очередной”.</div>
          </section>

          <section className="People__person">
            <img
              src="/images/people/kennedi.jpg"
              className="People__person-photo"
              alt="Джек Лондон"
            />
            <div className="People__person-name">Джек Лондон</div>
            <div className="People__person-text">«В узеньком стенном шкафу висела одежда, и лежали книги, которые не помещались уже ни на столе, ни под столом. Читая, Мартин имел обыкновение делать заметки, и их накопилось так много, что пришлось протянуть через всю комнату веревки и развесить на них тетрадки наподобие сохнущего белья. Вследствие этого передвигаться по комнате стало довольно затруднительно. Мартин нередко стряпал, сидя, так как, пока кипела вода или жарилось мясо, он успевал прочитать две-три страницы». Из романа Джека Лондона «Мартин Иден».</div>
          </section>
        </div>
      </div>
    );
  }
}

export default People;
