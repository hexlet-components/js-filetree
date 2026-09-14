# js-filetree

Дерево файлов в браузере: сворачивание папок, выбор файла, отрисовка из данных.

## Зачем это нужно

Пример компонента, который живёт без фреймворка. Состояние хранится в обычном объекте, а DOM перерисовывается из него: видно, что «реактивность» это не магия, а перерисовка по изменившимся данным.

Заодно пример того, как такой компонент тестируют: в `__tests__` проверяются именно клики и результат на экране, поэтому тесты переживают переделку разметки.

## Запуск

```bash
make install
make test
```

Читать стоит `src/FileManager.js` — там состояние и логика; `src/domUtils.js` отвечает только за отрисовку.

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=js-filetree)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=js-filetree).
