## Getting Started

First, run the development server:

npm install

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

npm run build

npm install axios tailwindcss eslint prettier zod zustand
npx tailwindcss init -p
react-virtualized || @tanstack/react-virtual — для віртуалізації списку

TODO

src/
├── entities/
│ └── lot/
│ ├── model/ ← здесь ваш hook useLotCurrentBid()
│ │ └── useCurrentBid.ts
│ └── ui/
│ ├── components/
│ │ ├── InfoItem.tsx ← переиспользуемый UI-элемент
│ │ ├── BidPrice.tsx ← только визуальная часть BidPriceComponent
│ │ ├── AuctionTime.tsx ← компонент, который рендерит Clock+дата
│ │ └── index.ts ← `export * from './InfoItem'` и т. д.
│ └── LotCard.tsx ← здесь только сборка из компонентов:
│ импортирует
│ - useCurrentBid()
│ - formatNumber, getAuctionTimeInfo
│ - компоненты из `components/`
└── shared/
├── lib/
│ └── axios.ts
├── utils/
│ ├── formatNumber.ts
│ └── auctionTime.ts
└── ui/
├── Badge.tsx ← универсальный badge-компонент
└── icons/… ← иконки
