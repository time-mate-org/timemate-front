export type TimelineItemType = {
  time: Date;
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  duration: number;
};

export type TimelineRowType = {
  professionalName: string;
  items: TimelineItemType[];
};
