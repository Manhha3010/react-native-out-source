export const dataChart: barChartProps[] = [
  {
    label: 'Giảng dạy',
    ATTT: 30,
    CNTT: 20,
    DTVT: 50,
  },
  {
    label: 'HD Luận Văn',
    ATTT: 40,
    CNTT: 30,
    DTVT: 30,
  },
  {
    label: 'NCKH',
    ATTT: 50,
    CNTT: 30,
    DTVT: 20,
  },
];

export const dataMockChart: dataMockType = {
  ATTT: {
    teaching: 36,
    thesis: 40,
    research: 50,
  },
  CNTT: {
    teaching: 20,
    thesis: 30,
    research: 30,
  },
  DTVT: {
    teaching: 50,
    thesis: 30,
    research: 20,
  },
};

export type dataMockType = {
  ATTT: {
    teaching: number;
    thesis: number;
    research: number;
  };
  CNTT: {
    teaching: number;
    thesis: number;
    research: number;
  };
  DTVT: {
    teaching: number;
    thesis: number;
    research: number;
  };
};

export type barChartProps = {
  label: string;
  ATTT: number;
  CNTT: number;
  DTVT: number;
};
