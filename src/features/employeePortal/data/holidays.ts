export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: string;
}

export const leaveBalance = {
  casualLeavesLeft: 14,
  sickLeavesLeft: 14,
};

export const holidays: Holiday[] = [
  { id: "1", name: "Independence day", date: "August 15 , Monday", type: "National Holiday" },
  { id: "2", name: "Independence day", date: "August 15 , Monday", type: "National Holiday" },
  { id: "3", name: "Independence day", date: "August 15 , Monday", type: "National Holiday" },
  { id: "4", name: "Independence day", date: "August 15 , Monday", type: "National Holiday" },
  { id: "5", name: "Independence day", date: "August 15 , Monday", type: "National Holiday" },
];
