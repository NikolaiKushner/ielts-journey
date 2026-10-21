/* IELTS Journey — plan data and daily logic. Shared by index.html and the daily reminder (node). */
/* ---------- PLAN DATA ---------- */
const PHASES = [
  {id:1, name:"A2 → B1: фундамент", weeks:[1,14], c:"var(--p1)",
   goal:"Базовая грамматика, 1000+ частых слов, понимать медленную речь, писать простые тексты 100–150 слов."},
  {id:2, name:"B1 → B1+: уверенность", weeks:[15,26], c:"var(--p2)",
   goal:"Сложнее грамматика, 2000+ слов, читать новости для изучающих, говорить 2 минуты без пауз."},
  {id:3, name:"B1+ → B2: академический английский", weeks:[27,38], c:"var(--p3)",
   goal:"Academic Word List, сложные предложения, первые IELTS-эссе и описания графиков."},
  {id:4, name:"Формат IELTS", weeks:[39,48], c:"var(--p4)",
   goal:"Все типы заданий, тайминг, пробные тесты каждые 2–3 недели, запись на экзамен."},
  {id:5, name:"Финиш и экзамен", weeks:[49,52], c:"var(--p5)",
   goal:"Полные тесты, работа над слабыми местами, отдых, экзамен."}
];

// [title, grammar, vocab, writing, speaking] for phases 1–3; custom task lists for 4–5 and checkpoints
const W = {
1:["Диагностика и старт","Тест уровня + to be, Present Simple","Oxford 3000 (A1–A2), блок 1 — работа и дом, 80 слов","8–10 предложений о себе","Агент: представиться, 5 минут"],
2:["Мой день","Present Continuous; Simple vs Continuous","A2, блок 2 — день и время, 80 слов","«Мой обычный день», 80 слов","Рассказать о своём дне"],
3:["Прошлое","Past Simple: правильные и неправильные глаголы","A2, блок 3 — путешествия, 80 слов","Поездка, которую помню, 100 слов","Что делал на выходных"],
4:["Детство","Past Continuous; used to","A2, блок 4 — школа и детство, 80 слов","Моё детство, 100 слов","Детство и школа"],
5:["Планы","Future: will / going to / Present Continuous","A2, блок 5 — планы и цели, 80 слов","Планы на год, 100 слов","Планы на будущее"],
6:["Опыт","Present Perfect: ever, never, just, already, yet","B1, блок 1 — опыт и события, 80 слов","Самое интересное, что я делал, 100 слов","Игра «Have you ever…?»"],
7:["Еда и покупки","Countable/uncountable; some, any, much, many","B1, блок 2 — еда и магазины, 80 слов","Рецепт любимого блюда, 120 слов","Еда и рестораны"],
8:["Города","Comparatives и superlatives","B1, блок 3 — город и места, 80 слов","Сравнить два города, 120 слов","Сравнить места, где жил"],
9:["Работа","Modals: can, must, have to, should","B1, блок 4 — работа и офис, 80 слов","Советы новичку в IT, 120 слов","Моя работа"],
10:["Технологии","Articles: a, an, the, без артикля","B1, блок 5 — технологии, 80 слов","Описать свой проект, 120 слов","Рассказать о проекте"],
11:["Повседневные ситуации","Предлоги времени и места; базовые phrasal verbs","B1, блок 6 — фразовые глаголы, 60 штук","Email другу, 120 слов","Ролевая игра: отель и аэропорт"],
12:["Достижения","Present Perfect vs Past Simple","B1, блок 7 — здоровье и спорт, 80 слов","История об успехе, 150 слов","Мои достижения"],
13:["Если…","Conditionals 0 и 1","B1, блок 8 — природа и погода, 80 слов","«Если я поступлю, то…», 150 слов","Вопросы «What will you do if…?»"],
15:["Учёба","Present Perfect Continuous","B1, блок 9 — образование, 80 слов","Как я учился раньше, 150 слов","IELTS Part 1: study"],
16:["Процессы","Passive: present и past","B1, блок 10 — процессы и производство, 80 слов","Как работает деплой, 150 слов","Объяснить процесс"],
17:["Люди","Relative clauses: who, which, that, where","B1, блок 11 — характер и внешность, 80 слов","Описать человека, 150 слов","IELTS Part 2: describe a person"],
18:["Гипотезы","Conditional 2","B1, блок 12 — деньги и покупки, 80 слов","«Если бы у меня был год свободы», 150 слов","Вопросы «What would you do if…?»"],
19:["Хобби","Gerund vs infinitive","B1, блок 13 — хобби и спорт, 80 слов","Моё хобби, 150 слов","IELTS Part 1: free time"],
20:["Новости","Reported speech","B1, блок 14 — медиа и новости, 80 слов","Пересказ новости, 150 слов","Пересказать статью агенту"],
21:["Мнения","Linking words: however, although, because of, so","B1, блок 15 — мнения и споры, 80 слов","Абзац-мнение «Remote work is better», 180 слов","Обсудить мнение с агентом"],
22:["Экология","Quantifiers; too / enough","B1, блок 16 — окружающая среда, 80 слов","Проблема моего города, 180 слов","IELTS Part 3: environment"],
23:["Карьера","Future Continuous / Perfect; time clauses","B1, блок 17 — карьера, 80 слов","Где я буду через 5 лет, 180 слов","IELTS Part 2: describe a goal"],
24:["Официальные письма","Modals of deduction: must, might, can't","B1, блок 18 — наука, 80 слов","Формальное письмо в университет, 180 слов","Ролевая игра: звонок в университет"],
25:["Повторение","Повтор всей грамматики фазы","Повтор всех B1-групп в Reps","Первое эссе, 200 слов","Агент: IELTS Part 1 + Part 2"],
27:["Эссе: старт","Conditional 3; wish / if only","AWL sublist 1 (60 слов)","IELTS Task 2: структура и вступление","IELTS Part 3: education"],
28:["Процесс","Passive во всех временах; have something done","AWL sublist 2","IELTS Task 1: process diagram","Объяснить диаграмму вслух"],
29:["Мнение","Participle clauses; сложные relative clauses","AWL sublist 3","IELTS Task 2: opinion essay, 250 слов","IELTS Part 2 + 3"],
30:["Графики","Cohesion: furthermore, whereas, consequently","AWL sublist 4","IELTS Task 1: line graph","IELTS Part 3: technology"],
31:["Академический стиль","Nominalisation","AWL sublist 5","IELTS Task 2: discussion essay","IELTS Part 3: work"],
32:["Осторожность","Hedging: tend to, it appears, may","AWL sublist 6","IELTS Task 1: bar chart","IELTS Part 3: health"],
33:["Проблемы и решения","Despite, although, whereas; сложные предложения","AWL sublist 7","IELTS Task 2: problem / solution","IELTS Part 2 + 3: cities"],
34:["Перефразирование","Paraphrasing: синонимы, формы слова, структура","AWL sublist 8","Перефразировать 10 тем + Task 1 table","Отвечать без повторения слов вопроса"],
35:["Акценты","Cleft sentences; лёгкая инверсия","AWL sublist 9","IELTS Task 2: advantages / disadvantages","IELTS Part 3: media"],
36:["Коллокации","Collocations: make / do / take, академические","AWL sublist 10","IELTS Task 1: pie chart","IELTS Part 2: 5 карточек"],
37:["Повторение","Журнал ошибок: топ-10 и упражнения","Повтор AWL 1–10","Две Task 2 подряд","Полный Speaking mock"]
};

