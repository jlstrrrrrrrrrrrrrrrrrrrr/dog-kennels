export interface Dog {
  id: string;
  name: string;
  chipNumber: string;
  kennelId: string | null;
}

export interface Kennel {
  id: string;
  name: string;
  capacity: number;
}
