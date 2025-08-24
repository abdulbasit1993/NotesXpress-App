interface MenuItem {
  id: number;
  name: string;
  route: string;
}

export const drawerMenu: MenuItem[] = [
  {
    id: 1,
    name: 'Home',
    route: 'Home',
  },
  {
    id: 2,
    name: 'My Notes',
    route: 'Notes',
  },
  {
    id: 3,
    name: 'Settings',
    route: 'Settings',
  },
];
