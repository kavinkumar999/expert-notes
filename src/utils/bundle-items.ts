import { SidebarItemProps, SidebarProps, SidebarGroupEnum } from '@/utils/type';
import { jsItems, reactItems, domItems, systemDesignItems, databaseItems, lldItems } from '@/utils/item-util';

export const notesHash: { [key in SidebarGroupEnum]: SidebarItemProps[] } = {
  [SidebarGroupEnum.HLD]: systemDesignItems,
  [SidebarGroupEnum.JAVASCRIPT]: jsItems,
  [SidebarGroupEnum.REACT]: reactItems,
  [SidebarGroupEnum.DOM]: domItems,
  [SidebarGroupEnum.DATABASE]: databaseItems,
  [SidebarGroupEnum.LLD]: lldItems,
};

function getSideBarItems(folder: SidebarGroupEnum): SidebarItemProps[] {
  const items = notesHash.hasOwnProperty(folder) ? notesHash[folder] : [];
  return items;
}

export function sidebarGroup(folderSections: {title: string, icon: JSX.Element}[]): SidebarProps[] {
 
  const sidebarItems = folderSections.map(section => {
    return ({
      ...section,
      items: getSideBarItems(section.title as SidebarGroupEnum)
    })
  });
  return sidebarItems;
}

export const allNotesList: { name: string, url: string }[] = (() => {
  return Object.values(notesHash).reduce((notesNameList, notes) => {
    for (const value of notes) {
      notesNameList = notesNameList.concat(value as { name: string, url: string });
    }
    return notesNameList;
  }, [] as { name: string, url: string }[]);
})();