export type TableGroupHeader = {
  isHeader: true;
  id: string; 
  groupName: string;
  isContinued?: boolean; 
};

export type TableItemRow = {
  isHeader: false;
  id: string;
  groupId: string;
  name: string;
  codeName: string;
  selectedOption: string;
  isChecked: boolean;
};

export type TableNode = TableGroupHeader | TableItemRow;

export const CATEGORY_OPTIONS = [
  { value: 'option1', label: 'カテゴリ A' },
  { value: 'option2', label: 'カテゴリ B' },
  { value: 'option3', label: 'カテゴリ C' },
] as const;

export const generateInitialData = (): TableNode[] => {
  const nodes: TableNode[] = [];
  const groupCount = 4;
  const itemsPerGroup = 6;

  for (let g = 0; g < groupCount; g++) {
    const groupId = `group-${String.fromCharCode(65 + g)}`;
    
    // ヘッダ行を追加
    nodes.push({
      isHeader: true,
      id: groupId,
      groupName: `グループ ${String.fromCharCode(65 + g)}`,
    });

    // アイテム行を追加
    for (let i = 0; i < itemsPerGroup; i++) {
      const globalIndex = g * itemsPerGroup + i;
      nodes.push({
        isHeader: false,
        id: `row-${groupId}-${i + 1}`,
        groupId: groupId,
        name: `アイテム ${globalIndex + 1}`,
        codeName: `CODE-${String.fromCharCode(65 + (globalIndex % 26))}`,
        selectedOption: globalIndex % 3 === 0 ? 'option2' : globalIndex % 2 === 0 ? 'option3' : 'option1',
        isChecked: globalIndex % 2 === 0,
      });
    }
  }

  return nodes;
};