const CUSTOM = {
14:{title:"Контрольная точка A2 → B1", tasks:[
  ["Тест","EF SET повторно — сравнить со стартом (21.10: 40/100, чтение 43, аудирование 36)"],
  ["Письмо","Текст 150 слов о себе и своих планах — агент оценивает по уровню CEFR"],
  ["Говорение","Разговор с агентом 15 минут — агент оценивает уровень"],
  ["Ошибки","Перенести топ-10 ошибок в журнал"],
  ["Отдых","Один свободный день — без чувства вины"]]},
26:{title:"Контрольная точка B1+", tasks:[
  ["Тест","Бесплатные IELTS Listening + Reading (British Council / IELTS.org) — записать во вкладку «Тесты»"],
  ["Письмо","Эссе 200 слов — агент даёт примерный band по 4 критериям"],
  ["Говорение","IELTS Speaking Part 1–3 с агентом — примерный band"],
  ["Ошибки","Обновить журнал ошибок"],
  ["План","Скорректировать план с агентом, если что-то отстаёт"]]},
38:{title:"Контрольная точка B2", tasks:[
  ["Тест","Полный тест Cambridge IELTS (книга 16–19), без жёсткого тайминга"],
  ["Письмо","Агент оценивает Task 1 и Task 2 по критериям IELTS"],
  ["Говорение","Полный Speaking mock с агентом"],
  ["Анализ","Записать результаты во «Тесты», выбрать 3 слабых места"],
  ["Решение","Если overall ≥ 5.5 — идём в формат IELTS; если ниже — повторяем 2 недели фазы 3"]]},
39:{title:"Listening 1–2 · True/False/Not Given", tasks:[
  ["Listening","Sections 1–2: формы, таблицы, карты — 2 практики"],["Reading","True / False / Not Given — 2 текста + разбор"],
  ["Writing","Task 1: map — агент проверяет"],["Speaking","Part 1: 20 вопросов на беглость"],["Слова","Тема: crime & law, 40 слов"]]},
40:{title:"Listening 3–4 · Matching headings", tasks:[
  ["Listening","Sections 3–4: лекции — 2 практики с конспектом"],["Reading","Matching headings — 2 текста"],
  ["Writing","Task 2 opinion — ровно 40 минут"],["Speaking","Part 2: 5 карточек, 1 минута подготовки"],["Слова","Тема: globalisation, 40 слов"]]},
41:{title:"Multiple choice · Completion", tasks:[
  ["Listening","Multiple choice — 2 практики"],["Reading","Sentence / summary completion — 2 текста"],
  ["Writing","Task 1 mixed charts — ровно 20 минут"],["Speaking","Part 3: культура и искусство"],["Слова","Тема: culture & arts, 40 слов"]]},
42:{title:"Mock #1", tasks:[
  ["Mock","Полный тест Cambridge IELTS в реальном тайминге (L 30 · R 60 · W 60)"],["Speaking","Speaking mock с агентом"],
  ["Анализ","Все ошибки → журнал; результаты → «Тесты»"],["План","Агент выбирает 3 слабых места на неделю 43"]]},
43:{title:"Слабые места", tasks:[
  ["Drill","Упражнения по 3 слабым местам из Mock #1"],["Writing","Две Task 2 в тайминге"],
  ["Speaking","Полный mock с агентом"],["Слова","Тема: government & society, 40 слов"]]},
44:{title:"Скорость чтения", tasks:[
  ["Reading","3 текста за 60 минут — 2 раза"],["Writing","Task 1 process + Task 2"],
  ["Listening","1 полный тест"],["Слова","Тема: family & lifestyle, 40 слов"]]},
45:{title:"Mock #2 · запись на экзамен", tasks:[
  ["Mock","Полный тест в тайминге"],["Speaking","Speaking mock"],
  ["Экзамен","Записаться на IELTS Academic на неделю 51–52 (British Council или IDP)"],["Анализ","Ошибки → журнал"]]},
46:{title:"Интенсив по письму", tasks:[
  ["Writing","3 × Task 2 — агент оценивает каждую по 4 критериям"],["Writing","2 × Task 1"],
  ["Speaking","3 полных mock"],["Слова","Повтор тематических слов"]]},
47:{title:"Mock #3", tasks:[
  ["Mock","Полный тест в тайминге"],["Speaking","Speaking mock"],["Анализ","Сравнить с Mock #1 и #2"]]},
48:{title:"Шаблоны и повторение", tasks:[
  ["Writing","Свои шаблоны вступлений и выводов для Task 1 и Task 2"],["Speaking","Свои истории для Part 2 (5–6 универсальных)"],
  ["Ошибки","Повтор журнала ошибок"],["Слова","Повтор AWL и тем"]]},
49:{title:"Mock #4", tasks:[
  ["Mock","Полный тест в тайминге"],["Drill","Слабые места"],["Speaking","15 минут каждый день"]]},
50:{title:"Mock #5", tasks:[
  ["Mock","Полный тест в тайминге"],["Speaking","15 минут каждый день"],["Writing","1 × Task 1 + 1 × Task 2"]]},
51:{title:"Лёгкая неделя", tasks:[
  ["Mock","Только Listening + Reading"],["Повтор","Журнал ошибок, шаблоны, истории"],
  ["Логистика","Паспорт, адрес центра, время, дорога"],["Сон","Ложиться вовремя"]]},
52:{title:"Неделя экзамена", tasks:[
  ["Лёгкая практика","30 минут в день, без новых тем"],["Отдых","День перед экзаменом — отдых"],
  ["Экзамен","Сдать IELTS Academic"],["Результат","Записать баллы во «Тесты»"]]}
};

