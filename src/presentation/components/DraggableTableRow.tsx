"use client";

import React from 'react';
import { TableRow as MUITableRow, TableCell, TextField, Select, MenuItem, Checkbox } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/react/sortable';
import { TableItemRow, CATEGORY_OPTIONS } from '@/domain/models/TableRow';

type Props = {
  row: TableItemRow;
  index: number;
  onChangeValue: <K extends keyof TableItemRow>(id: string, field: K, value: TableItemRow[K]) => void;
};

export const DraggableTableRow: React.FC<Props> = ({ row, index, onChangeValue }) => {
  const {
    ref,
    handleRef,
    isDragging,
  } = useSortable({ 
    id: row.id, 
    index,
    group: row.groupId,
    type: row.groupId,
    accept: row.groupId
  });

  return (
    <MUITableRow 
      ref={ref as any} 
      className={isDragging ? 'dragging-row' : ''}
      sx={{ 
        backgroundColor: isDragging ? '#ffffff' : 'inherit',
        opacity: isDragging ? 0.9 : 1,
        position: 'relative',
        zIndex: isDragging ? 9999 : 'auto',
        boxShadow: isDragging 
          ? '0px 10px 40px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1)' 
          : 'none',
        transform: isDragging ? 'scale(1.03)' : 'scale(1)',
        // ドラッグ中以外の行も位置が変わる際に滑らかに動くようにする
        transition: isDragging 
          ? 'none' 
          : 'transform 0.25s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease, background-color 0.2s ease',
        // <tr> に boxShadow を効かせるための設定
        '& > td': { 
          borderBottom: isDragging ? 'none' : '1px solid rgba(224, 224, 224, 1)',
          backgroundColor: isDragging ? '#ffffff' : 'inherit',
        },
      }}
    >
      <TableCell padding="checkbox">
        <div
          ref={handleRef}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab', 
            display: 'inline-flex',
            padding: '8px',
            touchAction: 'none',
            borderRadius: '50%',
            backgroundColor: isDragging ? '#e3f2fd' : 'transparent',
            transition: 'background-color 0.2s, transform 0.2s',
            transform: isDragging ? 'scale(1.1)' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            if (!isDragging) e.currentTarget.style.backgroundColor = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            if (!isDragging) e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <DragIndicatorIcon color={isDragging ? 'primary' : 'action'} />
        </div>
      </TableCell>
      <TableCell>
        <TextField 
          variant="outlined" 
          size="small" 
          value={row.name} 
          onChange={(e) => onChangeValue(row.id, 'name', e.target.value)} 
          fullWidth
        />
      </TableCell>
      <TableCell>
        <TextField 
          variant="outlined" 
          size="small" 
          value={row.codeName} 
          onChange={(e) => onChangeValue(row.id, 'codeName', e.target.value)} 
          fullWidth
        />
      </TableCell>
      <TableCell>
        <Select
          size="small"
          value={row.selectedOption}
          onChange={(e) => onChangeValue(row.id, 'selectedOption', e.target.value)}
          fullWidth
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox 
          checked={row.isChecked}
          onChange={(e) => onChangeValue(row.id, 'isChecked', e.target.checked)}
        />
      </TableCell>
    </MUITableRow>
  );
};
