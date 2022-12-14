class ParseText {
	constructor(text, qTrigger, aTrigger, answers) {
		//Текст, который надо парсить
		this.text = text;
		//С чего должен начинаться вопрос
		this.qTrigger = qTrigger;
		//С чего должен начинаться ответ
		this.aTrigger = aTrigger;
		//Текст с ответами
		this.answers = answers;
	}

	parseText() {
		//Вопросы с ответами
		let questions = [];
		//Индекс вопроса
		let i = -1;
		//Разбиваем текст по разрыву строки
		let paragraphs = this.text.Split("\n");
		//для определения что мы последнее добавляли
		let lastAnswer = false;
		let lastQuestion = false;

		for (let p = 0; p < paragraphs.length; p++) {
			//Для проверки было ли добавление
			let wasUsed = false;
			if (paragraphs[p].trim() !== "" && questions.length !== 0) {
				//Парсим вопрос
				if (paragraphs[p].startsWith(this.qTrigger)) {
					i++;
					questions[i].number = i + 1;
					questions[i].q = paragraphs[p];
					questions[i].a = [];

					//ПОследним парсили вопрос, параграф уже использован
					lastQuestion = true;
					lastAnswer = false;
					wasUsed = true;
				} else {
					for (let j = 0; j < this.aTrigger.length; j++) {
						if (paragraphs[p].startsWith(this.aTrigger[j])) {
							questions[i].a.push(paragraphs[p]);

							//ПОследним парсили ответ, параграф уже использован
							lastQuestion = false;
							lastAnswer = true;
							wasUsed = true;
							break;
						}
					}

					//Если последним парсили вопрос, а текущий параграф ещё не использован, значит это продолжение вопроса
					if (lastQuestion && !wasUsed) {
						questions[i].q += "\n" + paragraphs[p];
					}

					//Если последним парсили ответ, а текущий параграф ещё не использован, значит это продолжение ответа
					if (lastAnswer && !wasUsed) {
						questions[i].a[questions[i].a.length - 1] +=
							"\n" + paragraphs[p];
					}
				}
			}
		}
		this.questions = questions;
	}
}