const LR = {1:["BBC 6 Minute English ×2: сначала без текста, потом с текстом + shadowing","Graded reader, уровень 2 — 2 главы"],
            2:["BBC 6 Minute English ×2 + 1 TED-Ed","BBC Learning English — 2 статьи"],
            3:["TED talk с конспектом ×2","BBC Future / The Conversation — 2 статьи"]};

function phaseOf(n){return PHASES.find(p=>n>=p.weeks[0]&&n<=p.weeks[1])}
function weekData(n){
  if(CUSTOM[n]) return {title:CUSTOM[n].title, tasks:CUSTOM[n].tasks};
  const w=W[n], p=phaseOf(n).id, lr=LR[p];
  return {title:w[0], tasks:[
    ["Грамматика",w[1]],["Слова",w[2]+" — отдельная группа в Reps, учить каждый день"],
    ["Аудирование",lr[0]],["Чтение",lr[1]],
    ["Письмо",w[3]+" — агент проверяет"],["Говорение",w[4]]
  ]};
}


/* ---------- TODAY: what to do on a given date ---------- */
// Weekly rhythm: Mon — tutor, Tue/Thu — speaking groups (30 min self-study), Wed/Fri — full ~75 min, Sat — 2 h, Sun — rest
const DAY_PLAN = ['sun','tutor','group','full1','group','full2','sat']; // index = getDay()
const DAY_LABEL = {
  tutor:"Лёгкий день · репетитор + 30 минут",
  group:"Лёгкий день · разговорная группа + 30 минут",
  full1:"Полный день · ~75 минут · грамматика",
  full2:"Полный день · ~75 минут · чтение и черновик письма",
  sat:"Длинная сессия · 2 часа · письмо и разбор недели",
  sun:"Отдых"
};
const LINKS = {
  1:{href:"https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",label:"BBC 6 Minute English"},
  2:{href:"https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",label:"BBC 6 Minute English"},
  3:{href:"https://www.ted.com/talks",label:"TED Talks"},
  4:{href:"https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests",label:"British Council: practice tests"},
  5:{href:"https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests",label:"British Council: practice tests"}
};
const pad2 = x => String(x).padStart(2,'0');
const ymd = d => d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate());
function dayIndex(date,start){const a=new Date(start+'T00:00:00'),b=new Date(ymd(date)+'T00:00:00');return Math.round((b-a)/864e5)}
function weekOf(date,start){return Math.floor(dayIndex(date,start)/7)+1}

