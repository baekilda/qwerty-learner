import itWords from './it-words.json';
import OpenAI from 'openai';
import fs from 'node:fs/promises'

const openai = new OpenAI();

!async function () {
  for (let i = 0; i < itWords.length; i += 30) {
    console.log(i);
    const res = await translate(itWords.slice(i, i + 30));
    if (!res) {
      throw new Error('No response');
    }
    const { result } = JSON.parse(res);
    const file = await fs.readFile('ko-it-words.json', 'utf-8');
    const json = JSON.parse(file);
    json.push(...result);
    await fs.writeFile('ko-it-words.json', JSON.stringify(json, null, 2));
  }
}();


async function translate(data: any[]) {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: '这是一个包含编程中常用英语单词及其中文解释的json片段，其中"name"是英语单词本身，"trnas"数组的第一个元素是单词的意思。请保持该json格式，并生成一个韩语版本。翻译时，请尽量保持简洁，无需按原来的中文翻译格式进行翻译，使用一两个单词来完成翻译。请输出`{"result": [/* 结果 */]}`格式。' },
      { role: 'user', content: JSON.stringify(data) }
    ],
    model: 'gpt-4o-mini',
    temperature: 0,
    response_format: {
      type: 'json_object',
    },
  });
  return response.choices[0].message.content;
}
