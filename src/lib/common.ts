export const vitaminData = [
  { key: '비타민A', name: '비타민A', efficacy: '시력 보호, 면역 기능 강화, 피부 건강 유지', food: '당근, 시금치, 고구마, 간' },
  { key: '티아민', name: '비타민B1 (티아민)', efficacy: '에너지 생산, 신경 기능 유지', food: '통곡물, 돼지고기, 콩류' },
  { key: '리보플라빈', name: '비타민B2 (리보플라빈)', efficacy: '에너지 대사, 피부와 눈 건강', food: '우유, 계란, 녹색 채소' },
  { key: '니아신', name: '비타민B3 (니아신)', efficacy: '소화기와 신경계 건강, 피부 건강', food: '닭고기, 생선, 견과류' },
  { key: '판토텐산', name: '비타민B5 (판토텐산)', efficacy: '에너지 대사, 호르몬 생성', food: '닭고기, 계란, 아보카도' },
  { key: '피리독신', name: '비타민B6 (피리독신)', efficacy: '신경계 기능, 면역 기능 강화', food: '바나나, 감자, 병아리콩' },
  { key: '비오틴', name: '비타민B7 (비오틴)', efficacy: '피부, 머리카락, 손톱 건강', food: '달걀 노른자, 견과류, 콩류' },
  { key: '엽산', name: '비타민B9 (엽산)', efficacy: '세포 성장, 적혈구 생성', food: '녹색 잎 채소, 콩류, 오렌지 주스' },
  { key: '코발라민', name: '비타민B12 (코발라민)', efficacy: '신경계 건강, 적혈구 생성', food: '고기, 생선, 유제품' },
  { key: '비타민C', name: '비타민C (아스코르브산)', efficacy: '항산화 작용, 면역 기능 강화, 콜라겐 생성', food: '감귤류, 딸기, 브로콜리, 피망' },
  { key: '비타민D', name: '비타민D', efficacy: '칼슘 흡수 촉진, 뼈 건강 유지', food: '햇빛, 지방이 많은 생선, 달걀 노른자, 강화 우유' },
  { key: '비타민E', name: '비타민E', efficacy: '항산화 작용, 피부 건강 유지, 면역 기능 강화', food: '아몬드, 해바라기씨, 시금치, 아보카도' },
  { key: '비타민K', name: '비타민K', efficacy: '혈액 응고, 뼈 건강 유지', food: '녹색 잎 채소, 브로콜리, 콩류' },
  { key: '루테인', name: '루테인', efficacy: '눈 건강, 황반 변성 예방', food: '녹색 잎 채소, 옥수수, 달걀 노른자' },
  { key: '오메가3', name: '오메가-3 지방산', efficacy: '심혈관 건강, 염증 감소, 뇌 기능 향상', food: '지방이 많은 생선 (연어, 고등어), 호두, 아마씨' },
  { key: '철분', name: '철분', efficacy: '적혈구 생성, 산소 운반', food: '붉은 고기, 시금치, 콩류, 건과일' },
  { key: '칼슘', name: '칼슘', efficacy: '뼈와 치아 건강, 근육 기능', food: '유제품, 브로콜리, 콩류, 강화 시리얼' },
  { key: '마그네슘', name: '마그네슘', efficacy: '근육 및 신경 기능, 에너지 생산', food: '견과류, 씨앗류, 녹색 잎 채소, 통곡물' },
  { key: '아연', name: '아연', efficacy: '면역 기능, 상처 치유, 단백질 합성', food: '고기, 해산물, 콩류, 견과류' },
  { key: '셀레늄', name: '셀레늄', efficacy: '항산화 작용, 면역 기능 강화', food: '브라질너트, 해산물, 육류, 계란' }
];

export const symptomData = [
  {
    key: '에너지',
    example: '자도자도 피곤하고\n아침이 힘들다면?',
    answer: '에너지 생산을 돕는 코발라민과 피리독신이 필요한 때!',
    vitamin: ['코발라민', '피리독신']
  },
  {
    key: '시력',
    example: '밤에 시야가 좁고\n눈이 피로할 때?',
    answer: '시력 보호를 위한 비타민 A와 루테인이 필요한 때!',
    vitamin: ['비타민A', '루테인']
  },
  {
    key: '피부',
    example: '피부 건조와 트러블이\n자주 발생하면?',
    answer: '피부 건강을 위한 비오틴, 비타민 E, 비타민 C가 필요한 때!',
    vitamin: ['비오틴', '비타민E', '비타민C']
  },
  {
    key: '면역력',
    example: '감기에 자주 걸리고\n회복이 더딘다면?',
    answer: '면역 기능을 강화하는 비타민 C, 비타민 D, 아연이 필요한 때!',
    vitamin: ['비타민C', '비타민D', '아연']
  },
  {
    key: '근육',
    example: '운동 후 근육이 쉽게\n경련이 일어난다면?',
    answer: '근육 기능을 돕는 마그네슘과 칼슘이 필요한 때!',
    vitamin: ['마그네슘', '칼슘']
  },
  {
    key: '빈혈',
    example: '얼굴이 창백해지고\n쉽게 피로해진다면?',
    answer: '적혈구 생성을 돕는 철분, 엽산, 코발라민이 필요한 때!',
    vitamin: ['철분', '엽산', '코발라민']
  },
  {
    key: '뼈건강',
    example: '뼈가 약해지고\n골절이 잦다면?',
    answer: '뼈 건강을 위한 비타민 D와 칼슘이 필요한 때!',
    vitamin: ['비타민D', '칼슘']
  },
  {
    key: '소화',
    example: '소화가 잘 되지 않고\n더부룩하다면?',
    answer: '소화기 건강을 돕는 니아신과 티아민이 필요한 때!',
    vitamin: ['니아신', '티아민']
  },
  {
    key: '심혈관',
    example: '가슴 통증이 있거나\n혈압이 높다면?',
    answer: '심혈관 건강을 위한 오메가-3 지방산과 비타민 E가 필요한 때!',
    vitamin: ['오메가-3', '비타민E']
  },
  {
    key: '신경계',
    example: '손발이 저리거나\n신경이 예민해진다면?',
    answer: '신경계 건강을 위한 티아민, 피리독신, 코발라민이 필요한 때!',
    vitamin: ['티아민', '피리독신', '코발라민']
  },
  {
    key: '스트레스',
    example: '지속적인 스트레스와\n불안감이 있다면?',
    answer: '스트레스 완화를 위한 비타민 C, 비타민 B5, 마그네슘이 필요한 때!',
    vitamin: ['비타민C', '판토텐산', '마그네슘']
  },
  {
    key: '집중력',
    example: '공부나 일을 할 때\n집중이 잘 되지 않는다면?',
    answer: '뇌 기능 향상을 위한 오메가-3 지방산과 비타민 B6, 루테인이 필요한 때!',
    vitamin: ['피리독신', '오메가-3', '루테인']
  }
]