// Returns {pre, daysLeft, week, phase, title, kind, label, steps:[{t, title, text, cmd?, link?, wk?}]}
function todayPlan(date,start){
  const di=dayIndex(date,start);
  if(di<0){
    const left=-di;
    return {pre:true,daysLeft:left,kind:'pre',label:`До старта ${left} дн.`,title:'Подготовка',steps:[
      {t:"50 мин",title:"Тест уровня",text:"EF SET — точка отсчёта. Уже сделано 21.10: 40/100, A2. Повторим на неделе 14."},
      {t:"20 мин",title:"Стартовый текст",text:"Напиши 100–120 слов: «About me and why I need IELTS». Отправь агенту — он оценит уровень письма.",cmd:"check writing"},
      {t:"5 мин",title:"Reps",text:"Создай в Reps: English Drills группу «Неделя 1». Слова возьмёшь у агента в понедельник."},
      {t:"15 мин",title:"Пробное аудирование",text:"Один выпуск BBC 6 Minute English: сначала без текста, потом с текстом.",link:LINKS[1]}
    ]};
  }
  const week=Math.min(52,Math.floor(di/7)+1), ph=phaseOf(week), wd=weekData(week);
  const kind=DAY_PLAN[date.getDay()];
  const find=(...keys)=>{for(const k of keys){const i=wd.tasks.findIndex(x=>x[0]===k);if(i>=0)return {i,text:wd.tasks[i][1]}}return null};
  const words=find('Слова'), listen=find('Аудирование','Listening'), read=find('Чтение','Reading'),
        gram=find('Грамматика'), write=find('Письмо','Writing'), speak=find('Говорение','Speaking');
  const custom=!W[week];
  const link=LINKS[ph.id];
  const S_REPS={t:"15 мин",title:"Слова",text:`Reps, группа «Неделя ${week}»: новые слова + повторение.`+(words?` Тема: ${words.text.split(' — ')[0]}.`:'')};
  const S_LISTEN={t:"15–20 мин",title:"Аудирование",text:ph.id===1?"1 выпуск BBC 6 Minute English: сначала без текста, потом с текстом, потом 5 минут shadowing. За неделю — минимум 2 выпуска.":(listen?listen.text:"1 выпуск или 1 секция теста")+".",link};
  const S_ERR=(src)=>({t:"5 мин",title:"Ошибки",text:`Ошибки и новые слова с занятия → вкладка «Ошибки», источник «${src}».`});
  let steps=[];
  if(kind==='sun') steps=[{t:"—",title:"Отдых",text:"Без заданий. Если хочется — сериал на английском с английскими субтитрами."}];
  else if(kind==='tutor') steps=[
    ...(words?[{t:"5 мин",title:"Слова недели",text:`Попроси у агента слова недели (${words.text.split(' — ')[0]}) и добавь их в Reps в группу «Неделя ${week}».`,cmd:"words"}]:[]),
    {t:"Занятие",title:"Репетитор",text:(week>1?"Покажи письмо прошлой недели и вопросы по грамматике.":"Расскажи про план и результаты EF SET.")+(gram?` Тема недели: ${gram.text}.`:'')},
    S_REPS,S_LISTEN,S_ERR('Репетитор')];
  else if(kind==='group') steps=[
    {t:"Занятие",title:"Разговорная группа",text:speak?`Попробуй вставить тему недели: ${speak.text}.`:"Говори больше, чем слушаешь."},
    S_REPS,S_LISTEN,S_ERR('Группа'),
    {t:"по желанию",title:"Мини-квиз",text:"Если есть 15 минут — короткий квиз по словам и грамматике недели.",cmd:"daily"}];
  else if(kind==='full1'){
    const main=custom?{i:0,text:wd.tasks[0][0]+': '+wd.tasks[0][1]}:gram;
    steps=[S_REPS,{...S_LISTEN,t:"20 мин"},
      {t:"25 мин",title:custom?"Главное задание":"Грамматика",text:main.text,cmd:custom?null:"grammar",wk:main.i},
      {t:"10–15 мин",title:"Говорение",text:(speak?speak.text:"Ответь вслух на 3 вопроса по теме недели")+". Вслух сам или с агентом.",cmd:"speaking"}];
  }
  else if(kind==='full2'){
    const main=custom?(wd.tasks[1]?{i:1,text:wd.tasks[1][0]+': '+wd.tasks[1][1]}:null):read;
    steps=[S_REPS,{...S_LISTEN,t:"20 мин"},
      ...(main?[{t:"25 мин",title:custom?"Главное задание":"Чтение",text:main.text,wk:custom?main.i:undefined}]:[]),
      ...(!custom&&write?[{t:"15 мин",title:"Черновик письма",text:`${write.text.replace(' — агент проверяет','')}. Пока только черновик — проверим в субботу.`}]:[]),
      {t:"10 мин",title:"Мини-квиз",text:"Квиз по словам и грамматике недели.",cmd:"daily"}];
  }
  else if(kind==='sat'){
    const rest=custom?wd.tasks.slice(2).map((x,j)=>({t:"",title:x[0],text:x[1],wk:j+2,cmd:/speaking/i.test(x[0]+x[1])?"mock speaking":/writing/i.test(x[0])?"check writing":null})):[];
    steps=custom?[...rest,{t:"30 мин",title:"Разбор недели",text:"Ошибки → журнал, отметь задачи недели.",cmd:"weekly review"}]:[
      {t:"60 мин",title:"Письмо",text:`${write?write.text.replace(' — агент проверяет',''):'Текст недели'}. Допиши черновик и отправь агенту.`,cmd:"check writing",wk:write&&write.i},
      {t:"30 мин",title:"Грамматика",text:`Доделай то, что не успел в среду${gram?': '+gram.text:''}.`},
      {t:"30 мин",title:"Разбор недели",text:"Перенеси ERRORS в журнал, отметь задачи недели, получи план на следующую.",cmd:"weekly review"}];
  }
  return {pre:false,week,phase:ph,title:wd.title,kind,label:DAY_LABEL[kind],steps};
}

// Plain-text version for reminders
function todayText(date,start,url){
  const p=todayPlan(date,start);
  const dname=date.toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'});
  let r=p.pre?`${dname} · ${p.label} (старт ${start})\n`:`${dname} · Неделя ${p.week}: ${p.title} · Фаза ${p.phase.id}\n${p.label}\n`;
  r+='\n'+p.steps.map((s,i)=>`${i+1}. ${s.title}${s.t?' ('+s.t+')':''} — ${s.text}${/[.!?…»]$/.test(s.text)?'':'.'}${s.cmd?` Агенту: «${s.cmd}» + отчёт.`:''}`).join('\n');
  if(url)r+=`\n\nСтраница: ${url}`;
  return r;
}

if(typeof module!=='undefined') module.exports={PHASES,W,CUSTOM,LR,phaseOf,weekData,todayPlan,todayText,weekOf};
