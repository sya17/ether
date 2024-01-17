export interface Sidebar {
  id: string;
  label: string;
  icon?: string;
  child?: Sidebar[];
}
