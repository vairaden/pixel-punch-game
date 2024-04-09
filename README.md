- [Документация](./docs/README.md)

### Видео с демонстрацией функционала
1 демо: 

https://drive.google.com/file/d/1tn6-jTn34Jd9lBrdMroVSr2vE88oy1VV/view?usp=sharing

2 демо:

https://drive.google.com/file/d/100Nd1LOR4mb6uNNLu6MvzKWXDHiDwhHI/view?usp=sharing

### Как запускать?

**Зпаустк в dev режиме:**
1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `docker compose -f docker-compose.dev.yml up`
3. При первом запуск добавьте переменную окружения `INIT_DB` для правильной инициализации базы данных

**Зпаустк в режиме preview:**
1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `docker compose up`
3. При первом запуск добавьте переменную окружения `INIT_DB` для правильной инициализации базы данных

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)
