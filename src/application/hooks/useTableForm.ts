import { useState, useCallback, useMemo } from 'react';
import { TableNode, TableItemRow, TableGroupHeader, generateInitialData } from '@/domain/models/TableRow';
import type { DragEndEvent } from '@/presentation/components/DraggableTable';

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}

export const useTableForm = () => {
  const [rows, setRows] = useState<TableNode[]>(generateInitialData());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    const slice = rows.slice(start, start + rowsPerPage);
    
    if (slice.length > 0 && !slice[0].isHeader) {
      // ページの最初の要素がアイテムだった場合、属するグループのヘッダを探索して先頭に付与
      const firstItem = slice[0] as TableItemRow;
      const header = rows.find((r) => r.isHeader && r.id === firstItem.groupId) as TableGroupHeader | undefined;
      
      if (header) {
        // 重複IDを避けるため "-continued" を付与し、再表示フラグを立てる
        const continuedHeader: TableGroupHeader = { 
          ...header, 
          id: `${header.id}-continued`,
          groupName: `${header.groupName} (続き)`,
          isContinued: true 
        };
        return [continuedHeader, ...slice];
      }
    }
    return slice;
  }, [rows, page, rowsPerPage]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (event.canceled) return;
    
    if (!event.operation) return;
    const {source, target} = event.operation;
    if (!source || !target) return;
    if (source.id === target.id) return;

    setRows((items) => {
      const activeNode = items.find(item => item.id === source.id);
      if (!activeNode || activeNode.isHeader) return items;

      const oldIndex = items.findIndex((item) => item.id === source.id);
      const newIndex = items.findIndex((item) => item.id === target.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      const overNode = items[newIndex];
      const targetGroupId = overNode.isHeader ? overNode.id : (overNode as TableItemRow).groupId;

      // 「同じグループ内でのみ順序入れ替え可能」の制約 (A案)
      if (activeNode.groupId !== targetGroupId) {
        return [...items]; // グループが異なる場合は元に戻すため新しい配列を返す
      }

      return arrayMove(items, oldIndex, newIndex);
    });
  }, []);

  const handleChangeValue = useCallback(<K extends keyof TableItemRow>(id: string, field: K, value: TableItemRow[K]) => {
    setRows((prev) => 
      prev.map((row) => (!row.isHeader && row.id === id) ? { ...row, [field]: value } : row)
    );
  }, []);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return {
    rows,
    paginatedRows,
    page,
    rowsPerPage,
    handleDragEnd,
    handleChangeValue,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
