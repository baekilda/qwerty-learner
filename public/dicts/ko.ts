import itWords from './it-words.json';
import OpenAI from 'openai';
import fs from 'node:fs/promises'

const openai = new OpenAI();
const BATCH_SIZE = 30;

!async function () {
  for (let i = 0; i < itWords.length; i += BATCH_SIZE) {
    console.log(i);
    const res = await translate(itWords.slice(i, i + BATCH_SIZE));
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
      { role: 'system', content: '这是一个包含编程中常用英语单词及其中文解释的json片段，其中"name"是英语单词本身，"trans"数组的第一个元素是单词的意思。请保持该json格式，并生成一个**韩语**版本。翻译时，请尽量保持简短，用一两个韩语单词说明该单词在编程与计算机环境下的意思即可，无需按原来的中文翻译的格式进行翻译。请输出`{"result": [/* 结果 */]}`格式。' },
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
