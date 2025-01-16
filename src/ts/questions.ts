const EASY_WORDS = [
  "獨角仙", "礦泉水", "鉛筆", "鳳梨", "大笨鐘", "沙漏", "雪人", "鋼琴", "棋盤", "蜘蛛網",
  "船錨", "鳥巢", "口罩", "書包", "手電筒", "鈴鐺", "望遠鏡", "冰箱", "滑雪板", "袋鼠",
  "飛盤", "彈弓", "拖鞋", "滑鼠", "衛星", "拳擊手套", "火車", "鐘錶", "漫畫", "風箏"
];

const HARD_WORDS = [
  "南港展覽館", "陶朱隱園", "荊軻刺秦王", "陶淵明", "光合作用",
  "黑洞", "朱自清", "亞特蘭提斯", "葉問", "指鹿為馬",
  "阿里山小火車", "東泉辣椒醬", "奧地利", "豬哥亮", "天南地北", 
];

const totalLength = EASY_WORDS.length + HARD_WORDS.length;

export function genQuestionGroup(groupCount: number): string[][] {
  const totalGroup: string[][] = [],
   easyWords:string[] = [...EASY_WORDS],
   hardWords:string[] = [...HARD_WORDS];

  for (let i = 0; i < groupCount; i++) {
    const group: string[] = [];
    for (let k = 0; k < Math.floor(totalLength / groupCount); k++)
      if ((k + 1) % 3 == 0 && hardWords.length > 0)
        group.push(hardWords.pop()!);
      else if (easyWords.length > 0)
        group.push(easyWords.pop()!);

    totalGroup.push(group);
  }

  return totalGroup;
}